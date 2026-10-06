from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from .models import Register


class CustomJWTAuthentication(JWTAuthentication):
    """Custom JWT authentication for the Register model"""
    
    def authenticate(self, request):
        """
        Authenticate the request using JWT and attach Register user to request.user
        """
        try:
            header = self.get_header(request)
            if header is None:
                return None

            raw_token = self.get_raw_token(header)
            if raw_token is None:
                return None

            validated_token = self.get_validated_token(raw_token)

            # Extract user_id from the token
            user_id = validated_token.get('user_id')
            if not user_id:
                raise AuthenticationFailed('Token does not contain user_id')
            
            # Get the Register user
            try:
                user = Register.objects.get(id=user_id)
            except Register.DoesNotExist:
                raise AuthenticationFailed('User not found')
            
            return (user, validated_token)
            
        except AuthenticationFailed:
            raise
        except Exception as e:
            print(f"Authentication error: {repr(e)}")
            raise AuthenticationFailed(f'Authentication failed: {str(e)}')
