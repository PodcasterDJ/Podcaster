# [![Podcaster](./PodcasterLogo25.png)](https://hvitis.com/free-podcasts-blog-template-based-on-django) Podcaster 🎙️📝
Make your place in web in seconds. Write Blog or submit Podcasts. 
___
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

(or read first how to do it in case you don't have Amazon Web Services account yet.)

#### Development

To tun any Django command directly on production use:
```
python manage.py makemigrations
```

#### Prod

To tun any DJango command directly on production use:
```
heroku run -a podcastings python manage.py collectstatic
```

#### Logs

In case you want to see what's happening without entering the Dashboard 
```
heroku logs --tail -a YOUR_APP_NAME
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
