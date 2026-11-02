

import json

from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient


User = get_user_model()


class LoginTests(TestCase):

    def setUp(self):
        self.client = APIClient(enforce_csrf_checks=True)
        self.url = "/api/users/login/"

        self.username = "testuser"
        self.password = "StrongPassword123!"

        self.user = User.objects.create_user(
            username=self.username,
            password=self.password,
        )


    def test_login_with_valid_credentials(self):
        response = self.client.post(
            self.url,
            {
                "username": self.username,
                "password": self.password,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 200)

    def test_login_creates_session(self):
        response = self.client.post(
            self.url,
            {
                "username": self.username,
                "password": self.password,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn("sessionid", self.client.cookies)

    def test_login_authenticates_user(self):
        self.client.post(
            self.url,
            {
                "username": self.username,
                "password": self.password,
            },
            format="json",
        )

        self.assertTrue(
            self.client.session.get("_auth_user_id")
        )

        self.assertEqual(
            int(self.client.session["_auth_user_id"]),
            self.user.pk,
        )

    def test_login_response_does_not_expose_password(self):
        response = self.client.post(
            self.url,
            {
                "username": self.username,
                "password": self.password,
            },
            format="json",
        )

        self.assertNotIn("password", response.json())


    def test_login_with_wrong_password(self):
        response = self.client.post(
            self.url,
            {
                "username": self.username,
                "password": "WrongPassword123!",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 401)

    def test_login_with_unknown_username(self):
        response = self.client.post(
            self.url,
            {
                "username": "unknownuser",
                "password": self.password,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 401)

    def test_login_with_empty_password(self):
        response = self.client.post(
            self.url,
            {
                "username": self.username,
                "password": "",
            },
            format="json",
        )

        self.assertIn(response.status_code, [400, 401])

    def test_login_with_empty_username(self):
        response = self.client.post(
            self.url,
            {
                "username": "",
                "password": self.password,
            },
            format="json",
        )

        self.assertIn(response.status_code, [400, 401])

    def test_login_with_missing_username(self):
        response = self.client.post(
            self.url,
            {
                "password": self.password,
            },
            format="json",
        )

        self.assertIn(response.status_code, [400, 401])

    def test_login_with_missing_password(self):
        response = self.client.post(
            self.url,
            {
                "username": self.username,
            },
            format="json",
        )

        self.assertIn(response.status_code, [400, 401])

    def test_login_rejects_get(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 405)

    def test_login_rejects_put(self):
        response = self.client.put(
            self.url,
            {},
            format="json",
        )

        self.assertEqual(response.status_code, 405)

    def test_login_rejects_delete(self):
        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, 405)


    def test_login_with_invalid_json(self):
        response = self.client.generic(
            "POST",
            self.url,
            data="{invalid json",
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)

    def test_login_with_json_array(self):
        response = self.client.post(
            self.url,
            ["testuser", "password"],
            format="json",
        )

        self.assertEqual(response.status_code, 400)

    def test_login_with_null_values(self):
        response = self.client.post(
            self.url,
            {
                "username": None,
                "password": None,
            },
            format="json",
        )

        self.assertIn(response.status_code, [400, 401])

    def test_login_session_persists_between_requests(self):
        self.client.post(
            self.url,
            {
                "username": self.username,
                "password": self.password,
            },
            format="json",
        )

        response = self.client.get("/api/users/me/")

        self.assertEqual(response.status_code, 200)

    def test_failed_login_does_not_authenticate_user(self):
        self.client.post(
            self.url,
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

    def test_login_with_inactive_user(self):
        self.user.is_active = False
        self.user.save()

        response = self.client.post(
            self.url,
            {
                "username": self.username,
                "password": self.password,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 401)