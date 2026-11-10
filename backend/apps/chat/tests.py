from django.test import SimpleTestCase


class ChatHealthTests(SimpleTestCase):
    def test_chat_health(self):
        response = self.client.get('/api/chat/health/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'service': 'chat', 'status': 'ok'})
