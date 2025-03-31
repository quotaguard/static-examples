package main

import (
	"fmt"
	"io"
	"log"
	"net/url"
	"os"
	"time"

	"github.com/pkg/sftp"
	"golang.org/x/crypto/ssh"
	"golang.org/x/net/proxy"
)

func main() {
	// Get the proxy URL from the environment variable.
	proxyURL := os.Getenv("QUOTAGUARDSTATIC_URL")
	if proxyURL == "" {
		log.Fatal("Environment variable QUOTAGUARDSTATIC_URL not set")
	}

	// Parse the proxy URL.
	parsedURL, err := url.Parse(proxyURL)
	if err != nil {
		log.Fatalf("Error parsing QUOTAGUARDSTATIC_URL: %v", err)
	}

	// Extract user info if provided.
	var auth *proxy.Auth = nil
	if parsedURL.User != nil {
		username := parsedURL.User.Username()
		password, _ := parsedURL.User.Password()
		auth = &proxy.Auth{
			User:     username,
			Password: password,
		}
	}

	// Get host and port for the proxy.
	proxyAddr := parsedURL.Host

	// Create a SOCKS5 dialer using the provided proxy details.
	dialer, err := proxy.SOCKS5("tcp", proxyAddr, auth, proxy.Direct)
	if err != nil {
		log.Fatalf("Failed to create SOCKS5 dialer: %v", err)
	}

	// Use the public Rebex SFTP server for testing.
	sshHost := "test.rebex.net:22"
	sshUser := "demo"
	sshPassword := "password"

	// Configure the SSH client.
	sshConfig := &ssh.ClientConfig{
		User: sshUser,
		Auth: []ssh.AuthMethod{
			ssh.Password(sshPassword),
		},
		// NOTE: For production, replace InsecureIgnoreHostKey() with proper host key validation.
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
		Timeout:         10 * time.Second,
	}

	// Connect to the SSH server via the proxy.
	conn, err := dialer.Dial("tcp", sshHost)
	if err != nil {
		log.Fatalf("Failed to dial SSH server through proxy: %v", err)
	}

	// Upgrade the connection to an SSH client connection.
	sshConn, chans, reqs, err := ssh.NewClientConn(conn, sshHost, sshConfig)
	if err != nil {
		log.Fatalf("Failed to establish SSH connection: %v", err)
	}
	sshClient := ssh.NewClient(sshConn, chans, reqs)
	defer sshClient.Close()

	// Create an SFTP client over the SSH connection.
	sftpClient, err := sftp.NewClient(sshClient)
	if err != nil {
		log.Fatalf("Failed to create SFTP client: %v", err)
	}
	defer sftpClient.Close()

	// Open the "readme.txt" file in the SFTP server's root directory.
	remoteFilePath := "readme.txt"
	file, err := sftpClient.Open(remoteFilePath)
	if err != nil {
		log.Fatalf("Failed to open file %s: %v", remoteFilePath, err)
	}
	defer file.Close()

	// Read the contents of the file.
	contents, err := io.ReadAll(file)
	if err != nil {
		log.Fatalf("Failed to read file %s: %v", remoteFilePath, err)
	}

	// Output the file contents.
	fmt.Printf("Contents of %s:\n%s\n", remoteFilePath, contents)
}
