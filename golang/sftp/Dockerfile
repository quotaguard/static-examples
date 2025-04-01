FROM golang:latest as builder
WORKDIR /app

# Copy source code into the container.
COPY . .

# Initialize module if needed and tidy dependencies.
RUN if [ ! -f go.mod ]; then \
      go mod init example.com/my-sftp-app; \
    fi && go mod tidy

# Build the application.
RUN go build -o app .

FROM alpine:latest
WORKDIR /app

# Copy the compiled binary from the builder stage.
COPY --from=builder /app/app .

# Run the application.
CMD ["./app"]
