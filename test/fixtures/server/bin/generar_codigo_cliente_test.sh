#!/bin/bash

cp api/swagger.yaml api/swagger.yaml.cp

docker run --rm -v ${PWD}:/local swaggerapi/swagger-codegen-cli generate \
    -i /local/api/swagger.yaml \
    -l javascript \
    -o /local/test/fixtures/cliente 

mv api/swagger.yaml.cp api/swagger.yaml

