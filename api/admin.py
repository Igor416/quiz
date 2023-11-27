from django.contrib import admin
from .models import Question, Category, Quiz, Team
# Register your models here.

@admin.action(description="Пометить как неотвеченные")
def mark_as_unanswered(modeladmin, request, queryset):
  queryset.update(answered=False)

class QuestionAdmin(admin.ModelAdmin):
  actions = [mark_as_unanswered]

admin.site.register(Question, QuestionAdmin)
admin.site.register((Category, Quiz))

@admin.action(description="Обнулить счет")
def reset_score(modeladmin, request, queryset):
  queryset.update(score=0)

class TeamAdmin(admin.ModelAdmin):
  actions = [reset_score]

admin.site.register(Team, TeamAdmin)