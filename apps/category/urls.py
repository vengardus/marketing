from django.urls import path
from apps.category.views import *

urlpatterns = [
    path('list', ListCategoriesView.as_view())
]
