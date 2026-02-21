# Frontend React (Vite)

## Levantar el frontend

```bash
npm install
copy .env.local.example .env.local   # Windows
# cp .env.local.example .env.local   # macOS/Linux
npm run dev
```

- Por defecto apunta al backend en `http://127.0.0.1:8001/api`.
- Si cambias el puerto/host del backend, ajusta `VITE_API_URL` en `.env.local`.

## Notas

- Usa Axios configurado en `src/api/axios.js` (inyecta token desde localStorage).
- CORS ya está permitido en el backend (origins `*`).
