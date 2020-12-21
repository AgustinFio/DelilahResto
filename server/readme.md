Trabajo Nro 3 del curso "Desarrollo Web Full Stack" de Acamica. Consiste en desarrollar una API de pedidos de una tienda de comida llamada Delilah Resto.

    RECURSOS UTILIZADOS:
-Nodemon
-Express
-Sequelize-
-JWT
-Swagger (Documentacion de la API)
-Postman
-MySQL

DOCUMENTACION DE LA API:
-Abrir el archivo "openapi.yaml" y copiar su contenido en Swagger => https://editor.swagger.io/ . Dentro de este archivo se encuentra toda la informacion relacionada a la API, sus endpoints, sus respuestas y como hacer uso de la misma.

INSTALACION DEL PROYECTO

1:: CLONAR PROYECTO: 
Clonar el repositorio desde el siguiente link => https://github.com/AgustinFio/DelilahResto.git

Desde la consola ejecutar el siguiente comando: 

`git clone https://github.com/AgustinFio/DelilahResto.git. `

2:: Para instalar dependencias:

npm install

3:: Para utilizar la base de datos:

Abrir XAMPP, y asegurarse que el puerto sobre el cual se esta ejecutando sea el puerto 3000
Iniciar Apache y MYSQL
Abrir panel de control de MYSQL
Crear una base de datos llamada delilah_resto
Importar el archivo ubicado en database/delilah_resto.sql

4:: Para Iniciar el servidor:
Abrir el archivo server.js ubicado en la carpeta /server y ejecutar en consola node.js para que empiece a funcionar.

5:: Testeo de endpoints:
Abrir Postman y asegurarse de estar haciendo las consultas a los endpoints de forma correcta (Informacion en la documentacion) y en http://localhost:3000

