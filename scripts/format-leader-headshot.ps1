param(
  [Parameter(Mandatory = $true)]
  [string]$Source,

  [Parameter(Mandatory = $true)]
  [string]$Output,

  [double]$Zoom = 1.0,
  [double]$OffsetX = 0.0,
  [double]$OffsetY = 0.0,
  [int]$Size = 768,
  [switch]$Preview
)

Add-Type -AssemblyName System.Drawing

$sourcePath = (Resolve-Path -LiteralPath $Source).Path
$outputPath = if ([System.IO.Path]::IsPathRooted($Output)) {
  $Output
} else {
  Join-Path (Get-Location) $Output
}

$outputDirectory = Split-Path -Parent $outputPath
if ($outputDirectory) {
  New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
}

$image = [System.Drawing.Image]::FromFile($sourcePath)
try {
  $baseCrop = [Math]::Min($image.Width, $image.Height)
  $cropSize = [Math]::Max(1, [int]($baseCrop / [Math]::Max($Zoom, 0.01)))
  $centerX = ($image.Width / 2) + ($baseCrop * $OffsetX)
  $centerY = ($image.Height / 2) + ($baseCrop * $OffsetY)
  $x = [int]($centerX - ($cropSize / 2))
  $y = [int]($centerY - ($cropSize / 2))
  $x = [Math]::Max(0, [Math]::Min($x, $image.Width - $cropSize))
  $y = [Math]::Max(0, [Math]::Min($y, $image.Height - $cropSize))
  $crop = New-Object System.Drawing.Rectangle($x, $y, $cropSize, $cropSize)

  $bitmap = New-Object System.Drawing.Bitmap($Size, $Size)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  try {
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.DrawImage($image, 0, 0, $crop, [System.Drawing.GraphicsUnit]::Pixel)
    $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  } finally {
    $graphics.Dispose()
    $bitmap.Dispose()
  }
} finally {
  $image.Dispose()
}

if ($Preview) {
  $previewPath = [System.IO.Path]::Combine(
    $outputDirectory,
    "$([System.IO.Path]::GetFileNameWithoutExtension($outputPath))-circle-preview.png"
  )
  $headshot = [System.Drawing.Image]::FromFile($outputPath)
  try {
    $previewBitmap = New-Object System.Drawing.Bitmap(240, 240)
    $previewGraphics = [System.Drawing.Graphics]::FromImage($previewBitmap)
    try {
      $previewGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
      $previewGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $previewGraphics.Clear([System.Drawing.Color]::Transparent)
      $path = New-Object System.Drawing.Drawing2D.GraphicsPath
      $path.AddEllipse(0, 0, 240, 240)
      $previewGraphics.SetClip($path)
      $previewGraphics.DrawImage($headshot, 0, 0, 240, 240)
      $previewBitmap.Save($previewPath, [System.Drawing.Imaging.ImageFormat]::Png)
      $path.Dispose()
    } finally {
      $previewGraphics.Dispose()
      $previewBitmap.Dispose()
    }
  } finally {
    $headshot.Dispose()
  }
}

Write-Output "Saved $outputPath"
if ($Preview) {
  Write-Output "Saved $previewPath"
}
