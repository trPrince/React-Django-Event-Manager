from django.shortcuts import render
from .serializers import EventSerializer
from rest_framework import viewsets      
from .models import Event
from .paginator import StandardPagination                 

# Create your views here.

class EventView(viewsets.ModelViewSet):  
    serializer_class = EventSerializer   
    queryset = Event.objects.all()
    pagination_class = StandardPagination

