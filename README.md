<p align="center">
  <a href="#">
    <img src="./web/src/assets/logo.svg" alt="ecoleta logo">
  </a>
</p>

<h3 align="center">🗑️ Recolección de residuos orgánicos e inorgánicos</h3>
<p align="center">Proyecto realizado a partir de la semana NLW #1 de <a href="https://rocketseat.com.br/">Rocketseat 🚀</a> </p> 

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
2. Configurar la IP local de su máquina

### Correr localmente

1. Clone el repositorio y entre a la carpeta backend
2. Ejecute `yarn install` o `npm install`
3. Ejecute `yarn knex:migrations`
4. Ejecute `yarn knex:seed`
5. Ejecute `yarn dev`

## Frontend Web

### Dependencias

1. La API consumida del INEI para obtener los departamentos y provincias no permite acceder localmente para solucionarlo podemos instalar CORS Unblock para [firefox](https://addons.mozilla.org/es/firefox/addon/cors-unblock/?src=search) o [Chrome](https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino)
2. Configurar la IP local de su máquina

### Correr localmente

1. Entre a la carpeta web
2. Ejecute `yarn install` o `npm install`
3. Ejecute `yarn start`

## Frontend Mobile

### Dependencias

1. [Instalar expo cli](https://docs.expo.io/workflow/expo-cli/#installation) en su máquina
2. En su celular instalar el cliente de expo para [android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www) o  [IOS](https://apps.apple.com/app/apple-store/id982107779)
2. Configurar la IP local de su máquina

### Correr localmente

1. Entre a la carpeta mobileApp
2. Ejecute `yarn install` o `npm install`
3. Ejecute `expo start`
4. Espere a que cargue el código QR
5. Escanee el codigo QR con el cliente de expo


## CONTRIBUTORS ✨

<table>
  <tr>
    <td align="center"><a href="https://github.com/wilderPariona"><img src="https://avatars3.githubusercontent.com/u/46570334?s=460&u=f4431e9164f5d719945b16feb676ddc2a7d9666c&v=4" width="100px;" alt=""/><br /><sub><b>Wilder Pariona</b></sub></a><br /><a href="https://github.com/wilderPariona/devVideos/commits?author=wilderPariona" title="Code">💻</a> <a href="#design-wilderPariona" title="Design">🎨</a> <a href="https://github.com/wilderPariona/devVideos/commits?author=wilderPariona" title="Documentation">📖</a> <a href="#infra-wilderPariona" title="Infrastructure (Hosting, Build-Tools, etc)">🛠️</a> <a href="#maintenance-wilderPariona" title="Maintenance">🚧</a> <a href="https://github.com/wilderPariona/devVideos/commits?author=wilderPariona" title="Tests">☢️</a></td>
  </tr>
</table>




[stability-image]: https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg
