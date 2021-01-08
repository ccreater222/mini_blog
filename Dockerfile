FROM php:7.4.8-apache
RUN docker-php-ext-install pdo pdo_mysql
RUN cp /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enabled/