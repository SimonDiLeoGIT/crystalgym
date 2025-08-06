import pytest
from datetime import datetime
from app.repositories.clotheRepository import ClotheRepository

class TestClotheRepository:
  
  @pytest.fixture(scope='module')
  def clothe_repository(self):
    return ClotheRepository()
  
  # Test that get clothes return None if there are no clothes
  def test_get_clothes_empty(self, test_client, clothe_repository):
    with test_client.application.app_context():
      # Delete all clothes before testing
      data = clothe_repository.get_clothes()
      assert data is None
  
  # Test that save clothe return the clothe
  def test_save_clothe(self, test_client, clothe_repository):
    with test_client.application.app_context():
      clothe = clothe_repository.save_clothe('name', 'description', 1, datetime.now(), 1, 1)
      clothe = clothe.to_json()
      assert clothe['name'] == 'name'
      assert clothe['description'] == 'description'
      assert clothe['price'] == 1
      assert clothe['id_gender'] == 1
      assert clothe['id_type'] == 1

  # Test that get clothes return all clothes if non are specified
  def test_get_clothes(self, test_client, clothe_repository):
    with test_client.application.app_context():
      data = clothe_repository.get_clothes()
      assert data
      assert len(data) > 0
  
  # Test that get clothes with params return clothes with this params
  def test_get_clothes_with_params(self, test_client, clothe_repository):
    with test_client.application.app_context():
      data = clothe_repository.get_clothes(id_type=1, id_gender=1, sort_by='id', sort_order='asc')
      assert data
      assert len(data) > 0
      assert data['clothes']
      assert len(data['clothes']) > 0
      assert data['clothes'][0]['name'] == 'name'
      assert data['clothes'][0]['description'] == 'description'
      assert data['clothes'][0]['price'] == 1
      assert data['clothes'][0]['id_gender'] == 1
      assert data['clothes'][0]['id_type'] == 1
      assert data['pagination']
      assert data['pagination']['current_page'] == 1
      assert data['pagination']['page_size'] == 10
      

  # Test that get clothe by id works
  def test_get_clothe_by_id(self, test_client, clothe_repository):
    with test_client.application.app_context():
      data = clothe_repository.get_clothe_by_id(1)
      clothe = data.to_json()
      assert clothe['name'] == 'name'
      assert clothe['description'] == 'description'
      assert clothe['price'] == 1
      assert clothe['id_gender'] == 1
      assert clothe['id_type'] == 1

  # Test that get clothes by non-existing id returns None
  def test_get_clothe_by_id_not_found(self, test_client, clothe_repository):
    with test_client.application.app_context():
      data = clothe_repository.get_clothe_by_id(100)
      assert data is None

  # Test that get clothes by category works
  def test_get_clothes_by_category(self, test_client, clothe_repository):
    with test_client.application.app_context():
      data = clothe_repository.get_clothes_by_category(1, 1, 1, 10)
      assert data

  # Test that update clothe works
  def test_update_clothe(self, test_client, clothe_repository):
    with test_client.application.app_context():
      data = clothe_repository.update_clothe(1, 'new_name', 'new_description', 1)
      clothe = data.to_json()
      assert clothe['name'] == 'new_name'
      assert clothe['description'] == 'new_description'
      assert clothe['price'] == 1
      assert clothe['id_gender'] == 1
      assert clothe['id_type'] == 1

  # Test that update non-existing clothe returns None
  def test_update_clothe_not_found(self, test_client, clothe_repository):
    with test_client.application.app_context():
      data = clothe_repository.update_clothe(100, 'new_name', 'new_description', 1)
      assert data is None

  # Test that delete clothe works
  # def test_delete_clothe(self, test_client, clothe_repository):
  #   with test_client.application.app_context():
  #     data = clothe_repository.delete_clothe(1)
  #     assert data

  # Test that delete non-existing clothe returns None
  def test_delete_clothe_not_found(self, test_client, clothe_repository):
    with test_client.application.app_context():
      data = clothe_repository.delete_clothe(100)
      assert data is None

  # Test that get_clothes_by_category for admin works
  def test_get_clothes_by_category(self, test_client, clothe_repository):
    with test_client.application.app_context():
      # id_type, id_gender=None, page=1, page_size=10, sort_by='id', sort_order=None, name=None
      data = clothe_repository.get_clothes_by_category(1, 1, 1, 10, 'id', 'asc', None)
      assert data
      assert len(data) > 0
      clothes = data['clothes']
      assert clothes