# [![Podcaster](./PodcasterLogo25.png)](https://hvitis.com/free-podcasts-blog-template-based-on-django) Podcaster 🎙️📝 on Heroku
Make your place in web in seconds. Write Blog or submit Podcasts. 
___
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

(or read first what's below in case you want it to be 100% Free.)

### Introduction

This is Public Repository with a simple Podcast/Blog application written in Django 2. The basic look is based on [free ColorLib podcasts template][0]. How it looks after deploy and customisation can be seen [here][1].

[![ButterflyBone.doctor](https://i.ibb.co/x6XwqKj/Screenshot-2020-04-10-at-20-31-16.png
)](http://www.butterflybone.doctor/en-us/home)



### Things you should know 💡

Because of Heroku's [file storage policies][2] this App uses [AWS S3][3] to store files like Photos and Audio. By default the button you see on the top uses paid heroku Add-on [Bucketeer][4] that costs 5$ per month and is billed on your heroku account.

In order to avoid paying for Heroku Add-on you can use your own AWS S3 bucket with [__FREE__][5] tier. If you don't have or don't know how to get needed credentials for your bucket [check this tutorial][6].

If you want to deploy your app __100% FREE__ you can use button on [no-addons-free-deploy][7] branch, that will generate you the deploy without bucketeer.

__IMPORTANT!__:
> During deploy admin account is created automatically with the following credentials: login __admin__ / pass __StarIfUsefulThanks!__. Don't forget to change the admin password after first login!

[0]: https://colorlib.com/wp/template/mypodcast/
[1]: https://butterflybone.doctor
[2]: https://help.heroku.com/K1PPS2WM/why-are-my-file-uploads-missing-deleted
[3]: https://aws.amazon.com/s3/pricing/
[4]: https://elements.heroku.com/addons/bucketeer
[5]: https://aws.amazon.com/free/?nc1=h_ls&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc
[6]: https://simpleisbetterthancomplex.com/tutorial/2017/08/01/how-to-setup-amazon-s3-in-a-django-project.html
[7]: https://github.com/hvitis/Podcaster/tree/no-addons-free-deploy

### What is my goal?

The goal is to teach people Django and practice together via Pull Requests, pair programing and having fun. Expand functionalities by learning _Django Rest Framework_ and increase the customisation options. Implement good practices, new functionalities and more. 
If you want to join, try our [![Telegram Group](https://patrolavia.github.io/telegram-badge/chat.png)](https://patrolavia.github.io/telegram-badge/chat.png) If you don't have Telegram and would like to collaborate would be nice if you could [drop me a message][12]. 😁

If you are ( or want to be ) Django developer, you can check [Issues][8] on this repo. There is plenty of different possible tasks that you could help with. 

If you would like this template to have more functionalities ( shop? look? etc ) [create an Issue][9] for it wiht a <mark>__feature-idea__</mark> label. 

__ We follow collaboration rules __ good code practices, REST guidelines and more so please read [contribution rules][33] before taking an issue.

[8]: https://github.com/hvitis/Podcaster/issues
[9]: https://github.com/hvitis/Podcaster/issues/new
[12]: https://hvitis.com/contact
[33]: https://github.com/PodcasterDJ/Podcaster/edit/master/CONTRIBUTE.md
### Who is this for?

This repo is for everybody that either wants to have his own Podcast / Blog or for people who like _Django_ framework / would like to start with it.

You can deploy it for Free and then adjust it or change theme in the way you like. Important to know that when deployed to heroku you can [clone your repository from heroku][10]. You can also clone it locally and later host yourself.

[10]: https://stackoverflow.com/questions/13804885/heroku-gitclone-creates-empty-repository

### How to run it?

Once you deployed your repo on Heroku, start with making virtual environment:
```
virtualenv my-podcasts
cd my-podcasts
```

Then clone the repo:
```
heroku login
heroku git:clone -a YOUR_APP_NAME
git remote add origin https://github.com/hvitis/Podcaster
git pull origin master
```


Install dependencies within virtual environment:
```
cd Podcaster
pip install -r requirements.txt
```


#### Development

To tun any Django command directly on dev use:
```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

#### Prod

To run any Django command directly on production use:
```
heroku run -a YOUR_APP_NAME python manage.py migrate
```

#### Logs

In case you want to see what's happening on your Production app without entering the Dashboard:
```
heroku logs --tail -a YOUR_APP_NAME
```

#### Authors

- [Hvitis][11] 👨🏼‍💻
- It might be you! Feel free to contribute.

[11]: https://hvitis.com
