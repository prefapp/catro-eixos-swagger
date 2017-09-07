Procesos diferidos
---
 
Para que un proceso de tipo swagger se tramite como diferido, hay que definirlo en la especificación de la api, con el flag **x-catro-eixos-diferido: 1**

Esto conlleva que la respuesta 200 de esa llamada tendrá _OBLIGATORIAMENTE_ un **schema fijo** que representa el id del job tramitado:

```yaml
/test
    x-swagger-router-controller: "Test"
    post:
      x-catro-eixos-diferido: true
      tags:
        - Test
      description: test
      operationId: "test"
      responses:
        200:
          description: "Trabajo tramitado correctamente"
          schema: 
            $ref: '#/definitions/JobId'

...

definitions:
  JobId:
    type: "object"
    properties:
      jobId:
        type: "string"
        description: "Id de un job"
        example: "eab020a8-5760-422b-9ea7-e1c0aafcbdce"

```
