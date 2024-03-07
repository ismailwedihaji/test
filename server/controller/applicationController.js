const pool = require("../db");
const applicationDAO = require("../integration/applicationDAO");

/**
 * Handles the submission of an application by saving it to the database.
 * Validates input data and ensures that the user has the role of an applicant.
 * Logs the application attempt, including success or failure, along with user agent and IP address for security auditing.
 * 
 * @param {Object} req - The request object from Express.js containing the application data in req.body.
 * @param {Object} res - The response object from Express.js used to send the HTTP response.
 */
const submitApplication = async (req, res) => {
  const { competences, availability, userData } = req.body;
  const userAgent = req.headers['user-agent'];
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;


  if (!competences || !availability || !userData) {
    return res.status(400).json({ success: false, message: "application_validation.required_fields" });
  }

  if (userData.role !== 2) {
    return res.status(400).json({ success: false, message: "application_validation.applicant_role" });
  }
  if (isNaN(userData.person_id)) {
    return res.status(400).json({ success: false, message: "application_validation.person_id_numeric" });
  }

  const hasNegativeExperience = competences.some(competence => competence.yearsOfExperience < 0);
  if (hasNegativeExperience) {
    return res.status(400).json({ success: false, message: "application_validation.negative_experience" });
  }

  const isAvailabilityValid = availability.every(period => {
    const fromDate = new Date(period.fromDate);
    const toDate = new Date(period.toDate);
    return fromDate < toDate && fromDate >= new Date(); 
  });

  if (!isAvailabilityValid) {
    return res.status(400).json({ success: false, message: "application_validation.valid_availability" });
  }

  // Additional validation and error handling omitted for brevity.
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const success = await applicationDAO.saveApplication(client, userData, competences, availability);

    await client.query('COMMIT');  
    res.json({ success: true, message: "application_validation.application_submitted" });
  } catch (error) {
    await client.query('ROLLBACK');
    
    // Mapping error messages directly with translations
    if (error.message === "application_validation.required_fields" || 
        error.message === "application_validation.person_id_numeric" ||
        error.message === "application_validation.negative_experience") {
      return res.status(400).json({ success: false, message: error.message });
    } else if (error.message === "application_validation.valid_availability") {
      return res.status(400).json({ success: false, message: error.message });
    } else {
      // Log the error
      await applicationDAO.logApplicationError(client, userData.person_id, userData.email, userData.username, error.message, userAgent, ipAddress);
      
      // Respond with a generic error message
      console.error('Error submitting application:', error);
      res.status(500).json({ success: false, message: "application_validation.error_submitting_application" });
    }
  } finally {
    client.release();  
  }
};

/**
 * Sets the status of an application in the database.
 * Validates input data, including ensuring a valid person_id is provided.
 * Logs the status change attempt, including success or failure, along with user agent and IP address for security auditing.
 * 
 * @param {Object} req - The request object from Express.js containing the status update in req.body.
 * @param {Object} res - The response object from Express.js used to send the HTTP response.
 */
const setApplicationStatus = async (req, res) => {
  const { status, person_id } = req.body;
  const userAgent = req.headers['user-agent'];
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  if (!person_id) {
    return res.status(400).json({ success: false, message: "application_validation.person_id_numeric" });
  }

  if (isNaN(person_id)) {
    return res.status(400).json({ success: false, message: "application_validation.person_id_numeric" });
  }
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const result = await applicationDAO.setStatus(client, status, person_id);

    if (result.success) {
      await client.query('COMMIT');
      res.json({ success: true, message: "application_validation.status_updated", applications: result });
    } else {
      await client.query('ROLLBACK');
      res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error setting application status:', error);
    await applicationDAO.logApplicationError(client, person_id, null, null, error.message, userAgent, ipAddress);
    const knownErrors = ["Invalid person ID provided.",];
    if (knownErrors.includes(error.message)) {
      return res.status(400).json({ success: false, message: error.message });
    }

    res.status(500).json({ success: false, message: "application_validation.error_setting_status" });
  } finally {
    client.release();
  }
};

/**
 * Fetches all competences from the database.
 * Logs the competence fetch attempt, including success or failure, along with user agent and IP address for security auditing.
 * 
 * @param {Object} req - The request object from Express.js.
 * @param {Object} res - The response object from Express.js used to send the HTTP response.
 */
const handleCompetences = async (req, res) => {
  const userAgent = req.headers['user-agent'];
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  try {
    const result = await applicationDAO.getCompetences();
    res.json(result);
  } catch (error) {
    console.error('Error fetching competences:', error);
    
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await applicationDAO.logApplicationError(client, null, null, null, 'Error fetching competences', userAgent, ipAddress);
      await client.query('COMMIT');
    } catch (logError) {
      await client.query('ROLLBACK');
      console.error('Error logging fetch competences error:', logError);
    } finally {
      client.release();
    }
    res.status(500).json({ success: false, message: "application_validation.error_fetching_competences" });
  }
};

/**
 * Lists all applications from the database.
 * Logs the application list fetch attempt, including success or failure, along with user agent and IP address for security auditing.
 * 
 * @param {Object} req - The request object from Express.js.
 * @param {Object} res - The response object from Express.js used to send the HTTP response.
 */
const listAllApplications = async (req, res) => {
  const userAgent = req.headers['user-agent'];
  const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    
    const result = await applicationDAO.getAllApplications(client); 
    await client.query('COMMIT');

    res.json({ applications: result });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error fetching all applications:', error);

    try {
      await client.query('BEGIN');
      await applicationDAO.logApplicationError(client, null, null, null, 'Error fetching all applications', userAgent, ipAddress);
      await client.query('COMMIT');
    } catch (logError) {
      await client.query('ROLLBACK');
      console.error('Error logging fetch all applications error:', logError);
    }

    res.status(500).json({ success: false, message: "application_validation.error_fetching_applications" });
  } finally {
    client.release();
  }
};


module.exports = { submitApplication, handleCompetences, listAllApplications, setApplicationStatus };