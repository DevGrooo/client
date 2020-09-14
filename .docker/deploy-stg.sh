#!/bin/bash

cd /var/www/stg-server

docker-compose pull web_fmc_client
docker-compose stop web_fmc_client
docker-compose up -d web_fmc_client
