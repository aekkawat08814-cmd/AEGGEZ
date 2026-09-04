const express = require('express');
const router = express.Router();

// จำลองฐานข้อมูล
let registrants = [];
let committees = [];
let contactInfo = { 
    phone: '076-211-475', 
    location: 'วิทยาลัยเทคนิคภูเก็ต', 
    date: '15 กันยายน 2569', 
    time: '09:00 - 16:00 น.' 
};

// ==========================================
// ส่วนที่ 1: หน้าหลักและลงทะเบียน
// ==========================================

// 1. หน้าหลัก (Dashboard)
router.get('/', (req, res) => {
    res.render('dashboard', { 
        title: 'ภาพรวมการแข่งขัน', 
        activeMenu: 'dashboard',
        registrantsCount: registrants.length,
        committeesCount: committees.length
    });
});

// 1.1 หน้าฟอร์มลงทะเบียน (ปุ่ม "+ ลงทะเบียนนักศึกษา" จะวิ่งมาหน้านี้)
router.get('/register-form', (req, res) => {
    res.render('index');
});

// 1.2 รับข้อมูลลงทะเบียน
router.post('/register', (req, res) => {
    const { email, fullname, studentId, department } = req.body;
    registrants.push({ id: Date.now(), email, fullname, studentId, department });
    res.redirect('/registrants'); 
});


// ==========================================
// ส่วนที่ 2: ระบบจัดการหลังบ้าน (มี Sidebar)
// ==========================================

// 2. หน้าต่างผู้ลงทะเบียน
router.get('/registrants', (req, res) => {
    res.render('page2', { title: 'ผู้ลงทะเบียน', data: registrants, activeMenu: 'registrants' });
});

// 3. หน้าแสดงรายชื่อคณะกรรมการ
router.get('/committees', (req, res) => {
    res.render('committees', { title: 'รายชื่อคณะกรรมการ', data: committees, activeMenu: 'committees' });
});

// 3.1 บันทึกเพิ่มกรรมการ
router.post('/add-committee', (req, res) => {
    const { fullname, role, department } = req.body;
    committees.push({ id: Date.now(), fullname, role, department });
    res.redirect('/committees');
});

// 3.2 บันทึกการแก้ไขกรรมการ
router.post('/edit-committee/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { fullname, role, department } = req.body;
    
    const index = committees.findIndex(c => c.id === id);
    if(index !== -1) {
        committees[index] = { id, fullname, role, department };
    }
    res.redirect('/committees');
});

// 4. กฎกติกา
router.get('/rules', (req, res) => res.render('rules', { title: 'กฎกติกา', activeMenu: 'rules' }));

// 5. รูปภาพการแข่งขัน
router.get('/gallery', (req, res) => res.render('gallery', { title: 'รูปภาพการแข่งขัน', activeMenu: 'gallery' }));

// ตัวแปรเก็บรูปภาพสำหรับหน้าติดต่อ (ค่าเริ่มต้นมี 1 รูป)
let contactImages = [
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop' 
];

// 6. การติดต่อ
router.get('/contact', (req, res) => {
    res.render('contact', { 
        title: 'การติดต่อ', 
        data: contactInfo, 
        images: contactImages, // ส่งข้อมูลรูปภาพไปแสดงผลด้วย
        activeMenu: 'contact' 
    });
});

// 6.1 แก้ไขข้อมูลการติดต่อ
router.post('/edit-contact', (req, res) => {
    contactInfo = req.body;
    res.redirect('/contact');
});

// 6.2 บันทึกเพิ่มรูปภาพใหม่
router.post('/add-contact-image', (req, res) => {
    const { imageUrl } = req.body;
    if(imageUrl) {
        contactImages.push(imageUrl); // นำลิงก์รูปใหม่ต่อท้าย Array
    }
    res.redirect('/contact');
});

// 6.1 แก้ไขข้อมูลการติดต่อ
router.post('/edit-contact', (req, res) => {
    contactInfo = req.body;
    res.redirect('/contact');
});

// 7. ประกาศผลการแข่งขัน
router.get('/results', (req, res) => res.render('results', { title: 'ประกาศผลการแข่งขัน', activeMenu: 'results' }));

// 8. ประกาศข่าวสาร
router.get('/news', (req, res) => res.render('news', { title: 'ประกาศข่าวสาร', activeMenu: 'news' }));

// 9. ข้อมูลสถานศึกษา
router.get('/college-info', (req, res) => res.render('college-info', { title: 'ข้อมูลสถานศึกษา', activeMenu: 'college-info' }));

// 10. ผู้ดูแลระบบ
router.get('/admin', (req, res) => res.render('admin', { title: 'ผู้ดูแลระบบ', activeMenu: 'admin' }));

// *** บรรทัดนี้สำคัญมาก! ห้ามลบเด็ดขาด (ใช้แก้ Error ที่คุณเจอ) ***
module.exports = router;