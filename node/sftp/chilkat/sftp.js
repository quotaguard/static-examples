var os = require('os');
var chilkat = require('@chilkat/ck-node17-linux64');
var url = require('url');
var fs = require('fs');

var proxy = url.parse(process.env.QUOTAGUARDSTATIC_URL);

var puser = proxy.auth.split(':')[0];
var ppass = proxy.auth.split(':')[1];

function chilkatExample() {

    var sftp = new chilkat.SFtp();

    // To use a SOCKS4 or SOCKS5 proxy, simply set the following
    // properties prior to connecting:
    // The SOCKS hostname may be a domain name or 
    // IP address:
    sftp.SocksHostname = proxy.hostname
    sftp.SocksPort = 1080;
    sftp.SocksUsername = puser;
    sftp.SocksPassword = ppass;

    // Set the SOCKS version to 4 or 5 based on the version
    // of the SOCKS proxy server:
    sftp.SocksVersion = 5;

    // Note: SOCKS4 servers only support usernames without passwords.
    // SOCKS5 servers support full login/password authentication.

    // Connect to the SSH server.  
    // The standard SSH port = 22
    // The hostname may be a hostname or IP address.
    var hostname = "test.rebex.net";
    var port = 22;
    var username = "demo";
    var password = "password";

    var success = sftp.Connect(hostname,port);
    if (success !== true) {
        console.log(sftp.LastErrorText);
        return;
    }

    success = sftp.AuthenticatePw(username,password);
    if (success !== true) {
        console.log(sftp.LastErrorText);
        return;
    }

    success = sftp.InitializeSftp();
    if (success !== true) {
        console.log(sftp.LastErrorText);
        return;
    }

    // Download a file.
    var localPath = "readme.txt";
    var remoteFilename = "readme.txt";

    console.log("downloading");
    success = sftp.DownloadFileByName(remoteFilename, localPath);
    if (success !== true) {
        console.log(sftp.LastErrorText);
        return;
    }

    success = sftp.Disconnect();

    console.log("File Downloaded!");

    fs.readFile(localPath, function(err, data){
      err ? Function("error","throw error")(err) : console.log(data.toString('utf8'));
    });
}

chilkatExample();
