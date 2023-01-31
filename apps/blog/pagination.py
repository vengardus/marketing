from rest_framework.pagination import PageNumberPagination


class SmallSetPagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 2


class MediumSetPagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 9


class LargeSetPagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 18
    page_size_query_param = 'page_size'
    max_page_size = 18