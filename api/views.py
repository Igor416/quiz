from rest_framework.views import APIView, Response
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import AllowAny

from .models import Question, Quiz, Team
from .serializers import QuestionSerializer, QuizSerializer, QuizDetailedSerializer, TeamSerializer

class QuizesView(ListAPIView):
  serializer_class = QuizSerializer
  
  def get_queryset(self):
    return Quiz.objects.filter(owner=self.request.user)

class QuizView(RetrieveAPIView):
  queryset = Quiz.objects.all()
  serializer_class = QuizDetailedSerializer

class QuestionView(APIView):
  def get(self, request, pk):
    instance = Question.objects.get(id=pk)
    instance.answered = True
    instance.save()
    return Response(QuestionSerializer(instance).data)

class TeamsView(ListCreateAPIView):
  serializer_class = TeamSerializer
  
  def get_queryset(self):
    return Team.objects.filter(quiz__id=self.kwargs.get('quiz'))

class TeamView(UpdateAPIView):
  queryset = Team.objects.all()
  serializer_class = TeamSerializer

class AuthView(APIView):
  permission_classes = [AllowAny]
  
  def get(self, request):
    return Response(request.user.username != '')

class WorkerView(APIView):
  permission_classes = [AllowAny]
  
  def get(self, request):
    return Response()
  