const domain = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("Scenario delete Feature", function () {
  it("1. Verifying Success delete user with valid email dan password", async function () { 
    const responseLogin = await domain 
    .post("/login")
    .send({ email: "gadis00@gmail.com", password: "gadis"});
  
    const authToken = responseLogin.body.credentials.access_token;    
    const response = await domain 
      .delete("/delete-user")
      .set("Authorization", `${authToken}`)
      .send({email: "gadis00gmail.com", password: "gadis"})
      
    expect(response.body.data).to.eql('Sedih melihatmu pergi gadis');
    expect(response.body.status).to.eql('SUCCESS_DELETE_PROFILE');
    expect(response.body.message).to.eql('Berhasil Hapus User');
    expect(response.body).to.include.keys("data", "message", "status"); 
  });

  it("2. Verifying delete user with invalid email ", async function () { 
    const responseLogin = await domain 
    .post("/login")
    .send({ email: "gadis00@gmail.com", password: "gadis"});
  
    const authToken = responseLogin.body.credentials.access_token;    
    const response = await domain 
      .delete("/delete-user")
      .set("Authorization", `${authToken}`)
      .send({email: "gadis01gmail.com", password: "gadis"}) 
      
    expect(response.body.data).to.eql('Sedih melihatmu pergi gadis');
    expect(response.body.status).to.eql('SUCCESS_DELETE_PROFILE');
    expect(response.body.message).to.eql('Berhasil Hapus User');
    expect(response.body).to.include.keys("data", "message", "status"); 
  });
  
  it("3. Verifying delete user with invalid password ", async function () { 
    const responseLogin = await domain 
    .post("/login")
    .send({ email: "gadis00@gmail.com", password: "gadis"});
  
    const authToken = responseLogin.body.credentials.access_token;    
    const response = await domain 
      .delete("/delete-user")
      .set("Authorization", `${authToken}`)
      .send({email: "gadis00gmail.com", password: "bujang"})
      
    expect(response.body.data).to.eql('Salah Password');
    expect(response.body.status).to.eql('FAILED_DELETE_PROFILE');
    expect(response.body.message).to.eql('Gagal Hapus Akun');
    expect(response.body).to.include.keys("data", "message", "status"); 
  }).timeout(10000);

  it.only("4. Verifying Failed delete user with ivlaid email and password ", async function () { 
    const responseLogin = await domain 
    .post("/login")
    .send({ email: "gadis00@gmail.com", password: "gadis"});
  
    const authToken = responseLogin.body.credentials.access_token;    
    const response = await domain 
      .delete("/delete-user")
      .set("Authorization", `${authToken}`)
      .send({email: "gadis01@gmail.com", password: "janda"})
      
    expect(response.body.data).to.eql('Salah Password');
    expect(response.body.status).to.eql('FAILED_DELETE_PROFILE');
    expect(response.body.message).to.eql('Gagal Hapus Akun');
    expect(response.body).to.include.keys("data", "message", "status"); 
  }).timeout(10000);
});