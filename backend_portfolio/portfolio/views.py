from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Project, Skill, ContactMessage
from .serializers import ProjectSerializer, SkillSerializer, ContactMessageSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet для проектов (только чтение)"""
    queryset = Project.objects.filter(is_active=True)
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'


class SkillListView(generics.ListAPIView):
    """Список всех навыков"""
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [AllowAny]


class ContactMessageCreateView(generics.CreateAPIView):
    """Создание сообщения обратной связи"""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'message': 'Сообщение отправлено! Мы свяжемся с вами в ближайшее время.'},
            status=status.HTTP_201_CREATED
        )