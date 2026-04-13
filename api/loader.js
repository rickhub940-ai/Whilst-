export default async function handler(req, res) {
    res.setHeader("Content-Type", "application/javascript");

    res.end(`
        local HttpService = game:GetService("HttpService")
        local hwid = game:GetService("RbxAnalyticsService"):GetClientId()

        local key = _G.key
        if not key then
            return warn("No key")
        end

        -- 🔐 ไปเช็ค key + hwid
        local response = game:HttpGet(
            "https://your-vercel-url.vercel.app/api/verify?key="..key.."&hwid="..hwid
        )

        local data = HttpService:JSONDecode(response)

        if data.status ~= "success" then
            return warn("Key failed:", data.status)
        end

        -- 📦 ขอ script จริงจาก server
        local script = game:HttpGet(
            "https://your-vercel-url.vercel.app/api/script?token="..data.token.."&hwid="..hwid
        )

        -- ▶️ รันสคริปต์
        loadstring(script)()
    `)
}
