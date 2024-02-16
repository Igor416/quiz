from django.db import models
from uuid import uuid4

# Create your models here.
class Quiz(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid4)
  name = models.CharField('Название', max_length=32, unique=True)
  owner = models.ForeignKey('auth.User', verbose_name='Владелец', on_delete=models.CASCADE)
  public = models.BooleanField('Общая', default=False)
  
  def __str__(self):
    return self.name
  
  class Meta:
    verbose_name = 'Игра'
    verbose_name_plural = 'Игры'
  
class Category(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid4)
  name = models.CharField('Название', max_length=32, unique=True)
  quiz = models.ForeignKey(Quiz, related_name='categories', verbose_name='Игра', on_delete=models.CASCADE)
  
  def __str__(self):
    return f'{self.name} в игре: {self.quiz.name}'
  
  class Meta:
    verbose_name = 'Категория Вопросов'
    verbose_name_plural = 'Категории Вопросов'
  
class Question(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid4)
  value = models.PositiveBigIntegerField('Стоимость', choices=[(i, i) for i in range(1, 6)])
  label = models.TextField('Вопрос')
  answer1 = models.TextField('Ответ 1')
  answer2 = models.TextField('Ответ 2')
  answer3 = models.TextField('Ответ 3')
  answer4 = models.TextField('Ответ 4')
  answered = models.BooleanField('Ответили уже?', default=False)
  correct = models.IntegerField('Верный ответ', choices=[(i, i) for i in range(1, 5)])
  category = models.ForeignKey(Category, related_name='questions', verbose_name='Категория', on_delete=models.CASCADE)
  
  def __str__(self):
    return f'{"*** " if self.answered else ""}Вопрос стоимостью {self.value} в категории: {self.category.name}, в игре {self.category.quiz.name}'
  
  class Meta:
    unique_together = ['category', 'value']
    ordering = ['category__name', 'value']
    verbose_name = 'Вопрос'
    verbose_name_plural = 'Вопросы'

class Team(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid4)
  quiz = models.ForeignKey(Quiz, verbose_name='Игра', on_delete=models.CASCADE)
  name = models.CharField('Имя', max_length=32)
  score = models.PositiveSmallIntegerField('Очки', default=0)
  
  def __str__(self):
    return f'{self.name} ({self.score})'
  
  class Meta:
    verbose_name = 'Команда'
    verbose_name_plural = 'Команды'