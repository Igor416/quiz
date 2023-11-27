from rest_framework.serializers import ModelSerializer, UUIDField
from .models import Quiz, Category, Question, Team

class QuestionSerializer(ModelSerializer):
  def to_representation(self, instance):
    r = super().to_representation(instance)
    r['answers'] = [r.pop(f'answer{i}') for i in range(1, 5)]
    return r
  
  class Meta:
    fields = '__all__'
    model = Question

class CategorySerializer(ModelSerializer):
  questions = QuestionSerializer(many=True)
  
  class Meta:
    exclude = ['quiz']
    model = Category
    
class QuizSerializer(ModelSerializer):
  class Meta:
    fields = ['name', 'id']
    model = Quiz

class QuizDetailedSerializer(ModelSerializer):
  categories = CategorySerializer(many=True)
  
  def get_categories(self, instance):
    return Category.objects.filter(quiz=instance)
  
  class Meta(QuizSerializer.Meta):
    fields = '__all__'
  
class TeamSerializer(ModelSerializer):
  class Meta:
    fields = '__all__'
    model = Team
