# Database design — planned, not implemented in v0.0.1

The starter currently contains only Django's built-in framework tables.

Planned (subject to team review):

- User(id, email UNIQUE, password_hash, created_at)
- Profile(id, user_id UNIQUE FK -> User, display_name, bio, avatar_url)
- Friendship(id, requester_id FK -> User, addressee_id FK -> User, status, created_at)
- Post(id, author_id FK -> User, text, created_at, updated_at)
- Comment(id, post_id FK -> Post, author_id FK -> User, text, created_at)
- Like(id, post_id FK -> Post, user_id FK -> User, created_at), unique(post_id, user_id)
- Conversation(id, created_at)
- ConversationMember(conversation_id FK, user_id FK), unique(conversation_id, user_id)
- Message(id, conversation_id FK, sender_id FK -> User, text, created_at)
- Notification(id, recipient_id FK -> User, actor_id FK -> User, event_type, payload, is_read, created_at)
- DeveloperApiKey(id, owner_id FK -> User, key_hash, created_at, revoked_at), store only a keyed hash, not the full key.

Add database constraints, indexes, retention rules, role-based permissions and a threat model before enabling real data.
