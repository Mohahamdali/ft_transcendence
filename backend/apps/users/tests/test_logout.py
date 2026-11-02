
from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient

User = get_user_model()


class LogoutTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.login_url = "/api/users/login/"
        self.logout_url = "/api/users/logout/"
        self.me_url = "/api/users/me/"

        self.username = "logoutuser"
        self.password = "StrongPassword123!"

        self.user = User.objects.create_user(
            username=self.username,
            password=self.password,
        )

        self.client.post(
            self.login_url,
            {
                "username": self.username,
                "password": self.password,
            },
            format="json",
        )

    def test_logout_success(self):
        response = self.client.post(self.logout_url)

        self.assertEqual(response.status_code, 200)

    def test_logout_ends_session(self):
        self.client.post(self.logout_url)

        self.assertNotIn(
            "_auth_user_id",
            self.client.session,
        )

    def test_user_cannot_access_protected_endpoint_after_logout(self):
        self.client.post(self.logout_url)

        response = self.client.get(self.me_url)

        self.assertEqual(response.status_code, 401)

    def test_logout_without_authentication(self):
        client = APIClient()

        response = client.post(self.logout_url)

        self.assertEqual(response.status_code, 200)

    def test_logout_rejects_get(self):
        response = self.client.get(self.logout_url)

        self.assertEqual(response.status_code, 405)

    def test_logout_rejects_put(self):
        response = self.client.put(
            self.logout_url,
            {},
            format="json",
        )

        self.assertEqual(response.status_code, 405)

    def test_logout_rejects_delete(self):
        response = self.client.delete(self.logout_url)

        self.assertEqual(response.status_code, 405)
