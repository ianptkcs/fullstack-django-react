from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta


def get_user_tokens(session_key):
    user_tokens = SpotifyToken.objects.filter(user=session_key)
    if user_tokens.exists():
        return user_tokens[0]
    return None


def update_or_create_user_tokens(
    session_key, access_token, token_type, expires_in, refresh_token
):
    tokens = get_user_tokens(session_key)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if tokens:
        tokens.access_token = access_token
        tokens.token_type = token_type
        tokens.expires_in = expires_in
        tokens.refresh_token = refresh_token
        tokens.save(
            update_fields=["access_token", "token_type", "expires_in", "refresh_token"]
        )
    else:
        tokens = SpotifyToken(
            user=session_key,
            access_token=access_token,
            token_type=token_type,
            expires_in=expires_in,
            refresh_token=refresh_token,
        )
        tokens.save()


def is_spotify_authenticated(session_key):
    tokens = get_user_tokens(session_key)
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(session_key)
        return True
    return False


def refresh_spotify_token(session_key):
    refresh_token = get_user_tokens(session_key).refresh_token

    response = post(
        "https://accounts.spotify.com/api/token",
        data={
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
            "client_id": client_id,
            "client_secret": client_secret,
        },
    ).json()

    access_token = response.get("access_token")
    token_type = response.get("token_type")
    expires_in = response.get("expires_in")
    refresh_token = response.get("refresh_token")

    update_or_create_user_tokens(
        session_key, access_token, token_type, expires_in, refresh_token
    )
