
import PIL.Image, math
import PIL.ImageFilter

width = 2300*2
height = 104

img = PIL.Image.new("RGBA", (width, height), (0, 0, 0, 0))

for i in range(width):
    s = int(height*(math.cos(math.pi*i/460)+1)/2)
    for j in range(s, height-1):
        img.putpixel((i, j+1), (38, 37, 40))

img = img.filter(PIL.ImageFilter.GaussianBlur(radius = 1))
img.save("./sine.png")

