using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        var proxyUrl = Environment.GetEnvironmentVariable("QUOTAGUARDSTATIC_URL");
        var testUrl = "https://ip.quotaguard.com/";

        if (string.IsNullOrEmpty(proxyUrl))
        {
            Console.WriteLine("Error: QUOTAGUARDSTATIC_URL environment variable not set.");
            return;
        }

        try
        {
            var proxyUri = new Uri(proxyUrl);
            var proxy = new WebProxy(proxyUri.Host, proxyUri.Port)
            {
                Credentials = new NetworkCredential(
                    proxyUri.UserInfo.Split(':')[0],
                    proxyUri.UserInfo.Split(':')[1]
                )
            };

            var handler = new HttpClientHandler
            {
                Proxy = proxy,
                UseProxy = true
            };

            using var client = new HttpClient(handler);
            var response = await client.GetAsync(testUrl);
            var body = await response.Content.ReadAsStringAsync();

            Console.WriteLine("Response from QuotaGuard:");
            Console.WriteLine(body);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Request failed:");
            Console.WriteLine(ex.Message);
        }
    }
}
