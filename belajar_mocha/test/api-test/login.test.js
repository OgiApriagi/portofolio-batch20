const domain = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("Scenario Login Feature", function () {
  it("1. Verifying Success Login with valid email and password", async function () { 
    const response = await domain 
      .post("/login")
      .send({ email: "gadis00@gmail.com", password: "gadis" });
      
    expect(response.body.status).to.eql('SUCCESS_LOGIN');
    expect(response.body.message).to.eql('Anda Berhasil Login');
    expect(response.body).to.include.keys("data", "message", "status", "credentials"); 
  });

  it("2. Verifying Failed Login with valid email and invalid password", async function () {
    const response = await domain
    .post("/login")
    .send({ email: "gadis00@gmail.com", password: "duda" });
    
    expect(response.body.status).to.eql('FAILED_LOGIN');
    expect(response.body.data).to.eql('User\'s not found');
    expect(response.body.message).to.eql('Email atau Password Anda Salah');
    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.statusCode).to.eql(200)
  }).timeout(10000);

  it("3. Verifying Failed Login with invalid email and password", async function () {
    const response = await domain
    .post("/login")
    .send({ email: "gadis.0@gmail.com", password: "perawan" });
    
    expect(response.body.status).to.eql('FAILED_LOGIN');
    expect(response.body.data).to.eql('User\'s not found');
    expect(response.body.message).to.eql('Email atau Password Anda Salah');
    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.statusCode).to.eql(200)
  }).timeout(10000);

  it("4. Verifying Failed Login with email and password wrong position", async function () {
    const response = await domain
    .post("/login")
    .send({ email: "gadis", password: "gadis00@gmail.com" });
    
    expect(response.body.status).to.eql('FAILED_LOGIN');
    expect(response.body.data).to.eql('Email tidak valid');
    expect(response.body.message).to.eql('Cek kembali email anda');
    expect(response.body).to.include.keys("data", "message", "status");
    expect(response.statusCode).to.eql(420)
  }).timeout(10000);
  
});