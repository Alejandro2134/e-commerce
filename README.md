## Ejecutar proyecto

Debes tener instalado docker y docker-compose, una vez los tengas ve a la raiz del proyecto y ejecura el comando `docker compose up` el cual va a levantar tanto los microservicios como la base de datos, una vez todos los servicios esten levantados dirigete a esta dirección en tu navegador: http://localhost:3000/api donde podras acceder a swagger y hacer peticiones para crear, listar productos y crear, listar ordenes.

## Arquitectura de la solución

La solución fue implementada bajo una arquitectura de microservicios utilizando NestJS como framework principal en donde se definen cuatro componentes principales

- API Gateway: Recibe solicitudes del cliente, valida datos de entrada, delega operaciones a microservicios y desacopla al cliente de la lógica interna de negocio.
- Microservicio de productos: Permite crear productos y listarlos además de tener una conexión con una bd para persistir los datos.
- Microservicio de ordenes: Permite crear ordenes y listarlas, se conecta con el microservicio de productos para validar info asociada a la ordén y se conecta con una bd para persistir los datos.
- Base de datos: Se usa PostgreSQL como motor principal para persistencia y cada microservicio mantiene su propia lógica de persistencia mediante sequelize

Donde el cliente consume únicamente el API Gateway mediante endpoints REST. El Gateway se encarga de enrutar las solicutudes y comunicarse con los microservicios mediante transporte TCP provisto por NestJS.

La atquitectura esta pensada para ser escalable, mantenible y mantiene una separación de responsabilidades al tener servicios con dominios totalmente diferentes (productos y ordenes), esto permite que si el catalogo de productos es solicitado mas por los usuarios solo esta parte pueda escalar sin importar si muchas ordenes son creadas o no, esto también permite que equipos de desarrollo se concentren en un servicio en especifico, haciendolos mas facil de debuguear para encontrar errores y actuar rapido ante bugs.

## Diseño Cloud

La solución fue diseñada para ejecutarse en una simulación local de entorno cloud utilizando Docker Compose.

Cada componente de la arquitectura se ejecuta en un contenedor independiente, permitiendo replicar un despliegue desacoplado similar a un entorno productivo.

### Servicios desplegados

- API Gateway
- Products Service
- Orders Service
- PostgreSQL

### Orquestación local

Docker Compose permite levantar todos los servicios de forma coordinada, gestionando:

- red interna entre contenedores
- orden de inicialización
- variables de entorno
- puertos expuestos

### Comunicación entre servicios

Los microservicios se comunican mediante transporte TCP usando la red interna creada por Docker Compose.

Cada servicio expone su puerto interno y es accesible mediante su nombre de contenedor.

Ejemplo:

- products-service:3001
- orders-service:3002

### Base de datos

PostgreSQL se ejecuta en un contenedor dedicado.

La conexión se realiza mediante variables de entorno configuradas por servicio:

- host
- puerto
- usuario
- contraseña
- nombre de base de datos

Cada microservicio accede a la base de datos utilizando Sequelize como ORM.

### Configuración por ambientes

Cada servicio puede utilizar un archivo .env independiente para desacoplar configuración de infraestructura y aplicación.

Esto permite modificar fácilmente:

- puertos
- host de base de datos
- credenciales
- puertos TCP internos

### Escenario cloud real

En un despliegue cloud real, esta solución podría migrarse a servicios como:

- contenedores en AWS ECS
- base de datos administrada en RDS
- balanceo mediante API Gateway o Load Balancer

La estructura actual facilita esta migración debido al desacoplamiento entre servicios.

## Pipeline CI/CD

Puedes encontrar el archivo del pipeline en el siguiente link: https://github.com/Alejandro2134/e-commerce/blob/main/.github/workflows/products-service-ci.yml este pipeline se configuro para el servicio de productos

### Pasos del pipeline:

- Checkout code: Descarga el código fuente del repositorio dentro del runner de GitHub Actions para permitir la ejecución del pipeline.

- Set up Node.js: Configura el entorno de ejecución con Node.js versión 20 e incorpora cache de dependencias npm usando el package-lock.json del microservicio mejorado tiempos de ejecución en futuras ejecuciones.

- Install dependencies: Ejecuta `npm ci` para instalar dependencias de forma limpia y reproducible a partir del lock file.

- Build project: Compila el microservicio mediante `npm run build` validando que el proyecto sea construible correctamente antes de cualquier despliegue.

- Simulated deploy: Se ejecuta una simulación de despliegue mediante un comando simple. Esto representa el paso donde en un entorno real se publicaría el servicio en infraestructura cloud.

- Auto version bump: Se incrementa automáticamente la versión patch del proyecto mediante `npm version patch –no-git-tag-version` Esto permite mantener versionado incremental automatizado.

- Generate changelog: Se genera un changelog simple basado en los últimos commits del repositorio `git log –oneline -5 > CHANGELOG.md` Esto permite trazabilidad rápida de cambios recientes.

## Diagrama entidad relación
