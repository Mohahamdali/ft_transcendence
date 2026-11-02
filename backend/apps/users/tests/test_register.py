
from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient

User = get_user_model()


class RegisterTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.url = "/api/users/register/"

        self.username = "newuser"
        self.password = "StrongPassword123!"

    def test_register_success(self):
        response = self.client.post(
            self.url,
            {
                "username": self.username,
                "password": self.password,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)

    def test_user_is_created_in_database(self):
        self.client.post(
            self.url,
            {
                "username": self.username,
                "password": self.password,
            },
            format="json",
        )

        self.assertTrue(
            User.objects.filter(
                username=self.username
            ).exists()
        )

    def test_password_is_hashed(self):
        self.client.post(
            self.url,
            {
                "username": self.username,
                "password": self.password,
            },
            format="json",
        )

        user = User.objects.get(username=self.username)

        self.assertNotEqual(
            user.password,
            self.password,
        )

        self.assertTrue(
            user.check_password(self.password)
        )

    def test_register_duplicate_username(self):
        User.objects.create_user(
            username=self.username,
            password=self.password,
        )

        response = self.client.post(
            self.url,
            {
                "username": self.username,
                "password": self.password,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 409)

    def test_register_without_username(self):
        response = self.client.post(
            self.url,
            {
                "password": self.password,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 400)

    def test_register_without_password(self):
        response = self.client.post(
            self.url,
            {
                "username": self.username,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 400)

    def test_register_empty_username(self):
        response = self.client.post(
            self.url,
            {
                "username": "",
                "password": self.password,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 400)

    def test_register_empty_password(self):
        response = self.client.post(
            self.url,
            {
                "username": self.username,
                "password": "",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 400)

    def test_register_weak_password(self):
        response = self.client.post(
            self.url,
            {
                "username": self.username,
                "password": "123",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 400)

    def test_register_invalid_username(self):
        response = self.client.post(
            self.url,
            {
                "username": "invalid username!",
                "password": self.password,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 400)

    def test_register_invalid_json(self):
        response = self.client.generic(
            "POST",
            self.url,
            data="{invalid json",
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)

    def test_register_rejects_get(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 405)

    def test_register_rejects_put(self):
        response = self.client.put(
            self.url,
            {},
            format="json",
        )

        self.assertEqual(response.status_code, 405)

    def test_register_rejects_delete(self):
        response = self.client.delete(self.url)

        self.assertEqual(response.status_code, 405)
