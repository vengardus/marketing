from django.urls import path
from apps.blog.views import *

urlpatterns = [
    path('list', PostListView.as_view()),
    path('bycategory', PostsListByCategoryView.as_view()),
    path('detail/<slug>', PostDetailView.as_view()),
    path('search', PostSearchView.as_view())
]
