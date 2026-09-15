# ✨ Kyzz APIs v2 ✨

**High-Performance. Scalable. Type-Safe. REST API Platform.**  
*Powered by Next.js 16, Hono.js, NJS (Node.js/Bun), Zod Schema, & Swagger OpenAPI 3.0.0*

[![Official Website](https://img.shields.io/badge/Official_Website-api.kyzzz.xyz-2563eb?style=for-the-badge&logo=fastapi&logoColor=white)](https://api.kyzzz.xyz)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RynnStecu/kyzz-apisv2)
[![WhatsApp Channel 1](https://img.shields.io/badge/WhatsApp-Channel_1-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029Vb7gcbuLdQelWzrTzD3D)
[![Telegram Contact](https://img.shields.io/badge/Telegram-Owner_Contact-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/kyuugaperawan)

![Next.js 16](https://img.shields.io/badge/Framework-Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Hono.js](https://img.shields.io/badge/Backend-Hono.js-Flame-orange?style=flat-square&logo=hono&logoColor=white)
![Node.js](https://img.shields.io/badge/Engine-NJS_%2F_Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Swagger OpenAPI 3.0](https://img.shields.io/badge/Documentation-Swagger_OpenAPI_3.0-85EA2D?style=flat-square&logo=swagger&logoColor=black)
![TypeScript](https://img.shields.io/badge/Language-TypeScript_Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/Validation-Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=flat-square&logo=open-source-initiative&logoColor=white)

---

## 🖼️ DOKUMENTASI & INTERACTION PREVIEW

![Preview 1](public/prev1.jpg)
![Preview 2](public/prev2.jpg)
![Preview 3](public/prev3.jpg)
![Preview 4](public/prev4.jpg)
![Preview 5](public/prev5.jpg)

---

## 🛠️ TECH STACK LOGOS

[![Next.js 16](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Hono.js](https://img.shields.io/badge/Hono.js-E36002?style=for-the-badge&logo=hono&logoColor=white)](https://hono.dev)
[![NJS Engine](https://img.shields.io/badge/NJS_Engine-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Swagger OpenAPI](https://img.shields.io/badge/Swagger_OpenAPI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Zod Validation](https://img.shields.io/badge/Zod_Validation-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev)

---

## 🌟 FITUR UNGGULAN (FEATURES)

| Fitur | Status | Deskripsi |
| :--- | :---: | :--- |
| **⚡ Ultrafast NJS Engine** | ![Latency](https://img.shields.io/badge/Latency-%3C50ms-emerald) | Backend ditenagai NJS / Node.js & Hono.js untuk latensi eksekusi teruji di `api.kyzzz.xyz`. |
| **📘 Swagger OpenAPI 3.0** | ![Specs](https://img.shields.io/badge/Specs-Swagger_3.0-green) | Dokumentasi OpenAPI 3.0 standar industri dengan interaksi coba endpoint langsung. |
| **🛡️ API Key Protection** | ![Auth](https://img.shields.io/badge/Auth-API_Key-blue) | Proteksi middleware API Key (`?apikey=kyuzx`) pada seluruh rute `/api/*`. |
| **✨ Structured JSON Header** | ![Format](https://img.shields.io/badge/Format-Structured_JSON-purple) | Setiap respon JSON menyertakan header properti `creator: "Mommy Kyuu"` paling atas. |
| **🔑 Interactive Playground** | ![Docs](https://img.shields.io/badge/Docs-Playground-indigo) | Input API Key global dengan `localStorage`, tag filter kategori, & latensi eksekusi `ms`. |
| **🤖 Telegram Request Log** | ![Notifier](https://img.shields.io/badge/Notifier-Telegram_Bot-sky) | Log notifikasi otomatis ke owner via Telegram Bot dan balasan perintah `/stats` & `/ping`. |
| **🖼️ Auto-Responsive Render** | ![Media](https://img.shields.io/badge/Media-Stream-pink) | Render foto hasil endpoint gambar otomatis mengikuti rasio & ukuran asli gambar tanpa terdistorsi. |

---

## 📦 PANDUAN SETUP & INSTALASI (TERMUX & VPS LINUX)

### 📲 Setup di Termux (Android):

```bash
# 1. Update package repository & install Node.js + Git
pkg update -y && pkg upgrade -y
pkg install nodejs-lts git -y

# 2. Clone repository & masuk ke direktori
git clone https://github.com/RynnStecu/kyzz-apisv2.git
cd kyzz-apisv2

# 3. Install dependensi proyek
npm install

# 4. Salin environment file
cp .env.example .env

# 5. Jalankan server (Mode Production)
npm run build && npm start
```

### 🖥️ Setup di VPS Linux (Ubuntu / Debian):

```bash
# 1. Update paket sistem & install Node.js 20+ via NodeSource
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git pm2 -g

# 2. Clone repository & masuk ke direktori
git clone https://github.com/RynnStecu/kyzz-apisv2.git
cd kyzz-apisv2

# 3. Install dependensi proyek
npm install

# 4. Salin environment file & sesuaikan TELEGRAM_BOT_TOKEN
cp .env.example .env

# 5. Build proyek & jalankan 24/7 menggunakan PM2
npm run build
pm2 start npm --name "kyzz-apis" -- start
pm2 save && pm2 startup
```

---

## 💡 CARA MEMBUAT ENDPOINT BARU (CREATE NEW ENDPOINT GUIDE)

Proyek ini menggunakan **Hono OpenAPI & Zod Schema**. Ikuti panduan mudah berikut untuk menambahkan endpoint baru:

### 1. Buat File Handler Baru di `src/api/<kategori>/<nama>.ts`

```typescript
// File: src/api/general/quote.ts
import { createRoute, z } from '@hono/zod-openapi'
import type { Context } from 'hono'

// Define OpenAPI Schema Route
export const quoteRoute = createRoute({
    method: 'get',
    path: '/api/general/quote',
    summary: 'Random Quote Endpoint',
    description: 'Mengembalikan kata-kata bijak acak beserta pembuatnya',
    tags: ['General'],
    'x-status': 'ONLINE',
    request: {
        query: z.object({
            apikey: z.string().openapi({ example: 'kyuzx', description: 'Valid API Key' })
        })
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        status: z.boolean().openapi({ example: true }),
                        quote: z.string().openapi({ example: 'Tetap semangat pantang menyerah.' }),
                        author: z.string().openapi({ example: 'Mommy Kyuu' })
                    })
                }
            },
            description: 'Berhasil mendapatkan quote'
        }
    }
})

// Define Execution Handler
export const quoteHandler = async (c: Context) => {
    return c.json({
        status: true,
        quote: 'Kembangkan potensimu tanpa batas bersama Kyzz APIs v2.',
        author: 'Mommy Kyuu'
    }, 200)
}
```

### 2. Daftarkan Rute di `src/app.js`

```javascript
// File: src/app.js
import { quoteRoute, quoteHandler } from './api/general/quote.ts'

// Register Rute Baru
register(app, quoteRoute, quoteHandler)
```

---

## 🔑 CARA PENGGUNAAN API (QUICK START)

Seluruh endpoint API yang berada di bawah rute `/api/*` memerlukan query parameter `apikey`:

- **Official Domain:** `https://api.kyzzz.xyz`
- **Default API Key:** `kyuzx`

### 💻 Contoh Request cURL:
```bash
curl -X GET "https://api.kyzzz.xyz/api/stats?apikey=kyuzx"
```

### 📄 Contoh Respon JSON:
```json
{
    "creator": "Mommy Kyuu",
    "status": "online",
    "system": {
        "platform": "linux",
        "arch": "x64",
        "uptime": "12h 45m"
    },
    "cpu": {
        "cores": 8,
        "model": "ARMv8 Processor"
    }
}
```

---

## 📢 OFFICIAL WHATSAPP CHANNELS

[![WhatsApp CH 1](https://img.shields.io/badge/WhatsApp_CH_1-Main_Official-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029Vb7gcbuLdQelWzrTzD3D)
[![WhatsApp CH 2](https://img.shields.io/badge/WhatsApp_CH_2-Backup_Channel-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029VbCsmdMC1Fu6NbIaaY2T)
[![WhatsApp CH 3](https://img.shields.io/badge/WhatsApp_CH_3-Support_Community-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029VbDO8tI2phHLTSN2ed0U)

---

## 📞 KONTAK RESMI PENGEMBANG (OWNER CONTACTS)

| Platform | Handle / Kontak | Tautan Langsung |
| :---: | :--- | :--- |
| ![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=flat-square&logo=telegram&logoColor=white) | `@kyuugaperawan` | [t.me/kyuugaperawan](https://t.me/kyuugaperawan) |
| ![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=flat-square&logo=telegram&logoColor=white) | `@kyunotdev` | [t.me/kyunotdev](https://t.me/kyunotdev) |
| ![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=flat-square&logo=telegram&logoColor=white) | `@raramasihkyu` | [t.me/raramasihkyu](https://t.me/raramasihkyu) |
| ![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=flat-square&logo=whatsapp&logoColor=white) | `+62 831-5085-0721` | [wa.me/6283150850721](https://wa.me/6283150850721) |

---

## 📜 LISENSI (LICENSE)

Proyek ini dilindungi di bawah lisensi [MIT License](LICENSE). Anda bebas menggunakan, memodifikasi, dan mendistribusikan proyek ini selama mencantumkan nama pembuat asli (**Mommy Kyuu**).

---

**Developed with ❤️ by Mommy Kyuu**  
*Kyzz APIs v2 © 2026. All rights reserved.*
