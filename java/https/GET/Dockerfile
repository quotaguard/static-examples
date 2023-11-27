FROM openjdk:latest

WORKDIR /app/

COPY Main.java Main.java

RUN javac Main.java

ENTRYPOINT [ "java", "Main" ]