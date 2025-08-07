# Mahidol Event Hub 🎓

ระบบจัดการอีเวนต์ของมหาวิทยาลัยมหิดล - แพลตฟอร์มสำหรับนักศึกษา อาจารย์ และบุคลากรในการค้นหา เข้าร่วม และจัดการอีเวนต์ต่างๆ

## ✨ ฟีเจอร์หลัก

- 📅 **ปฏิทินอีเวนต์** - ดูอีเวนต์ในรูปแบบปฏิทิน
- 🔍 **ค้นหาและกรอง** - ค้นหาอีเวนต์ตามหมวดหมู่และคำค้นหา
- 💾 **บันทึกอีเวนต์** - เก็บอีเวนต์ที่สนใจไว้ดูภายหลัง
- 👤 **จัดการโปรไฟล์** - แก้ไขข้อมูลส่วนตัว
- 📱 **Responsive Design** - ใช้งานได้ทั้งเดสก์ท็อปและมือถือ
- 🎯 **อีเวนต์หลากหลาย** - งานวิชาการ งานศิลปวัฒนธรรม กีฬา และอื่นๆ

## 🛠️ เทคโนโลยีที่ใช้

### Frontend
- **React 18** + **TypeScript**
- **Vite** - Build tool ที่รวดเร็ว
- **TanStack Query** - State management และ data fetching
- **Wouter** - Lightweight routing
- **shadcn/ui** - Modern UI components
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Express.js** + **TypeScript**
- **tsx** - TypeScript execution environment
- **Static file serving** - สำหรับไฟล์รูปภาพและเอกสาร

## 🚀 การติดตั้งและใช้งาน

### ข้อกำหนดระบบ
- Node.js 18+ 
- npm หรือ yarn

### การติดตั้ง

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/mahidol-event-hub.git
   cd mahidol-event-hub
   ```

2. **ติดตั้ง dependencies**
   ```bash
   npm install
   ```

3. **รันในโหมด development**
   ```bash
   npm run dev
   ```

4. **เปิดเบราว์เซอร์ไปที่**
   ```
   http://localhost:8080
   ```

### Commands ที่ใช้ได้

```bash
# รันในโหมด development
npm run dev

# Build สำหรับ production
npm run build

# รันใน production mode
npm start

# Type checking
npm run check

# Database migration (หากมี database)
npm run db:push
```

## 📁 โครงสร้างโปรเจ็กต์

```
mahidol-event-hub/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utilities และ configurations
│   └── index.html
├── server/                # Backend Express app
│   ├── index.ts          # Main server file
│   ├── routes.ts         # API routes
│   └── vite.ts           # Vite integration
├── shared/               # Shared types และ schemas
│   └── schema.ts
├── attached_assets/      # Static files (images, documents)
└── package.json
```

## 🎨 UI Components

โปรเจ็กต์ใช้ **shadcn/ui** components ที่รวมถึง:
- ปุ่ม, การ์ด, ฟอร์ม
- Navigation, Sidebar
- Calendar, Dialog, Tooltip
- และอื่นๆ อีกมากมาย

## 📱 หน้าต่างๆ ในระบบ

- **หน้าแรก** - แสดงอีเวนต์ทั้งหมดพร้อมการค้นหา
- **ปฏิทิน** - ดูอีเวนต์ในรูปแบบปฏิทิน
- **อีเวนต์ที่บันทึก** - อีเวนต์ที่ผู้ใช้บันทึกไว้
- **โปรไฟล์** - จัดการข้อมูลส่วนตัว
- **เข้าสู่ระบบ/สมัครสมาชิก** - ระบบยืนยันตัวตน

## 🔧 การพัฒนาต่อ

### เพิ่มอีเวนต์ใหม่
1. แก้ไขไฟล์ใน `server/routes.ts` เพื่อเพิ่ม API endpoint
2. อัพเดท UI ในหน้าที่เกี่ยวข้อง
3. เพิ่มรูปภาพใน `attached_assets/`

### การปรับแต่ง Theme
แก้ไขไฟล์ `theme.json` และ `tailwind.config.ts`

## 🤝 การมีส่วนร่วม

1. Fork repository
2. สร้าง feature branch (`git checkout -b feature/amazing-feature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add amazing feature'`)
4. Push ไป branch (`git push origin feature/amazing-feature`)
5. เปิด Pull Request

## 📄 License

MIT License - ดูไฟล์ [LICENSE](LICENSE) สำหรับรายละเอียด

## 👥 ทีมพัฒนา

พัฒนาโดยทีมงานมหาวิทยาลัยมหิดล

---

**🎓 Mahidol University Event Hub - เชื่อมต่อชุมชนมหิดลผ่านกิจกรรมและอีเวนต์**
