from django.contrib import admin
from apps.blog.models import Post, ViewCount

# Register your models here.

admin.site.register(Post)
admin.site.register(ViewCount)
