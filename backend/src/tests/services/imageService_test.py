import pytest
from app.services.imageService import ImageService

class TestImageService:

  @pytest.fixture(scope='module')
  def image_service(self):
    return ImageService()
  
  def test_save_image(self, test_client, image_service):
    with test_client.application.app_context():
      with open('tests/resources/cap-1.jpg', 'rb') as image_content:
        image = image_service.save_image(1, 1, 'url', 'name', image_content)
        assert image['id_clothe'] == 1
        assert image['id_color'] == 1
        assert image['hashcode'] == 'MWNdO8WB~qof%M~qofIUfQM{_3j[D%ayWB'
        assert image['url'] == 'url'
        assert image['name'] == 'name'