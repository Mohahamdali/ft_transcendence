from channels.generic.websocket import AsyncJsonWebsocketConsumer

class PingConsumer(AsyncJsonWebsocketConsumer):
    """Development-only connectivity check. Not a real chat endpoint."""

    async def connect(self):
        await self.accept()

    async def receive_json(self, content, **kwargs):
        if isinstance(content, dict) and content.get('type') == 'ping':
            await self.send_json({'type': 'pong'})
        else:
            await self.send_json({'type': 'error', 'message': 'Send {"type":"ping"}'})
