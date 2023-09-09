const request = require("supertest");
const app = require("../app");
const router = require("../routes/doctor-route");

describe("User Routes", () => {
  it("should retrieve a list of users for authenticated admin", async () => {
    const response = await request(app)
      .get("/")
      .set("Authorization", "your-auth-token-for-admin");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(/* Expected response body */);
  });

  it("should create a new user upon signup", async () => {
    const response = await request(app).post("/signup").send({
      /* Test user data */
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(/* Expected response body */);
  });

  it("should retrieve the enrolled courses for a specific user", async () => {
    const userId = "user-id"; // Provide a valid user ID

    const response = await request(app)
      .get(`/enrolledCourses/${userId}`)
      .set("Authorization", "your-auth-token");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(/* Expected response body */);
  });

  // Add more test cases for other routes/functions
});
