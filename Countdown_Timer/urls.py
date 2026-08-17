from django.urls import path

from .views import (
    HomeView,
    EventListCreateView,
    EventDetailView,
    RegisterView
)

urlpatterns = [

    path(
        "",
        HomeView.as_view(),
        name="home"
    ),

    path(
        "events/",
        EventListCreateView.as_view(),
        name="event-list-create"
    ),
    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),
    
    path(
        "events/<int:pk>/",
        EventDetailView.as_view(),
        name="event-detail"
    ),

]