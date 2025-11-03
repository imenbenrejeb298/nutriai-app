$body = @{ name='TestUser'; weight=72; height=175; conditions=@{diabetes=$false} } | ConvertTo-Json -Depth 5
try {
  $r = Invoke-RestMethod -Uri 'http://localhost:5000/api/generate-meal-plan' -Method Post -Body $body -ContentType 'application/json' -ErrorAction Stop
  Write-Output '=== RESPONSE START ==='
  $r | ConvertTo-Json -Depth 6 | Write-Output
  Write-Output '=== RESPONSE END ==='
} catch {
  Write-Output 'REQUEST FAILED:'
  Write-Output $_.Exception.Message
}
