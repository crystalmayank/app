# Auth Testing Playbook — Quircle /admin

Auth model: single env-based admin (ADMIN_EMAIL + ADMIN_PASSWORD_HASH bcrypt in backend/.env, JWT_SECRET). JWT Bearer tokens, 12h expiry, type=access. Brute-force: 5 failed attempts per ip:email → 15 min lockout (MongoDB login_attempts, locked_until as ISO string). No users collection; no cookies (Bearer only, token kept in sessionStorage by the React /admin page).

## Step 1: Backend verification
- backend/.env contains JWT_SECRET (64-hex), ADMIN_EMAIL, ADMIN_PASSWORD_HASH (single-quoted, starts $2b$12$)
- login_attempts has index on identifier

## Step 2: API testing
```
# login (success)
TOKEN=$(curl -s -X POST http://localhost:8001/api/admin/login -H "Content-Type: application/json" -d '{"email":"<ADMIN_EMAIL>","password":"<ADMIN_PASSWORD>"}' | python3 -c "import sys,json;print(json.load(sys.stdin)['token'])")
# list signups (auth required)
curl -s http://localhost:8001/api/admin/signups -H "Authorization: Bearer $TOKEN"
# CSV download (auth required)
curl -s http://localhost:8001/api/admin/signups.csv -H "Authorization: Bearer $TOKEN" | head -3
# negative: no token → 401
curl -s -o /dev/null -w "%{http_code}" http://localhost:8001/api/admin/signups
# negative: wrong password → 401; 5x wrong → 429 locked
```

Expected: login returns {ok, token, email}; signups returns {total, signups[]} newest first with created_at ISO; CSV has header row name,email,city,family_size,role,created_at.

## Step 3: Frontend
- /admin shows login card when no token; after login shows dashboard (stats + table + Download CSV + Logout)
- 401 responses clear the token and return to login with an error toast
- Download CSV produces quircle-signups.csv via fetch+blob
