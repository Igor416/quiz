# Generated by Django 5.0.1 on 2024-02-27 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_team_id_alter_team_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='answer1',
            field=models.TextField(blank=True, verbose_name='Ответ 1'),
        ),
        migrations.AlterField(
            model_name='question',
            name='answer2',
            field=models.TextField(blank=True, verbose_name='Ответ 2'),
        ),
        migrations.AlterField(
            model_name='question',
            name='answer3',
            field=models.TextField(blank=True, verbose_name='Ответ 3'),
        ),
        migrations.AlterField(
            model_name='question',
            name='answer4',
            field=models.TextField(blank=True, verbose_name='Ответ 4'),
        ),
    ]