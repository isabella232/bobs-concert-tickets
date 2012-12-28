nprapps' Project Template
=========================

About this template
-------------------

This template provides a a project skeleton suitable for any project that is to be served entirely as flat files. Facilities are provided for rendering html from data, compiling LESS into CSS, deploying to S3, etc.

What's in here?
---------------

The project contains the following folders and important files:

* ``data`` -- Data files, such as those used to generate HTML
* ``etc`` -- Miscellaneous scripts and metadata for project bootstrapping.
* ``jst`` -- Javascript ([Underscore.js](http://documentcloud.github.com/underscore/#template)) templates 
* ``less`` -- [LESS](http://lesscss.org/) files, will be compiled to CSS and concatenated for deployment
* ``templates`` -- HTML ([Jinja2](http://jinja.pocoo.org/docs/)) templates, to be compiled locally
* ``www`` -- Static and compiled assets to be deployed (a.k.a. "the output")
* ``app.py`` -- A [Flask](http://flask.pocoo.org/) app for rendering the project locally.
* ``app_config.py`` -- Global project configuration for scripts, deployment, etc.
* ``fabfile.py`` -- [Fabric](http://docs.fabfile.org/en/latest/) commands automating setup and deployment

Install requirements
--------------------

Node.js is required for the static asset pipeline. If you don't already have it, get it like this:

```
brew install node
curl https://npmjs.org/install.sh | sh
```

Then install the project requirements:

```
cd $NEW_PROJECT_NAME
npm install less universal-jst
mkvirtualenv $NEW_PROJECT_NAME
pip install -r requirements.txt
```

Generating the tiles
--------------------

The source image and tiles are not stored in the repository. **Please do not commit them.** To cut the tiles:

* Download the source image from Dropbox and save it as ``data/full.png``.
* Run ``python cut_tiles.py``

Making the full-size download work
----------------------------------

The full-size image is excluded from the repository by default. To make the download work grab the source image from Dropbox and save it as ``www/img/bobs-concert-tickets-full-size.png``.

Run the project locally
-----------------------

A flask app is used to run the project locally. It will automatically recompile templates and assets on demand.

```
workon $NEW_PROJECT_NAME
python app.py
```

Visit ``localhost:8000`` in your browser.

Compile with static assets
--------------------------

Compile LESS to CSS, compile javascript templates to Javascript and minify all assets:

```
workon $NEW_PROJECT_NAME
fab render 
```

(This is done automatically whenever you deploy to S3.)

Test the rendered app
---------------------

If you want to test the app once you've rendered it out, just use the Python webserver:

```
cd www
python -m SimpleHTTPServer
```

Deploy to S3
------------

```
fab staging master deploy
```

Deploy to a server
------------------

The current configuration is for running cron jobs only. Web server configuration is not included.

* In ``fabfile.py`` set ``env.deploy_to_servers`` to ``True``.
* Run ``fab staging master setup`` to configure the server.
* Run ``fab staging master deploy`` to deploy the app. 
