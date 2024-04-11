FROM python:latest

WORKDIR /app/

# install google chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get -y update
RUN apt-get install -y google-chrome-stable

# Download and extract qgpass
RUN curl https://s3.amazonaws.com/quotaguard/qgpass-latest.tar.gz | tar xz -C .

# install selenium
RUN pip install selenium
RUN pip install webdriver-manager

# Copy the project files into the container
COPY . .

# Command to run when the container starts
CMD [ "bin/qgpass", "python", "app.py"]