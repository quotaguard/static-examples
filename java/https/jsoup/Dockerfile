FROM eclipse-temurin:17

WORKDIR /app/

# Download Jsoup jar
RUN apt-get update && apt-get install -y wget && \
    wget -q https://repo1.maven.org/maven2/org/jsoup/jsoup/1.17.2/jsoup-1.17.2.jar -O jsoup.jar && \
    apt-get remove -y wget && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

COPY Main.java Main.java

RUN javac -cp jsoup.jar Main.java

ENTRYPOINT [ "java", "-cp", ".:jsoup.jar", "Main" ]
