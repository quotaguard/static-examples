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

        Authenticator.setDefault(new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(user, password.toCharArray());
            }
        });

        URL url = new URL("http://request-checker.quotaguard.com");
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
