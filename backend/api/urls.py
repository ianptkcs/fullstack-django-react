from django.urls import path
from .views import get_csrf_token
from .views import (
    RoomView,
    CreateRoomView,
    GetRoom,
    JoinRoom,
    UserInRoom,
    LeaveRoom,
    UpdateRoom,
)

urlpatterns = [
    path("csrf-token/", get_csrf_token, name="csrf-token"),
    path("room", RoomView.as_view()),
    path("create-room", CreateRoomView.as_view()),
    path("get-room", GetRoom.as_view()),
    path("join-room", JoinRoom.as_view()),
    path("user-in-room", UserInRoom.as_view()),
    path("leave-room", LeaveRoom.as_view()),
    path("update-room", UpdateRoom.as_view()),
]
