# Use an official Python runtime as a parent image
FROM python:latest

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install the required Python packages
RUN pip install --no-cache-dir pymongo PySocks

# Command to run when the container starts, assuming the environment variable is passed at runtime
CMD ["python", "app.py"]
