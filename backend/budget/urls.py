from django.urls import path

from .views import budget_entries, get_profile, login_user, register_user

urlpatterns = [
    path('login/', login_user, name='login_user'),
    path('register/', register_user, name='register_user'),
    path('profile/', get_profile, name='get_profile'),
    path('budget/', budget_entries, name='budget_entries'),
]