# AcidPattern

![A screenshot of the development version of the acidpattern website, showing a grey navigation header, and a silver, box shaped synthesizer in the center, with a green LCD inside showing details about the synthesizer.](https://github.com/henry-oberholtzer/acidpattern/blob/main/documentation/screenshot_01.jpg?raw=true)

A site dedicated to sharing and composing patterns for the Roland TB-303 and its various clones and emulations. Still under development, but soon be live at acidpattern.com

Graphically inspired by early rave music forums, chunky VST design and old LCD panels.


## Set Up

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
DJANGO_SERVER = 'http://localhost:8000'
FRONTEND_SERVER = 'http://localhost:5173'
DJANGO_SECRET_KEY = ''
```

In the /frontend folder, create .env containing the following:

```
VITE_BACKEND='http://localhost:8000'
```

If you're planning to run on different ports or a server, adjust accordingly.

You will also need to create a secret key for django.
Activate a python shell in the terminal `python` and run the following.
```
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```
Take the secret key and use it as the `DJANGO_SECRET_KEY`

`exit()` to close the Python shell.

### Creating the database

In the `acidpattern_api/` directory, run `python manage.py migrate` to create the database.

Run `python manage.py createsuperuser` to establish a superuser for the database.

## Running the development server.

#### Both servers simultaenously:
`npm run dev` in the `frontend/` directory.
#### Only the django server:

`python manage.py runserver` in the `acidpattern_api/` directory/

`npm run django-dev` in the `frontend/` directory.
#### To run only the vite server:
`npm run vite-dev` in the `frontend/` directory.

# Testing

Tests can be run for the backend by navigating to `acidpattern_api` and running `coverage run manage.py test` within the venv shell.

# License

Copyright 2024 Henry Oberholtzer

Original code licensed under a GNU GPLv3

# References

I have been relying on these resources for developing my 303 clone.
