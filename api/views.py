from rest_framework.views import APIView, Response
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import IsAdminUser

from .models import Question, Quiz, Team
from .serializers import QuestionSerializer, QuizSerializer, QuizDetailedSerializer, TeamSerializer

class QuizesView(ListAPIView):
  queryset = Quiz.objects.all()
  serializer_class = QuizSerializer
  permission_classes = [IsAdminUser]

class QuizView(RetrieveAPIView):
  queryset = Quiz.objects.all()
  serializer_class = QuizDetailedSerializer
  permission_classes = [IsAdminUser]

class QuestionView(APIView):
  def get(self, request, pk):
    instance = Question.objects.get(id=pk)
    instance.answered = True
    instance.save()
    return Response(QuestionSerializer(instance).data)

class TeamsView(ListCreateAPIView):
  queryset = Team.objects.all()
  serializer_class = TeamSerializer
  permission_classes = [IsAdminUser]

class TeamView(UpdateAPIView):
  queryset = Team.objects.all()
  serializer_class = TeamSerializer
  permission_classes = [IsAdminUser]

class AuthView(APIView):
  def get(self, request):
    return Response(request.user.username != '')

class WorkerView(APIView):
  def get(self, request):
    return Response()
  