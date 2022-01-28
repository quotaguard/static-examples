FROM python:latest

#install paramiko
RUN pip install -U pip && \
    pip install paramiko PySocks

WORKDIR /app

COPY app.py app.py

ENTRYPOINT [ "python", "app.py" ]

