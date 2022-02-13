# Información general del proyecto
El proyecto desarrollado bajo Angular cuenta con 3 elementos principales:
1. Login
2. Menú
3. Páginas de acceso según el perfil: compañías, vehículos y usuarios

Los perfiles (roles) de acceso al sistema son:
1. Administrador: permite agregar compañías a la base de datos.
2. Usuario general: permite agregar vehículos y asociarlos a una compañía, así como agrgar usuarios (con perfil de conductor por defecto) y asignarles un vehículo.

Los cargos disponibles son:
1. Representante legal
2. Conductores
3. Administrador plataforma

# Data de prueba
Para iniciar sesión, puede hacerse con:
Usuario administrador que puede agregar compañías:
j.valencia/j.valencia

Usuarios general (Representantes legales) que pueden crear vehículos y usuarios
p.jimenez/p.jimenez
c.ortiz/c.ortiz
n.camelo/n.camelo
Estos tres usuarios están asignados a compañías diferentes, por lo que pueden ver información diferente de vehículos y usuarios registrados.

# Información adicional
+ El login cuenta con una seguridad SHA-256 para el cifrado desde el front y en la base de datos, haciendo posterior comparación de _string_ para permitir el acceso.
+ El ACL permite el acceso únicamente a las páginas permitidas.
+ Para los formularios no se habilita el botón de _submit_ hasta que no se ingrese la información completa.
+ Los vehículos que estén afiliados a una compañía solo podrán ser vistos por esta. Y los vehículos que no estén afiliados a ninguna pueden ser vistos por todas las compañías.
+ Los Conductores pueden tener varios vehículos asginados.


*********************************************************************

# DatatoolsPrueba

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
