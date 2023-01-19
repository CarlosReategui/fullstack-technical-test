# FULLSTACK TECHNICAL TEST

# Backend

## Pasos para levantar el proyecto

- Nota: En caso de contar con Python 3 como default, usar el comando `python3` en lugar de `python` para los comandos.

1. `cd backend/`
2. `python3 -m venv .venv`
3. `source .venv/bin/activate`
4. `pip install -r requirements.txt`
5. `python manage.py migrate`
6. `python manage.py createsuperuser`

## Rutas

- Las rutas disponibles son `/admin` y `/api`.
- Dentro de `/api` se encuentran todas las rutas REST para los adoptantes, las voluntarios, animales y adopciones.
- En el archivo `backend/pets_app/urls.py` puede verse a detalle cada una de las rutas.

## Autenticación

La aplicación cuenta con un sistema de autenticación basado en tokens usando `djangorestframework_simplejwt`. Para obtener un token, se debe hacer una petición POST a `/api/token/` con los datos de un usuario existente. El token se obtiene en el campo `access` del JSON de respuesta. Para refrescar un token expirado, se debe hacer una petición POST a `/api/token/refresh/` con el token expirado en el campo `refresh` del JSON de la petición. El token refrescado se obtiene en el campo `access` del JSON de respuesta.

## Testing

Los tests de los views del proyecto se encuentran en `backend/pets_app/tests.py` y pueden ser ejecutados con `python manage.py test`.

## Deployment

URL: [https://pets-app.onrender.com/](https://pets-app.onrender.com/)

## Credenciales admin

Pedirlas al autor del proyecto.

# Frontend

## Pasos para levantar el proyecto

1. `cd frontend/`
2. `npm install`
3. `npm start`

## Páginas

- `/`: Página principal.
- `/login`: Página de login.
- `/register`: Página de registro.
- `/admin`: Página de administración (ruta protegida; solo puede acceder un usuario de tipo admin).
- `/adoptante`: Página de adoptante (ruta protegida; solo puede acceder un usuario de tipo adoptante).
- `/voluntario`: Página de voluntario (ruta protegida; solo puede acceder un usuario de tipo voluntario).

## Deployment

URL: [https://adoptaunamigo-rho.vercel.app/](https://adoptaunamigo-rho.vercel.app/)
