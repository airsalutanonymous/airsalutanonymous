from PIL import Image
import os.path, sys

path = "Viz/"
dirs = os.listdir(path)

def crop():
    for item in dirs:
        fullpath = os.path.join(path,item)         #corrected
        if os.path.isfile(fullpath):
            im = Image.open(fullpath)
            f, e = os.path.splitext(fullpath)
            width, height = im.size 
            # imCrop = im.crop((200, 200, width, height)) #corrected
            imCrop = im.crop((0, 0, 200, 200)) #corrected
            
            imCrop = imCrop.convert("RGB")
            imCrop.save(f + 'Cropped.jpg', "JPEG", quality=100)

crop()