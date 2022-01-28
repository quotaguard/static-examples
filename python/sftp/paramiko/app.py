#/usr/bin/env python
import os
import paramiko
import socks

from urllib.parse import urlparse

if __name__ == '__main__':
    proxy = urlparse(os.environ['QUOTAGUARDSTATIC_URL'])
    sock=socks.socksocket()
    sock.set_proxy(
        proxy_type=socks.SOCKS5,
        addr=proxy.hostname,
        port=1080,
        username=proxy.username,
        password=proxy.password,
    )
    sock.connect(('test.rebex.net', 22))

    tport = paramiko.Transport(sock)
    tport.connect(username='demo',password='password')

    sftp = paramiko.SFTPClient.from_transport(tport)

    sftp.get('readme.txt','readme.txt')

    sftp.close()
    tport.close()

    #print the contents of the file downloaded
    f = open('readme.txt', 'r')
    file_contents = f.read()
    print(file_contents)
    f.close()
