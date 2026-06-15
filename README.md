# TallerPro - Gestor de Taller Mecánico

Proyecto final Full-Stack - **ICIS_IA**.

La aplicación permite gestionar un taller mecánico: clientes, vehículos, mecánicos, reparaciones y diagnósticos técnicos.  
Se ha usado **MySQL** para los datos relacionales y **MongoDB** para guardar diagnósticos con información técnica flexible.

---

## Tecnologías utilizadas

**Frontend**

- React + Vite
- JavaScript
- React Router DOM
- Axios
- CSS propio

**Backend**

- Node.js
- Express
- Sequelize
- Mongoose

**Bases de datos**

- MySQL
- MongoDB Atlas

---

## Estructura del proyecto

```txt
taller-mecanico/
├── cliente/       # Frontend React
├── servidor/      # Backend Express
├── docs/          # Capturas para el README
├── .gitignore
└── README.md
```

---

## Base de datos MySQL

La base de datos relacional se llama:

```txt
taller_mecanico
```

Tablas principales:

| Tabla | Descripción |
|---|---|
| `clientes` | Datos de los clientes del taller |
| `vehiculos` | Vehículos asociados a clientes |
| `mecanicos` | Mecánicos del taller |
| `reparaciones` | Reparaciones asociadas a vehículos y mecánicos |

Relaciones:

```txt
clientes 1 --- N vehiculos
vehiculos 1 --- N reparaciones
mecanicos 1 --- N reparaciones
```

El script de creación e inserción de datos está en:

```txt
servidor/scripts/taller_mysql.sql
```

---

## Base de datos MongoDB

La base de datos documental se llama:

```txt
taller_mecanico
```

Colección utilizada:

```txt
diagnosticos
```

Ejemplo de documento:

```json
{
  "id_reparacion_mysql": 1,
  "titulo": "Fallo de encendido en cilindro 1",
  "descripcion": "La diagnosis OBD indica fallo intermitente en el cilindro 1.",
  "estado": "En revisión",
  "prioridad": "Alta",
  "metadatos_tecnicos": {
    "codigo_error_obd": "P0301",
    "kilometraje": 120000,
    "temperatura_motor": "94C",
    "nivel_aceite": "Bajo"
  },
  "fecha_creacion": "2026-06-15T02:41:46.733Z"
}
```

Se usa MongoDB porque los diagnósticos pueden tener campos técnicos diferentes según el tipo de avería. Por eso el campo `metadatos_tecnicos` permite guardar información variable sin modificar la estructura de MySQL.

El archivo con datos iniciales está en:

```txt
servidor/scripts/diagnosticos.json
```

---

## Funcionalidades

La aplicación incluye:

- Dashboard con resumen general.
- Listado de clientes.
- Ficha de cliente con sus vehículos.
- CRUD completo de vehículos.
- CRUD completo de reparaciones.
- CRUD completo de diagnósticos en MongoDB.
- Listado de mecánicos.
- Filtros y búsqueda.
- Confirmación antes de borrar registros.
- Validaciones en formularios y backend.
- Control de errores con mensajes al usuario.

---

## Rutas del frontend

| Ruta | Función |
|---|---|
| `/` | Dashboard |
| `/clientes` | Listado de clientes |
| `/clientes/:id` | Ficha de cliente |
| `/vehiculos` | Listado de vehículos |
| `/vehiculos/nuevo` | Crear vehículo |
| `/vehiculos/:id` | Detalle de vehículo |
| `/vehiculos/editar/:id` | Editar vehículo |
| `/mecanicos` | Listado de mecánicos |
| `/reparaciones` | Listado de reparaciones |
| `/reparaciones/nueva` | Crear reparación |
| `/reparaciones/:id` | Detalle de reparación |
| `/reparaciones/editar/:id` | Editar reparación |
| `/diagnosticos` | Listado de diagnósticos |
| `/diagnosticos/nuevo` | Crear diagnóstico |
| `/diagnosticos/editar/:id` | Editar diagnóstico |
| `/*` | Página no encontrada |

---

## Endpoints del backend

### Clientes

```txt
GET /api/clientes
GET /api/clientes/:id
```

### Vehículos

```txt
GET /api/vehiculos
GET /api/vehiculos/:id
POST /api/vehiculos
PUT /api/vehiculos/:id
DELETE /api/vehiculos/:id
```

### Mecánicos

```txt
GET /api/mecanicos
GET /api/mecanicos/:id
```

### Reparaciones

```txt
GET /api/reparaciones
GET /api/reparaciones/:id
POST /api/reparaciones
PUT /api/reparaciones/:id
DELETE /api/reparaciones/:id
```

### Diagnósticos

```txt
GET /api/diagnosticos
GET /api/diagnosticos/:id
POST /api/diagnosticos
PUT /api/diagnosticos/:id
DELETE /api/diagnosticos/:id
```

---

## Filtros y navegación contextual

La aplicación incluye filtros en varios listados:

- Vehículos: búsqueda, estado y tipo.
- Reparaciones: búsqueda, estado, prioridad y mecánico.
- Diagnósticos: búsqueda, estado y prioridad.

También hay navegación contextual entre entidades:

```txt
Cliente -> Vehículos
Vehículo -> Reparaciones
Reparación -> Diagnósticos
```

---

## Instalación en local

### Backend

```bash
cd servidor
npm install
npm run dev
```

Archivo `.env` necesario en `servidor`:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=taller_mecanico
DB_PORT=3306

MONGO_URI=mongodb+srv://USUARIO:CONTRASEÑA@CLUSTER.mongodb.net/taller_mecanico?retryWrites=true&w=majority
```

### Frontend

```bash
cd cliente
npm install
npm run dev
```

La aplicación se abre en:

```txt
http://localhost:5173
```

El backend funciona en:

```txt
http://localhost:3000
```

---

## Capturas

![Tabla clientes](docs/capturas/tabla_clientes.png)

- Tabla `clientes`.
- Tabla `vehiculos`.
- Tabla `mecanicos`.
- Tabla `reparaciones`.
- Colección `diagnosticos` en MongoDB Atlas.
- Dashboard.
- Listado de vehículos.
- Listado de reparaciones con filtros.
- Listado de diagnósticos.

---

## Despliegue

Frontend en Vercel:

```txt
PENDIENTE_AÑADIR_URL_VERCEL
```

Backend:

```txt
PENDIENTE_AÑADIR_URL_BACKEND
```

Repositorio GitHub:

```txt
PENDIENTE_AÑADIR_URL_GITHUB
```

---

## Comentarios finales

El proyecto cumple los requisitos principales del enunciado: usa MySQL con relaciones, MongoDB para datos flexibles, Sequelize/Mongoose, CRUD sobre dos tablas MySQL, CRUD sobre una colección MongoDB, filtros, validaciones, navegación entre entidades y dashboard.
