# API v1 – BACKEND_INSTRUCTIONS.md Uyumlu

Bu API, `BACKEND_INSTRUCTIONS.md` içindeki kurallara göre yazıldı: ayrım (route → service → repository), global hata/response formatı, rate limit, JWT auth, yetki (permission) token’dan okunuyor.

## Endpoints

| Method | Path | Auth | Açıklama |
|--------|------|------|----------|
| GET | `/api/v1/health` | Hayır | Sağlık kontrolü, DB durumu |
| POST | `/api/v1/auth/login` | Hayır (rate limit: 10/dk) | Email + şifre → JWT + Set-Cookie |
| POST | `/api/v1/auth/register` | Hayır (rate limit: 10/dk) | Yeni kullanıcı |
| GET | `/api/v1/auth/oauth?provider=google\|github` | Hayır | OAuth provider’a yönlendirme |
| GET | `/api/v1/users` | JWT, `USER_READ` | Kullanıcı listesi (sayfalı) |
| GET | `/api/v1/tickets` | JWT, `TICKET_READ` | Bilet listesi (sayfalı) |
| POST | `/api/v1/tickets` | JWT, `TICKET_WRITE` | Bilet oluşturma |
| GET | `/api/v1/tickets/[id]` | JWT, `TICKET_READ` | Bilet detay |
| PUT | `/api/v1/tickets/[id]` | JWT, `TICKET_WRITE` | Bilet güncelleme |
| DELETE | `/api/v1/tickets/[id]` | JWT, `TICKET_DELETE` | Bilet silme (soft delete) |

## Response formatı

- **Başarı:** `{ "success": true, "data": ..., "meta": { "total", "page", "limit" }? }`
- **Hata:** `{ "success": false, "error": { "message": "...", "code": "..." } }`

## Auth (v1)

- **Login:** `POST /api/v1/auth/login` body: `{ "email", "password" }`. Cevapta `Set-Cookie` ile HttpOnly cookie set edilir; sonraki isteklerde aynı cookie ile otomatik auth.
- **Bearer:** İsterseniz `Authorization: Bearer <token>` ile de token gönderebilirsiniz.

## Klasör yapısı

- `src/core/` – config, errors, middlewares, utils
- `src/modules/` – auth, user, ticket (service, repository, schema, types)
- `src/lib/` – mongodb, oauth
- `app/api/v1/` – route handlers (sadece HTTP + service çağrısı)

Eski API (`/api/auth/[...nextauth]`, `/api/tickets`, `/api/users`) aynen çalışmaya devam eder; frontend’i v1’e taşıyana kadar ikisi birlikte kullanılabilir.
