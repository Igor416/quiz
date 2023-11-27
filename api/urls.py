from django.urls import path
from . import views

urlpatterns = [
	path('quizes/', view=views.QuizesView.as_view()),
  path('quiz/<str:pk>/', view=views.QuizView.as_view()),
  path('answer_question/<str:pk>/', view=views.QuestionView.as_view()),
  path('teams/', view=views.TeamsView.as_view()),
  path('team/<str:pk>/', view=views.TeamView.as_view()),
  path('logged_in/', view=views.AuthView.as_view()),
  path('', view=views.WorkerView.as_view())
]
