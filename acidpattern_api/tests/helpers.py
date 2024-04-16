import datetime
import rest_framework.test
from oauth2_provider.models import Application, AccessToken
from users.models import User

class APIClient(rest_framework.test.APIClient):
  def credentials(self, user: User, application_name: str):
    # Create or update Oauth2 application
    app, created = Application.objects.update_or_create(
      defaults={'name': application_name},
      client_type=Application.CLIENT_CONFIDENTIAL,
      authorization_grant_type=Application.GRANT_AUTHORIZATION_CODE,
      redirect_uris="https://www.none.com/oauth2/callback",
      name=application_name,
      user=user
    )
    # Create or update the token, set default request header.
    now = datetime.datetime.now().replace(tzinfo=datetime.timezone.utc)
    access_token, created = AccessToken.objects.update_or_create(
      defaults={'user': user, 'application': app},
      user=user,
      scope='read write',
      expires=now + datetime.timedelta(seconds=300),
      token='secret-access-token-key',
      application=app
    )
    super().credentials(HTTP_AUTHORIZATION='Bearer {}'.format(access_token))
