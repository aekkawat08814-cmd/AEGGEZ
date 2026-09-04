const express = require('express');
const path = require('path');
const app = express();
const router = require('./backend/routes/myRouter'); // ดึง Router มาใช้งาน

// ตั้งค่า EJS และ Path ของ Views ให้ชี้ไปที่ frontend/views
app.set('views', path.join(__dirname, 'frontend', 'views'));
app.set('view engine', 'ejs');

// ตั้งค่าให้ใช้งานไฟล์ Static (CSS, Images, JS)
app.use(express.static(path.join(__dirname, 'frontend', 'public')));

// ตั้งค่าให้รับข้อมูลจากฟอร์ม (Form Data) ได้
app.use(express.urlencoded({ extended: false }));

// ใช้งาน Router
app.use('/', router);

// รันเซิร์ฟเวอร์
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});