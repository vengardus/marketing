from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from apps.blog.models import Post, ViewCount
from apps.category.models import Category
from apps.blog.serializers import PostListSerializer, PostSerializer
from apps.blog.pagination import SmallSetPagination, LargeSetPagination

from django.db.models.query_utils import Q



class PostListView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if not Post.objects.exists():
            return Response({'error': 'Not found post'}, status=status.HTTP_204_NO_CONTENT)
        
        posts = Post.objects.all()

        paginator = SmallSetPagination()
        results = paginator.paginate_queryset(posts, request)
        posts_serializers = PostListSerializer(results, many=True)

        # return Response({'posts': posts_serializers.data}, status=status.HTTP_200_OK)
        return paginator.get_paginated_response({'posts': posts_serializers.data})


class PostsListByCategoryView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        category_slug = request.query_params.get('slug')
        if Post.objects.all().exists():
            # category_slug = request.query_params.get('slug')
            category = Category.objects.filter(slug__exact=category_slug).first()
            if category == None:
                return Response({'error':'Category does not exist'}, status=status.HTTP_204_NO_CONTENT)

            posts = Post.objects.order_by('-published').all()


        # # Si la categoría tiene un padre, filtrar sólo por esta categoría y no por el padre también
        # if category.parent:
        #     posts = posts.filter(category=category)

        # # Si la categoría no tiene una categoría padre, significa que ella misma es una categoría padre
        # else: 

            #Filtrar categoria sola
            if not Category.objects.filter(parent=category).exists():
                posts = posts.filter(category=category)
            # Si esta categoría padre tiene hijos, filtrar por la categoría padre y sus hijos
            else:
                sub_categories = Category.objects.filter(parent=category)
                
                filtered_categories = [category]

                for cat in sub_categories:
                    filtered_categories.append(cat)

                print(filtered_categories)
                filtered_categories = tuple(filtered_categories)
                print('Tupla:', filtered_categories)

                posts = posts.filter(category__in=filtered_categories)
                    
            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(posts, request)
            serializer = PostListSerializer(results, many=True)

            return paginator.get_paginated_response({'posts': serializer.data})
        else:
            return Response({'error':'No posts found'}, status=status.HTTP_204_NO_CONTENT)


class PostDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, slug, format=None):
        post = Post.objects.filter(slug__exact=slug).first()

        if post == None:
            return Response({'error': 'Not found post'}, status=status.HTTP_204_NO_CONTENT)
        
        serializer = PostSerializer(post)

        address = request.META.get('HTTP_X_FORWARDED_FOR')
        if address:
            ip = address.split(',')[-1].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')

        if not ViewCount.objects.filter(post=post, ip_address=ip):
            view = ViewCount(post=post, ip_address=ip)
            view.save()
        post.views += 1
        post.save()

        # paginator = SmallSetPagination()
        # results = paginator.paginate_queryset(posts, request)
        # posts_serializers = PostListSerializer(results, many=True)

        return Response({'post': serializer.data}, status=status.HTTP_200_OK)
        # return Response({'posts': posts_serializers.data}, status=status.HTTP_200_OK)
        # return paginator.get_paginated_response({'posts': posts_serializers.data})


class PostSearchView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        search_term = request.query_params.get('s')

        matches = Post.objects.filter(
            Q(title__icontains=search_term) |
            Q(content__icontains=search_term) |
            Q(description__icontains=search_term) 
        )

        if not matches.exists():
            return Response({'error': 'Not found posts'}, status=status.HTTP_204_NO_CONTENT)
        
        posts = Post.objects.all()

        paginator = SmallSetPagination()
        results = paginator.paginate_queryset(matches, request)
        serializers = PostListSerializer(results, many=True)

        # return Response({'posts': serializers.data}, status=status.HTTP_200_OK)
        return paginator.get_paginated_response({'filtered_posts': serializers.data})

# Post By Author
class AuthorPostListView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        user = self.request.user
        print('AuthorPostListView-prev', request.user)

        if not Post.objects.filter(author=user).exists():
            return Response({'error': 'Not found post'}, status=status.HTTP_204_NO_CONTENT)
        
        print('AuthorPostListView', request)
        posts = Post.objects.filter(author=user)

        paginator = SmallSetPagination()
        results = paginator.paginate_queryset(posts, request)
        posts_serializers = PostListSerializer(results, many=True)

        # return Response({'posts': posts_serializers.data}, status=status.HTTP_200_OK)
        return paginator.get_paginated_response({'posts': posts_serializers.data})
