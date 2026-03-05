import java.net.*;
import java.io.*;

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

        URL url = new URL("https://request-checker.quotaguard.com");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        // Set the request method to POST
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);

        // Set the request headers
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Accept", "application/json");

        // Create the JSON body
        String jsonBody = "{ \"hello\": \"there\" }";

        // Write the JSON body to the output stream
        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = jsonBody.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        // Read the response
        try (BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                System.out.println(inputLine);
            }
        }

        conn.disconnect();
    }
}
