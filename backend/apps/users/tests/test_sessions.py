
from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient

User = get_user_model()


class SessionTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.login_url = "/api/users/login/"
        self.logout_url = "/api/users/logout/"
        self.me_url = "/api/users/me/"

        self.username = "sessionuser"
        self.password = "StrongPassword123!"

        self.user = User.objects.create_user(
            username=self.username,
            password=self.password,
        )

    def test_anonymous_user_has_no_authenticated_session(self):
        self.assertNotIn(
            "_auth_user_id",
            self.client.session,
        )

    def test_login_creates_session(self):
        response = self.client.post(
            self.login_url,
            {
                "username": self.username,
                "password": self.password,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 200)

        self.assertIn(
            "_auth_user_id",
            self.client.session,
        )

    def test_session_contains_correct_user_id(self):
        self.client.post(
            self.login_url,
            {
                "username": self.username,
                "password": self.password,
            },
            format="json",
        )

        self.assertEqual(
            int(self.client.session["_auth_user_id"]),
            self.user.pk,
        )

    def test_session_persists_between_requests(self):
        self.client.post(
            self.login_url,
            {
                "username": self.username,
                "password": self.password,
            },
            format="json",
        )

        response = self.client.get(self.me_url)

        self.assertEqual(response.status_code, 200)

    def test_logout_removes_authenticated_session(self):
        self.client.post(
            self.login_url,
            {
                "username": self.username,
                "password": self.password,
            },
            format="json",
        )

        self.client.post(self.logout_url)

        self.assertNotIn(
            "_auth_user_id",
            self.client.session,
        )

    def test_session_is_not_authenticated_after_logout(self):
        self.client.post(
            self.login_url,
            {
                "username": self.username,
                "password": self.password,
            },
            format="json",
        )

        self.client.post(self.logout_url)

        response = self.client.get(self.me_url)

        self.assertEqual(response.status_code, 401)

    def test_invalid_login_does_not_create_session(self):
        self.client.post(
            self.login_url,
            {
                "username": self.username,
                "password": "WrongPassword123!",
            },
            format="json",
        )

        self.assertNotIn(
            "_auth_user_id",
            self.client.session,
        )
