import java.net.*;
import java.io.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class Main {
    public static void main(String[] args) throws Exception {
        URL proxyUrl = new URL(System.getenv("QUOTAGUARDSTATIC_URL"));
        String userInfo = proxyUrl.getUserInfo();
        String user = userInfo.substring(0, userInfo.indexOf(':'));
        String password = userInfo.substring(userInfo.indexOf(':') + 1);

        System.setProperty("http.proxyHost", proxyUrl.getHost());
        System.setProperty("http.proxyPort", Integer.toString(proxyUrl.getPort()));
        System.setProperty("https.proxyHost", proxyUrl.getHost());
        System.setProperty("https.proxyPort", Integer.toString(proxyUrl.getPort()));

        // Required for HTTPS proxy tunneling: re-enable Basic auth for CONNECT requests.
        // Java 8u111+ disables Basic auth for HTTPS tunneling by default.
        System.setProperty("jdk.http.auth.tunneling.disabledSchemes", "");

        Authenticator.setDefault(new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                if (getRequestorType() == RequestorType.PROXY) {
                    return new PasswordAuthentication(user, password.toCharArray());
                }
                return null;
            }
        });

        // Fetch an HTTPS URL through the proxy using Jsoup
        Document doc = Jsoup
                .connect("https://ip.quotaguard.com")
                .userAgent("Mozilla/5.0")
                .ignoreContentType(true)
                .timeout(30000)
                .get();

        System.out.println(doc.body().text());
    }
}
