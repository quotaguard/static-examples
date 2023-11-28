#/usr/bin/env python
import ftplib
import os
import socks

from urllib.parse import urlparse

if __name__ == '__main__':
    quotaguard = urlparse(os.environ['QUOTAGUARDSTATIC_URL'])
    proxy = socks.socksocket()
    proxy.set_proxy(
        proxy_type=socks.SOCKS5,
        addr=quotaguard.hostname,
        port=1080,
        username=quotaguard.username,
        password=quotaguard.password,
    )
    proxy.connect(('speedtest.tele2.net', 21))

    ftp = ftplib.FTP()
    ftp.sock = proxy
    ftp.connect('speedtest.tele2.net', 21)
    ftp.login('anonymous', '')

    filename = '1KB.zip'

    with open(filename, 'wb') as local_file:
        ftp.retrbinary('RETR ' + filename, local_file.write)

    if os.path.exists(filename):
        print('File downloaded successfully')
        os.remove(filename)

    ftp.quit()
    proxy.close()
