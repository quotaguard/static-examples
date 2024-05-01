<?php

require 'vendor/autoload.php';

use GuzzleHttp\Client;

if (!getenv('QUOTAGUARDSTATIC_URL')) {
    throw new Exception('Missing environment variable');
}

$quotaguard = parse_url(getenv('QUOTAGUARDSTATIC_URL'));

$client = new Client([
    'proxy' => [
        'http'  => "http://{$quotaguard['user']}:{$quotaguard['pass']}@{$quotaguard['host']}:{$quotaguard['port']}",
        'https' => "http://{$quotaguard['user']}:{$quotaguard['pass']}@{$quotaguard['host']}:{$quotaguard['port']}",
    ],
]);

$response = $client->request('GET', 'https://ip.quotaguard.com');

echo $response->getBody();

?>