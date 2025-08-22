import pytest
from app.repositories.ProductRepository import ProductRepository
from app import db
from app.models.product import Product
from datetime import datetime

class TestProductRepository:
  @pytest.fixture(scope='module')

  def product_repository(self):
    return ProductRepository()
  
  # Test create product returns the product with code 201
  def test_create_product(self, test_client, product_repository):
    with test_client.application.app_context():
      release_date = datetime.strptime("22/08/2025", "%d/%m/%Y").date()
      data, message, code = product_repository.create_product('test', 'THM', 'test', release_date, 1, 1)
      assert data['name'] == 'test'
      assert data['description'] == 'test'
      assert data['code'] == 'THM'
      assert code == 201
      db.session.query(Product).delete()

  # Test create_product returns 409 if product with code already exists
  def test_create_product_returns_404_if_product_with_code_already_exists(self, test_client, product_repository):
    with test_client.application.app_context():
      release_date = datetime.strptime("22/08/2025", "%d/%m/%Y").date()
      product_repository.create_product('test', 'THM', 'test', release_date, 1, 1)
      data, message, code = product_repository.create_product('test', 'THM', 'test', release_date, 1, 1)
      assert code == 409
      db.session.query(Product).delete()

  # Test get_products returns an empty list if no products are found
  def test_get_products_returns_an_empty_list_if_no_products_are_found(self, test_client, product_repository):
    with test_client.application.app_context():
      db.session.query(Product).delete()
      data, message, code = product_repository.get_products()
      assert len(data['products']) == 0
      db.session.query(Product).delete()

  # Test get_products returns a list of products if products are found
  def test_get_products_returns_a_list_of_products_if_products_are_found(self, test_client, product_repository):
    with test_client.application.app_context():
      release_date = datetime.strptime("22/08/2025", "%d/%m/%Y").date()
      product_repository.create_product('test', 'THM', 'test', release_date, 1, 1)
      data, message, code = product_repository.get_products()
      assert len(data['products']) == 1
      assert code == 200
      db.session.query(Product).delete()

  # Test get_products returns a list of products if parameters are passed
  def test_get_products_returns_a_list_of_products_if_parameters_are_passed(self, test_client, product_repository):
    with test_client.application.app_context():
      release_date = datetime.strptime("22/08/2025", "%d/%m/%Y").date()
      product_repository.create_product('test', 'THM', 'test', release_date, 1, 1)
      product_repository.create_product('test_1', 'THM1', 'test_1', release_date, 1, 1)
      product_repository.create_product('test_2', 'THM2', 'test_2', release_date, 2, 1)
      data, message, code = product_repository.get_products(page=1, per_page=2)
      assert len(data['products']) == 2
      assert code == 200
      db.session.query(Product).delete()

  # Test get_products returns a list of products if parameters and page are passed
  def test_get_products_returns_a_list_of_products_if_parameters_and_page_are_passed(self, test_client, product_repository):
    with test_client.application.app_context():
      release_date = datetime.strptime("22/08/2025", "%d/%m/%Y").date()
      product_repository.create_product('test', 'THM', 'test', release_date, 1, 1)
      product_repository.create_product('test_1', 'THM1', 'test_1', release_date, 1, 1)
      product_repository.create_product('test_2', 'THM2', 'test_2', release_date, 2, 1)
      data, message, code = product_repository.get_products(page=2, per_page=2)
      assert len(data['products']) == 1
      assert code == 200
      db.session.query(Product).delete()

  # Test get_product_by_id returns 404 if there are no products found
  def test_get_product_by_id_returns_404_if_no_products_are_found(self, test_client, product_repository):
    with test_client.application.app_context():
      db.session.query(Product).delete()
      data, message, code = product_repository.get_product_by_id(1)
      assert code == 404

  # Test get_product_by_id returns the product if it is found
  def test_get_product_by_id_returns_the_product_if_it_is_found(self, test_client, product_repository):
    with test_client.application.app_context():
      release_date = datetime.strptime("22/08/2025", "%d/%m/%Y").date()
      product_repository.create_product('test', 'THM', 'test', release_date, 1, 1)
      data, message, code = product_repository.get_product_by_id(1)
      assert data['name'] == 'test'
      assert data['description'] == 'test'
      assert data['code'] == 'THM'
      assert code == 200
      db.session.query(Product).delete()
  
  # Test update_product returns 404 if the product is not found
  def test_update_product_returns_404_if_the_product_is_not_found(self, test_client, product_repository):
    with test_client.application.app_context():
      db.session.query(Product).delete()
      release_date = datetime.strptime("22/08/2025", "%d/%m/%Y").date()
      data, message, code = product_repository.update_product(1, 'test', 'THM', 'test', release_date, 1, 1)
      assert code == 404

  # Test update_product returns 200 and updates the product if the product is found
  def test_update_product_returns_200_if_the_product_is_found(self, test_client, product_repository):
    with test_client.application.app_context():
      release_date = datetime.strptime("22/08/2025", "%d/%m/%Y").date()
      product_repository.create_product('test', 'THM', 'test', release_date, 1, 1)
      data, message, code = product_repository.update_product(1, 'test_1', 'THM1', 'test_1', release_date, 1, 1)
      assert code == 200
      assert data['name'] == 'test_1'
      assert data['description'] == 'test_1'
      assert data['code'] == 'THM1'
      db.session.query(Product).delete()

  # Test delete product returns 404 if the product is not found
  def test_delete_product_returns_404_if_the_product_is_not_found(self, test_client, product_repository):
    with test_client.application.app_context():
      db.session.query(Product).delete()
      data, message, code = product_repository.delete_product(1)
      assert code == 404

  # Test delete product returns 200 and deletes the product if the product is found
  def test_delete_product_returns_200_if_the_product_is_found(self, test_client, product_repository):
    with test_client.application.app_context():
      release_date = datetime.strptime("22/08/2025", "%d/%m/%Y").date()
      product_repository.create_product('test', 'THM', 'test', release_date, 1, 1)
      data, message, code = product_repository.delete_product(1)
      assert code == 200