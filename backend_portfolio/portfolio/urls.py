from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'projects', views.ProjectViewSet, basename='project')

urlpatterns = [
    path('', include(router.urls)),
    path('skills/', views.SkillListView.as_view(), name='skill-list'),
    path('contact/', views.ContactMessageCreateView.as_view(), name='contact-create'),
]