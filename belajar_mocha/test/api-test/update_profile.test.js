const domain = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("Scenario Update Profile Feature", function () {
  it("1. Verifying Success Update Profile", async function () {     
    const responseLogin = await domain 
      .post("/login")
      .send({ email: "gadis00@gmail.com", password: "gadis" });
    
    const authToken = responseLogin.body.credentials.access_token;    
    const response = await domain 
      .put("/update-profile")
      .set("Authorization", `${authToken}`)
      .send({name: "putri"})
    
    expect(response.body).to.include.keys("data", "message", "status");  
    expect(response.body.data).to.eql('Username Anda menjadi putri');
    expect(response.body.message).to.eql('Berhasil Perbarui Profile');
    expect(response.body.status).to.eql('SUCCESS_UPDATE_PROFILE')
  }).timeout(10000);

  it("2. Verifying Failed Update Profile with name blank", async function () {     
    const responseLogin = await domain 
      .post("/login")
      .send({ email: "gadis00@gmail.com", password: "gadis" });
    
    const authToken = responseLogin.body.credentials.access_token;    
    const response = await domain 
      .put("/update-profile")
      .set("Authorization", `${authToken}`)
      .send({name: ""})
    
    expect(response.body).to.include.keys("data", "message", "status");  
    expect(response.body.data).to.eql('Username tidak boleh kosong');
    expect(response.body.message).to.eql('Gagal Update Profile');
    expect(response.body.status).to.eql('FAILED_UPDATE_PROFILE')
  }).timeout(10000);

  it("3. Verifying Failed Update Profile with update password", async function () {     
    const responseLogin = await domain 
      .post("/login")
      .send({ email: "gadis00@gmail.com", password: "gadis" });
    
    const authToken = responseLogin.body.credentials.access_token;    
    const response = await domain 
      .put("/update-profile")
      .set("Authorization", `${authToken}`)
      .send({password: "123456"})
    
    expect(response.body).to.include.keys("data", "message", "status");  
    expect(response.body.data).to.eql('');
    expect(response.body.message).to.eql('');
    expect(response.body.status).to.eql('')
 }).timeout(10000);

it("4. Verifying Failed Update Profile with name have a symbol", async function () {     
  const responseLogin = await domain 
    .post("/login")
    .send({ email: "gadis00@gmail.com", password: "gadis" });
  
  const authToken = responseLogin.body.credentials.access_token;    
  const response = await domain 
    .put("/update-profile")
    .set("Authorization", `${authToken}`)
    .send({name: "bujang?"})
  
  expect(response.body).to.include.keys("data", "message", "status");  
  expect(response.body.data).to.eql('Nama tidak valid');
  expect(response.body.message).to.eql('Tidak boleh mengandung symbol');
  expect(response.body.status).to.eql('FAILED_UPDATE_PROFILE')
}).timeout(10000);

it("5. Verifying Failed Update Profile with update email ", async function () {     
  const responseLogin = await domain 
    .post("/login")
   .send({ email: "gadis00@gmail.com", password: "gadis" });
  
  const authToken = responseLogin.body.credentials.access_token;    
  const response = await domain 
    .put("/update-profile")
  .set("Authorization", `${authToken}`)
    .send({email: "gadis@gmail.com"})
  
    expect(response.body).to.include.keys("data", "message", "status");  
    expect(response.body.data).to.eql('');
    expect(response.body.message).to.eql('');
    expect(response.body.status).to.eql('')
 }).timeout(10000);
});