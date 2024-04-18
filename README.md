# AcidPattern

A site dedicated to sharing and composing patterns for the Roland TB-303 and its various clones and emulations.



# Set Up

If you're working a fork of this project or looking to contribute, the following guide will help you get acidpattern running locally.

### Installing Python Dependencies

This guide assumes you have python 3.12 or greater installed on your system. Compatibility with older version of Python has not been determined at this time.

In the root directory run `python -m venv .venv` to establish a virtual environment. Activate the environment with `source .venv/Scripts/activate` on Windows or `source .venv/bin/activate` on MacOS/Linux.

Install the dependencies with `python -m pip install`, if using poetry: `poetry install`.

### Installing Node Dependencies

Navigate into the `/frontend` folder and run `npm install` to install the frontend dependencies.

### Establishing the .env

Create a .env file in the root project directory and add the following code.

```
HOST_URL = 'http://localhost:8000/'
CLIENT_URL = 'http://localhost:5173/'
DJANGO_SECRET_KEY = ''
```
If you're planning to run on different ports or a server, adjust accordingly.

You will also need to create a secret key for django.
Activate a python shell in the terminal `python` and run the following.
```
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```
Take the secret key and use it as the `DJANGO_SECRET_KEY`

### Creating the database

In the `acidpattern_api/` directory, run `python manage.py migrate` to create the database.

Run `python manage.py createsuperuser` to establish a superuser for the database.

### Running the development server.

#### Both servers can be run at once using Concurrently.
- In the front end directory, run `npm run dev`
#### To run only the django server:
- From within the `acidpattern_api/` directory: `python manage.py runserver`
- From within the `frontend/` directory: `npm run django-dev`
#### To run only the vite server
- From within the `frontend/` directory: `npm run vite-dev`

# Testing

Tests can be run for the backend by navigating to `acidpattern_api` and running `coverage run manage.py test` within the venv shell.
