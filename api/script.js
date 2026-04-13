export default async function handler(req, res) {
    const { token, hwid } = req.query;

    const tokens = global.tokens || {};

    // ❌ ไม่มี token
    if (!tokens[token]) {
        return res.end("invalid token");
    }

    const data = tokens[token];

    // ❌ HWID ไม่ตรง
    if (data.hwid !== hwid) {
        return res.end("hwid mismatch");
    }

    // ❌ token หมดอายุ
    if (Date.now() > data.expire) {
        return res.end("expired");
    }

    // 🔥 ใช้ครั้งเดียวแล้วลบทิ้ง
    delete tokens[token];

    // 📦 ดึง script จาก GitHub
    const scriptUrl = `https://raw.githubusercontent.com/user/repo/main/scripts/${data.script}.lua`;

    const script = await fetch(scriptUrl).then(r => r.text());

    res.setHeader("Content-Type", "application/javascript");
    res.end(script);
      }
