print("Aim loaded")

local player = game.Players.LocalPlayer
local mouse = player:GetMouse()

mouse.Button1Down:Connect(function()
    print("Click detected")
end)
