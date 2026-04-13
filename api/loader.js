local HttpService = game:GetService("HttpService")
local hwid = game:GetService("RbxAnalyticsService"):GetClientId()

local key = _G.key
if not key then
    return warn("No key")
end

-- 🔐 verify
local response = game:HttpGet(
    "https://whilst.vercel.app/api/verify?key="..key.."&hwid="..hwid
)

local data = HttpService:JSONDecode(response)

if data.status ~= "success" then
    return warn("Key failed:", data.status)
end

-- 📦 get script
local script = game:HttpGet(
    "https://whilst.vercel.app/api/script?token="..data.token.."&hwid="..hwid
)

loadstring(script)()
