#!/bin/bash

cp api/swagger.yaml api/swagger.yaml.cp

docker run --rm -v ${PWD}:/local  --user $(id -u $USER) swaggerapi/swagger-codegen-cli generate \
    -i /local/api/swagger.yaml \
    -l nodejs-server \
    -t /local/plantillas \
    -o /local/routes

mv api/swagger.yaml.cp api/swagger.yaml

rm -rf routes/package.json routes/index.js routes/README.md routes/api
