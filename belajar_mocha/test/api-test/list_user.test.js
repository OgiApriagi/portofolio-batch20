const domain = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("Scenario List User Feature", function () {
  it("1. Verifying Success Get List User with name valid", async function () { 
    const name = "gadis";

    const response = await domain 
      .get("/list-user")
      .query({name})
      
    expect(response.body.status).to.eql('SUCCESS_USER_LIST');
    expect(response.body.message).to.eql('List of registered users');
    expect(response.body).to.include.keys("data", "message", "pagination", "status"); 
  }).timeout(10000);

  it("2. Verifying Success Get List User with email valid", async function () { 
    const email = "gadis00g@gmail.com";

    const response = await domain 
      .get("/list-user")
      .query({email})
      
    expect(response.body.status).to.eql('SUCCESS_USER_LIST');
    expect(response.body.message).to.eql('List of registered users');
    expect(response.body).to.include.keys("data", "message", "pagination", "status"); 
  }),timeout(10000);

  
  it("3. Verifying Success Get List User with email blank", async function () { 
    const email = "";

    const response = await domain 
      .get("/list-user")
      .query({email})
      
    expect(response.body.status).to.eql('SUCCESS_USER_LIST');
    expect(response.body.message).to.eql('List of registered users');
    expect(response.body).to.include.keys("data", "message", "pagination", "status"); 
  }).timeout(10000);

  it("4. Verifying Success Get List User with name blank", async function () { 
    const name = "";

    const response = await domain 
      .get("/list-user")
      .query({name})
      
    expect(response.body.status).to.eql('SUCCESS_USER_LIST');
    expect(response.body.message).to.eql('List of registered users');
    expect(response.body).to.include.keys("data", "message", "pagination", "status"); 
  }).timeout(10000);

  it("5. Verifying failed Get List User with change methode", async function () { 
    const name = "bujang";

    const response = await domain 
      .post("/list-user")
      .query({name})
      
    expect(response.body.status).to.eql('');
    expect(response.body.message).to.eql('');
    expect(response.body).to.include.keys("data", "message", "pagination", "status"); 
  }).timeout(10000);

});