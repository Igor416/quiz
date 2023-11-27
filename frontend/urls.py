from django.urls import path
from .views import index

urlpatterns = [
	path('', index),
	path('quiz/<str:pk>', index),
]
