FROM python:latest

#install ftplib and PySocks
RUN pip install -U pip && \
    pip install pyftplib PySocks

WORKDIR /app

COPY app.py app.py

ENTRYPOINT [ "python", "app.py" ]

