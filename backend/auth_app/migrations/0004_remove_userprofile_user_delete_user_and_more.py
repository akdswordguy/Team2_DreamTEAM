# Generated by Django 5.1.6 on 2025-02-25 15:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auth_app', '0003_remove_user_avatar_remove_userprofile_bio'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='user',
        ),
        migrations.DeleteModel(
            name='User',
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]
