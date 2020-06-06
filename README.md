<p align="center">
  <a href="#">
    <img src="./web/src/assets/logo.svg" alt="ecoleta logo">
  </a>
</p>

<h3 align="center">🗑️ Recolección de residuos orgánicos e inorgánicos</h3>

[![Total alerts](https://img.shields.io/lgtm/alerts/g/wilderPariona/ecoleta.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/wilderPariona/ecoleta/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/wilderPariona/ecoleta.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/wilderPariona/ecoleta/context:javascript)
![Stability Project][stability-image]
[![Known Vulnerabilities](https://snyk.io/test/github/wilderPariona/ecoleta/badge.svg)](https://snyk.io/test/github/wilderPariona/ecoleta)


## Backend API-REST



| EndPoint             |  HTTP  |                       Description |
| :------------------- | :----: | --------------------------------------: |
| **`/items`**         |  GET   | Obtener todos los item que recolección |
| **`/points?items=4&city=Huamanga&uf=Ayacucho`**        |  GET   | Obtener los puntos que cumplen los criterios |
| **`/points/:id`**     |  GET  |                Filtrar un punto de recolección especifico |
| **`/points`** |  POST   |           Crear un nuevo punto de recolección |

### Dependencias

1. Instalar sqlite3 en su maquina

### Correr localmente

1. Clone el repositorio y entre a la carpeta backend
2. Ejecute `yarn install` o `npm install`
3. Ejecute `yarn knex:migrations`
4. Ejecute `yarn knex:seed`
5. Ejecute `yarn dev`






[stability-image]: https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg
