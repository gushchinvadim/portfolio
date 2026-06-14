from django.db import models


class Project(models.Model):
    """Модель проекта портфолио"""
    title = models.CharField('Название проекта', max_length=200)
    slug = models.SlugField('URL-идентификатор', unique=True)
    description = models.TextField('Краткое описание')
    full_description = models.TextField('Полное описание', blank=True)
    image = models.ImageField('Главное изображение', upload_to='projects/', blank=True)
    video = models.FileField('Видео проекта', upload_to='projects/videos/', blank=True, null=True,
                             help_text='Загрузите видео в формате MP4 (опционально)')
    technologies = models.CharField('Технологии', max_length=500,
                                    help_text='Через запятую: Django, React, PostgreSQL')
    is_active = models.BooleanField('Активен', default=True)
    order = models.IntegerField('Порядок отображения', default=0)
    created_at = models.DateTimeField('Дата создания', auto_now_add=True)

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title


class Skill(models.Model):
    """Модель навыка/технологии"""
    CATEGORY_CHOICES = [
        ('backend', 'Backend'),
        ('frontend', 'Frontend'),
        ('devops', 'DevOps'),
        ('database', 'Базы данных'),
        ('tools', 'Инструменты'),
    ]

    name = models.CharField('Название', max_length=100)
    category = models.CharField('Категория', max_length=20, choices=CATEGORY_CHOICES)
    level = models.IntegerField('Уровень владения (%)', default=80)
    icon = models.CharField('Иконка (Lucide)', max_length=50, blank=True)
    order = models.IntegerField('Порядок', default=0)

    class Meta:
        verbose_name = 'Навык'
        verbose_name_plural = 'Навыки'
        ordering = ['category', 'order']

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class ContactMessage(models.Model):
    """Модель сообщений из формы обратной связи"""
    name = models.CharField('Имя', max_length=100)
    email = models.EmailField('Email')
    message = models.TextField('Сообщение')
    created_at = models.DateTimeField('Дата отправки', auto_now_add=True)
    is_read = models.BooleanField('Прочитано', default=False)

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'
        ordering = ['-created_at']

    def __str__(self):
        return f"Сообщение от {self.name} ({self.email})"