from django.forms import ModelForm
from .models import Quiz, Category, Question, Team
from django.db.models import Q

class LimitedByUser(ModelForm):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.request = kwargs.get('request')

class QuestionForm(ModelForm):
  class Meta:
    fields = '__all__'
    model = Question
    
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    
    self.fields['category'].queryset = Category.objects.filter(Q(quiz__owner=self.request.user) | Q(quiz__public=True))
    
class CategoryForm(ModelForm):
  class Meta:
    fields = '__all__'
    model = Category
    
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    
    self.fields['quiz'].queryset = Quiz.objects.filter(Q(owner=self.request.user) | Q(public=True))
    
class CategoryForm(ModelForm):
  class Meta:
    fields = '__all__'
    model = Team
    
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    
    self.fields['quiz'].queryset = Quiz.objects.filter(Q(owner=self.request.user) | Q(public=True))