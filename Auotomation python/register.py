import unittest
import time
from selenium import webdriver 
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

class TestRegister(unittest.TestCase): 

    def setUp(self): 
        self.browser = webdriver.Chrome(ChromeDriverManager().install()) # buka browser google chrome
        
    def test_verify_success_Register(self): 
        # steps
        browser = self.browser
        browser.get("https://barru.pythonanywhere.com") # buka situs
        time.sleep(3)
        browser.find_element(By.ID,"signUp").click()
        time.sleep(1)
        browser.find_element(By.ID,"name_register").send_keys("anak lanang") # isi nama
        time.sleep(1)
        browser.find_element(By.ID,"email_register").send_keys("anaklanang@gmail.com") # isi email
        time.sleep(1)
        browser.find_element(By.ID,"password_register").send_keys("123456") # isi password
        time.sleep(1)
        browser.find_element(By.ID,"signup_register").click() # klik tombol sign in
        time.sleep(1)

        # pop up
        popup_atas = browser.find_element(By.ID, "swal2-title").text  # get teks/tulisan pop up atas
        popup_bawah = browser.find_element(By.ID, "swal2-content").text  # get teks/tulisan pop up bawah
        time.sleep(2)

        # validasi
        assert 'berhasil' in popup_atas
        assert popup_bawah == 'created user!'
        
    def tearDown(self): 
        self.browser.close() 


if __name__ == "__main__": 
    unittest.main()