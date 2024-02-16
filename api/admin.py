from django.contrib import admin
from django.db.models import Q
from .models import Question, Category, Quiz, Team
# Register your models here.

class LimitedByUser(admin.ModelAdmin):
  def get_queryset(self, request, condition): 
    qs = super().get_queryset(request)
    if request.user.is_superuser:
      return qs
    return qs.filter(condition)

@admin.action(description="Пометить как неотвеченные")
def mark_as_unanswered(modeladmin, request, queryset):
  queryset.update(answered=False)

class QuestionAdmin(LimitedByUser):
  actions = [mark_as_unanswered]
  
  def get_queryset(self, request): 
    return super().get_queryset(request, Q(category__quiz__owner=request.user) | Q(category__quiz__public=True))

admin.site.register(Question, QuestionAdmin)

class CategoryAdmin(LimitedByUser):
  
  def get_queryset(self, request): 
    return super().get_queryset(request, Q(quiz__owner=request.user) | Q(quiz__public=True))
  
admin.site.register(Category, CategoryAdmin)

class QuizAdmin(LimitedByUser):
  fields = ['id', 'name', 'public']
  def save_model(self, request, obj, form, change):
    obj.owner = request.user
    obj.save()
  
  def get_queryset(self, request): 
    return super().get_queryset(request, Q(owner=request.user) | Q(public=True))
  
admin.site.register(Quiz, QuizAdmin)

@admin.action(description="Обнулить счет")
def reset_score(modeladmin, request, queryset):
  queryset.update(score=0)

class TeamAdmin(LimitedByUser):
  actions = [reset_score]
  
  def get_queryset(self, request): 
    return super().get_queryset(request, Q(quiz__owner=request.user) | Q(quiz__public=True))

admin.site.register(Team, TeamAdmin)