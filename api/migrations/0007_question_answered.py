# Generated by Django 4.2.7 on 2023-11-26 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_question_answered'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='answered',
            field=models.BooleanField(default=False, verbose_name='Ответили уже?'),
        ),
    ]