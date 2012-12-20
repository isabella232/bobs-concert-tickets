#!/usr/bin/env python

import os

from PIL import Image

TILE_WIDTH = 256
TILE_HEIGHT = 256
ZOOM = 1

full_image = Image.open('data/full.jpg')
width, height = full_image.size

x = 0
y = 0

max_x = width - (width % TILE_WIDTH)
max_y = height - (height % TILE_HEIGHT) 

while x < max_x:
    tile_x = x / TILE_WIDTH
    
    y = 0
    
    while y < max_y:
        tile_y = y / TILE_HEIGHT

        tile = full_image.crop((x, y, x + TILE_WIDTH, y + TILE_HEIGHT))

        folder = 'www/img/tiles/%i/%i/' % (ZOOM, tile_x)

        if not os.path.exists(folder):
            os.makedirs(folder)

        path = os.path.join(folder, '%i.png' % tile_y)

        print path

        tile.save(path, 'PNG')

        y += TILE_HEIGHT
    
    x += TILE_WIDTH

