from django.urls import path
from . import views

from django.conf.urls import url
from django.contrib import admin
from chatbot3.views import ChatterBotAppView, ChatterBotApiView


urlpatterns = [
    path('', views.index, name='index'),
    url(r'^$', ChatterBotAppView.as_view(), name='main'),
    url(r'^admin/', admin.site.urls, name='admin'),
    url(r'^chatterbot/', ChatterBotApiView.as_view(), name='chatterbot'),
]
