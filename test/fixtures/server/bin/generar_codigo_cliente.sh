#!/bin/bash

cp api/swagger.yaml api/swagger.yaml.cp

docker run --rm -v ${PWD}:/local -v ${PWD}/../tolemias_procesado_api:/salida swaggerapi/swagger-codegen-cli generate \
    -i /local/api/swagger.yaml \
    -l javascript \
    -o /salida 

mv api/swagger.yaml.cp api/swagger.yaml

#de npm pack test/fixtures/cliente 
#
#echo "-- Paquete generado --"
#
#mv tolemias_procesado_api-*.tgz dist/
#
#PAQUETE="$(ls dist/)"
#
#echo "-- Subiendo paquete a s3 --"
#
#s3cmd put -P dist/
