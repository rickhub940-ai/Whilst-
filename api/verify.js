export default async function handler(req, res) {
    const { key, hwid } = req.query;

    // 📥 ดึง database จาก GitHub
    const db = await fetch(
        "https://raw.githubusercontent.com/rickhub940-ai/Whilst-/refs/heads/main/db.json"
    ).then(r => r.json());

    // ❌ key ไม่มี
    if (!db[key]) {
        return res.json({ status: "invalid" });
    }

    // 🔐 ล็อก HWID ครั้งแรก
    if (!db[key].hwid) {
        db[key].hwid = hwid;
    }
    // ❌ HWID ไม่ตรง
    else if (db[key].hwid !== hwid) {
        return res.json({ status: "hwid_mismatch" });
    }

    // 🎯 เลือก script ให้เอง (สุ่มหรือเอาตัวแรก)
    const scriptName = db[key].scripts[
        Math.floor(Math.random() * db[key].scripts.length)
    ];

    // 🔑 สร้าง token ชั่วคราว
    const token = Math.random().toString(36).substring(2);

    global.tokens = global.tokens || {};

    global.tokens[token] = {
        hwid,
        script: scriptName,
        expire: Date.now() + 10000 // 10 วิ
    };

    // 📤 ส่งกลับไป Roblox
    res.json({
        status: "success",
        token: token
    });
}
