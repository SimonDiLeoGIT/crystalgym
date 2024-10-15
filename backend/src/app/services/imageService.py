from app.repositories.imageRepository import ImageRepository
from app.utils.singletonMeta import SingletonMeta
from PIL import Image
from io import BytesIO
from blurhash import encode

class ImageService(metaclass=SingletonMeta):
    
    def __init__(self):
        self.image_repository = ImageRepository()

    def save_image(self, id_clothe, id_color, url, name, image):
        hashcode = self.blurhash_image(image)
        image = self.image_repository.save_image(id_clothe, id_color, hashcode, url, name)
        return image.to_json()
    
    def blurhash_image(self, image):
        image_data = Image.open(BytesIO(image))
        return encode(image_data, 5, 3)