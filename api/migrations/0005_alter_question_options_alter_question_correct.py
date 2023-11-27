# Generated by Django 4.2.7 on 2023-11-23 20:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_category_options_alter_question_options_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='question',
            options={'ordering': ['category__name', 'value'], 'verbose_name': 'Вопрос', 'verbose_name_plural': 'Вопросы'},
        ),
        migrations.AlterField(
            model_name='question',
            name='correct',
            field=models.IntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4)], verbose_name='Верный ответ'),
        ),
    ]
