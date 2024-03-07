import React, { useState, useEffect } from "react";
import ApplicationForm from "../view/Application";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

/**
 * Presenter component for handling job application functionality.
 * This component fetches competences, handles application submission,
 * and renders the application form view.
 * @returns {React.ReactElement} The ApplicationForm component with competences and a submit handler.
 */
const ApplicationPresenter = () => {
  const navigate = useNavigate();
  const [competences, setCompetences] = useState([]);
  const token = localStorage.getItem('token'); // Get the token from local storage
  const { t } = useTranslation();

  useEffect(() => {
    // Fetch competences when the component mounts
    const fetchCompetences = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/apply`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            'Accept-Language': i18n.language,
          },
          credentials: "include",
        });
        const data = await response.json();
        setCompetences(data);
      } catch (error) {
        console.error("Error fetching competences:", error);
      }
    };

    fetchCompetences();
  }, []);

  useEffect(() => {
    console.log("Competences updated:", competences);
  }, [competences]);
  /**
   * Handles the submission of a job application.
   * @param {string} selectedCompetence - The selected competence.
   * @param {number} experience - The years of experience.
   * @param {string} fromDate - The start date of availability.
   * @param {string} toDate - The end date of availability.
   */

  const handleApplicationSubmit = async (
    selectedCompetence,
    experience,
    fromDate,
    toDate
  ) => {
    
    if (Number(experience) < 0) {
      alert(t("application_form.years_of_experience_cannot_be_negative"));
      return;
    }

    // Validate that the fromDate is not in the past
    if (new Date(fromDate) < new Date()) {
      alert(t("application_form.start_date_not_in_past"));
      return;
    }

    // Validate that the toDate is after the fromDate
    if (new Date(toDate) <= new Date(fromDate)) {
      alert(t("application_form.end_after_start_date"));
      return;
    }

    const userData = JSON.parse(localStorage.getItem("user"));
    const competencesSubmission = [
      { competenceName: selectedCompetence, yearsOfExperience: experience },
    ];
    const availability = [{ fromDate, toDate }];
    const token = localStorage.getItem('token');
    try {
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          'Accept-Language': i18n.language,
        },
        credentials: "include",
        body: JSON.stringify({
          competences: competencesSubmission,
          availability,
          userData,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(t("application_form.application_submitted_sucessfully"));
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(
        "An error occurred while submitting the application.",
        error
      );
      alert(t("application_form.application_submit_error"));
    }
  };

  return (
    <ApplicationForm
      competences={competences}
      onSubmitApplication={handleApplicationSubmit}
    />
  );
};

export default ApplicationPresenter;
