#/usr/bin/env python
import os
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from urllib.parse import urlparse

# Configure Selenium to use a SOCKS proxy
proxy = urlparse(os.getenv('QUOTAGUARDSTATIC_URL'))
chrome_options = Options()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')
chrome_options.add_argument(f'--proxy-server={proxy}')

# Set path to chromedriver if it's not in your PATH
service = Service(executable_path='/usr/local/bin/chromedriver')
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

# Example: Open a website
driver.get("https://ip.quotaguard.com")

# Do something with the website
body_element = driver.find_element(By.TAG_NAME, 'body')
print(body_element.text)

# Clean up
driver.quit()