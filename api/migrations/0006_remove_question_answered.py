# Generated by Django 4.2.7 on 2023-11-23 21:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_question_options_alter_question_correct'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='answered',
        ),
    ]