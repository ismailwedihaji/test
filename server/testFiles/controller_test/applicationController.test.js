const request = require("supertest");
const { server } = require("../../server");
const pool = require("../../db");

/**
 * Test setup for application controller. Includes a test user for authentication and defines token and personId variables.
 */
const testUser = {
  username: "user40",
  password: "Test121212"
};

let token;

/**
 * Before all tests, log in as a test user to obtain a token and user ID for authentication in subsequent requests.
 */
beforeAll(async () => {
  const loginResponse = await request(server)
    .post("/login")
    .send({ username: testUser.username, password: testUser.password });
  token = loginResponse.body.token; 
  personId = loginResponse.body.user.person_id;
  
});

describe("ApplicationController Tests", () => {
    describe("POST /apply (submitApplication)", () => {
        it("should allow an authenticated user to submit an application", async () => {
          const applicationData = {
            competences: [
              {
                competenceName: "lotteries",
                yearsOfExperience: "4"
              }
            ],
            availability: [
              {
                fromDate: "2024-04-05",
                toDate: "2024-04-06"
              }
            ],
            userData: {
              person_id: personId, 
              name: "user1",
              username: "user", 
              role: 2 
            }
          };
      
          const response = await request(server)
            .post("/apply")
            .set("Authorization", `Bearer ${token}`)
            .send(applicationData);
      
          expect(response.statusCode).toBe(200);
          //expect(response.body).toHaveProperty("message", "Application submitted successfully");
          expect(response.body).toHaveProperty("message", "application_validation.application_submitted");

        });
      });
      

  describe("GET /apply (handleCompetences)", () => {
    it("should allow an authenticated user to fetch competences", async () => {
      const response = await request(server)
        .get("/apply")
        .set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array); 
    });
  });

  describe("GET /applications (listAllApplications)", () => {
    it("should allow an authenticated user to list all applications", async () => {
      const response = await request(server)
        .get("/applications")
        .set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("applications");
      expect(response.body.applications).toBeInstanceOf(Array);
    });
  });

  describe("POST /applications (setApplicationStatus)", () => {
    it("should allow an authenticated user to set the status of an application", async () => {
      const statusData = {
        status: "Approved",
        person_id: personId 
      };

      const response = await request(server)
        .post("/applications")
        .set("Authorization", `Bearer ${token}`)
        .send(statusData);

      expect(response.statusCode).toBe(200);
      // expect(response.body).toHaveProperty("message", "Application status updated successfully");
      expect(response.body).toHaveProperty("message", "application_validation.status_updated");
    });
  });
});

/**
 * After all tests, close the server and terminate the database connection.
 */
afterAll(async () => {
    if (server && server.close) {
      await new Promise(resolve => server.close(resolve));
    }
    await pool.end();
  });



