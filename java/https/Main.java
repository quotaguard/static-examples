import java.net.*;
import java.io.*;

public class Main {
    public static void main(String[] args) throws Exception {
        URL proxyUrl = new URL(System.getenv("QUOTAGUARDSTATIC_URL"));
        String userInfo = proxyUrl.getUserInfo();
        String user = userInfo.substring(0, userInfo.indexOf(':'));
        String password = userInfo.substring(userInfo.indexOf(':') + 1);

        URLConnection conn = null;
        System.setProperty("http.proxyHost", proxyUrl.getHost());
        System.setProperty("http.proxyPort", Integer.toString(proxyUrl.getPort()));

        Authenticator.setDefault(new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(user, password.toCharArray());
                }
            });

        URL url = new URL("http://ip.quotaguard.com");
        conn = url.openConnection();
        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null)
            System.out.println(inputLine);

        in.close();
    }
}
