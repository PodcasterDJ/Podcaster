# Generated by Django 2.2 on 2019-12-17 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PageBackground',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('select', 'SELECT'), ('home', 'HOME'), ('about', 'ABOUT'), ('episodes', 'EPISODES'), ('blog', 'BLOG'), ('contact', 'CONTACT')], default='select', max_length=25, unique=True)),
            ],
            options={
                'verbose_name': 'Page Backgrounds',
                'verbose_name_plural': 'Page Backgrounds',
            },
        ),
        migrations.CreateModel(
            name='SocialMediaLink',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('select', 'SELECT'), ('twitter', 'TWITTER'), ('facebook', 'FACEBOOK'), ('instagram', 'INSTAGRAM'), ('youtube', 'YOUTUBE'), ('linkedin', 'LINKEDIN'), ('spotify', 'SPOTIFY')], default='select', max_length=25, unique=True)),
                ('link', models.URLField(blank=True, max_length=400, null=True)),
            ],
            options={
                'verbose_name': 'Social Media',
                'verbose_name_plural': 'Social Media',
            },
        ),
    ]