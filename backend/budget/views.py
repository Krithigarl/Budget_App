from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializers import BudgetEntrySerializer, RegisterSerializer
from .models import BudgetEntry, Register


@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')

    if Register.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    if Register.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        user = Register.objects.get(username=username)
    except Register.DoesNotExist:
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

    if not check_password(password, user.password):
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)

    # Manually create JWT tokens for this custom user
    refresh = RefreshToken()
    refresh['user_id'] = user.id
    refresh['username'] = user.username

    return Response({
        'message': 'Login successful',
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    """Protected endpoint - requires valid JWT token"""
    try:
        if not hasattr(request.user, 'username'):
            return Response({'error': 'Invalid user object'}, status=status.HTTP_401_UNAUTHORIZED)

        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email
        })
    except Exception as e:
        return Response({'error': f'Failed to retrieve profile: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def budget_entries(request):
    if request.method == 'GET':
        entries = BudgetEntry.objects.filter(user=request.user).order_by('-created_at')
        serializer = BudgetEntrySerializer(entries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    serializer = BudgetEntrySerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)