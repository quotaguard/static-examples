FROM php:7.4-apache

WORKDIR /app/

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    zip \
    unzip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install GuzzleHttp
RUN composer require guzzlehttp/guzzle

# Copy PHP script
COPY https.php https.php

CMD [ "php", "https.php" ]