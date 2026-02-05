Production-ready, Secure, Rate-limited

Goal:
Build a robust, scalable, secure backend architecture inside Next.js API routes.
This system must be production-ready from day one, with correct separation of concerns, security best practices, and zero architectural debt.

🧠 CORE PRINCIPLES (NON-NEGOTIABLE)

Separation of concerns is mandatory

No business logic inside route handlers

No direct DB access inside routes

Global error handling is required

Consistent response format everywhere

Security and rate limiting are NOT optional

Everything must be deploy-ready from the start

Everything must be type declared, nothing should be left to chance unless it is a const or in a must situtaion.

🗂️ DIRECTORY STRUCTURE (MANDATORY)
src/
├─ app/
│ ├─ api/
│ │ └─ v1/
│ │ ├─ auth/
│ │ │ ├─ login/route.ts
│ │ │ ├─ register/route.ts
│ │ │ └─ oauth/route.ts
│ │ ├─ users/route.ts
│ │ └─ health/route.ts
│
├─ core/
│ ├─ config/
│ │ ├─ env.ts
│ │ ├─ auth.ts
│ │ └─ rateLimit.ts
│ │
│ ├─ errors/
│ │ ├─ AppError.ts
│ │ └─ errorHandler.ts
│ │
│ ├─ middlewares/
│ │ ├─ auth.middleware.ts
│ │ ├─ rateLimit.middleware.ts
│ │ ├─ permission.middleware.ts
│ │ └─ validation.middleware.ts
│ │
│ ├─ utils/
│ │ ├─ response.ts
│ │ ├─ pagination.ts
│ │ ├─ logger.ts
│ │ └─ crypto.ts
│
├─ modules/
│ ├─ auth/
│ │ ├─ auth.service.ts
│ │ ├─ auth.repository.ts
│ │ ├─ auth.schema.ts
│ │ └─ auth.types.ts
│ │
│ ├─ user/
│ │ ├─ user.service.ts
│ │ ├─ user.repository.ts
│ │ ├─ user.schema.ts
│ │ └─ user.types.ts
│
├─ lib/
│ ├─ mongodb.ts
│ └─ oauth.ts

❌ FORBIDDEN

DB logic in route.ts

Validation inside service

try/catch inside routes

inconsistent folder naming

🔁 REQUEST LIFE CYCLE (STRICT FLOW)
REQUEST
↓
Rate Limit Middleware
↓
Auth Middleware (optional)
↓
Permission Middleware
↓
Validation Middleware
↓
Route Handler (HTTP ONLY)
↓
Service Layer (Business Logic)
↓
Repository Layer (DB Only)
↓
Response Formatter
↓
Global Error Handler

🔐 AUTHENTICATION STRATEGY
Supported Methods

Email + Password

OAuth (Google, GitHub, etc.)

Password Rules

bcrypt (minimum 12 rounds)

Never return password hash

Email verification required

JWT Strategy

Short-lived access token

HttpOnly cookies

Permissions embedded in token

JWT Payload:
{
userId,
role,
permissions[],
sessionVersion
}

❌ Never query permissions from DB per request
✅ Only read from token (except super-admin)

🧑‍⚖️ AUTHORIZATION (PERMISSION SYSTEM)

Role → static

Permissions → explicit list

Permission middleware reads from JWT

Optional cache (in-memory / KV)

requirePermission("USER_READ")

🧯 ERROR HANDLING (MANDATORY)
AppError Model
throw new AppError({
statusCode: 403,
message: "Forbidden",
code: "FORBIDDEN"
})

Global Error Handler

Masks internal errors

No stack traces in production

Logs structured error

❌ console.log in production
✅ structured JSON logging

📦 RESPONSE FORMAT (GLOBAL STANDARD)
Success
{
"success": true,
"data": {},
"meta": {}
}

Error
{
"success": false,
"error": {
"message": "Unauthorized",
"code": "AUTH_401"
}
}

❌ Returning raw arrays
❌ Inconsistent status codes

🚦 RATE LIMITING (FROM DAY ONE)

IP + User based

Public & Auth endpoints separated

Sliding window strategy

MongoDB / Upstash / KV compatible

/auth/login → strict
/public/_ → relaxed
/api/_ → normal

🛡️ SECURITY CHECKLIST

HttpOnly cookies

CSRF protection

CORS whitelist via ENV

Input validation everywhere

Max pagination limit

Brute-force protection

OAuth state validation

❌ Secrets in repo
✅ process.env only

📊 DATABASE DESIGN RULES (MongoDB)

Soft delete (deletedAt)

Versioning (schemaVersion)

Indexes defined explicitly

No unbounded queries

Pagination always required

🚀 DEPLOYMENT (VERCEL READY)

Edge-safe APIs where possible

Cold start tolerant

Environment-based config

Logging compatible with Vercel

🚫 ANTI-PATTERNS (ABSOLUTELY FORBIDDEN)

“Just quick route logic”

“We’ll add rate limit later”

“Temporary console.log”

“Permission check inside service”

“Let’s refactor later”

✅ FINAL EXPECTATION

The result must be:

Clean

Predictable

Secure

Testable

Scalable

Senior-level architecture

If any shortcut is taken, it is considered a failure.

🧠 META

This backend is not optimized for speed of development.
It is optimized for correctness, longevity, and professional standards.
