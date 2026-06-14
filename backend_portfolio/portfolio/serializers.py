from rest_framework import serializers
from .models import Project, Skill, ContactMessage


class ProjectSerializer(serializers.ModelSerializer):
    # Возвращаем полный URL для картинки
    image_url = serializers.SerializerMethodField()
    # Возвращаем полный URL для видео
    video_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'description', 'full_description',
                  'image_url', 'video_url', 'technologies', 'is_active', 'order', 'created_at']

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

    def get_video_url(self, obj):
        if obj.video:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.video.url)
            return obj.video.url
        return None


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'level', 'icon', 'order']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at', 'is_read']
        read_only_fields = ['id', 'created_at', 'is_read']