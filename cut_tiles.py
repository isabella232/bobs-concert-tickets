#!/usr/bin/env python

import os

from PIL import Image

TILE_WIDTH = 256
TILE_HEIGHT = 256
MIN_ZOOM = 0 
MAX_ZOOM = 2

# Open original image
full_image = Image.open('data/full.jpg')
full_width, full_height = full_image.size

# Compute area evenly divisble into tiles
max_x = full_width - (full_width % TILE_WIDTH)
max_y = full_height - (full_height % TILE_HEIGHT)

# Crop image to nearest region evenly divisible into tiles
full_image = full_image.crop((0, 0, max_x, max_y))
full_width, full_height = full_image.size

zoom = MAX_ZOOM 

while zoom >= MIN_ZOOM:
    # Max zoom level is pixel-perfect
    if zoom == MAX_ZOOM:
        image = full_image

        width = full_width
        height = full_height
    # Other zoom levels are downsampled
    else:
        width = full_width / (2 ** (MAX_ZOOM - zoom))
        height = full_height / (2 ** (MAX_ZOOM - zoom))

        image = full_image.resize((width, height))

    max_x = width - (width % TILE_WIDTH)
    max_y = height - (height % TILE_HEIGHT) 
    
    x = 0

    while x < max_x:
        tile_x = x / TILE_WIDTH 
        
        y = 0
        
        while y < max_y:
            tile_y = y / TILE_HEIGHT

            tile = image.crop((x, y, x + TILE_WIDTH, y + TILE_HEIGHT))

            folder = 'www/img/tiles/%i/%i/' % (zoom, tile_x)

            if not os.path.exists(folder):
                os.makedirs(folder)

            path = os.path.join(folder, '%i.png' % tile_y)

            print path

            tile.save(path, 'PNG')

            y += TILE_HEIGHT
        
        x += TILE_WIDTH

    zoom -= 1
