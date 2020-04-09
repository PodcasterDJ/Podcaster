# Podcasts with Django

Click here and set up your page.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

(or read first how to do it in case you don't have Amazon Web SErvices account yet.)

#### Development

To tun any DJango command directly on production use:
```
python manage.py makemigrations
```

#### Prod

To tun any DJango command directly on production use:
```
heroku run -a HEROKU_PROJECT_NAME python manage.py makemigrations
```

#### Logs

In case you want to see what's happening without entering the Dashboard 
```
heroku logs --tail -a HEROKU_PROJECT_NAME
```

#### Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
git clone git@github.com:heroku/button-sample.git # or clone your own fork
cd button-sample
npm install
npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

#### Documentation

For more information about using Heroku, check out https://devcenter.heroku.com/