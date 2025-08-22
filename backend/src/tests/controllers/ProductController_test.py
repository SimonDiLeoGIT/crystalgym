import pytest
from app import db
from app.models.product import Product
from app.controllers.ProductController import product_bp

class TestProductController:

  @pytest.fixture(scope='module')

  def product_controller(self):
    return product_bp.controller
  
  # Test that create product returns 201 and the product data
  def test_that_create_product_returns_201_and_the_product_data(self, test_client):
    # Create a category
    data = {
      "name": "Test ",
      "description": "Test Description"
    }
    test_client.post("/api/categories", json=data)

    data = {
      "name": "Test product",
      "code": "THM",
      "description": "Test Description",
      "release_date": "2025-08-22",
      "gender_id": 1,
      "category_id": 1
    }
    response = test_client.post("/api/products", json=data)
    assert response.json['status_code'] == 201
    assert response.json['data']['id']
    assert response.json['data']['name'] == data['name']
    assert response.json['message'] == 'Product created successfully'
  
  # Test that create product returns 404 if category does not exists
  def test_that_create_product_returns_404_if_category_does_not_exists(self, test_client):
    data = {
      "name": "Test product",
      "code": "THM1",
      "description": "Test Description",
      "release_date": "2025-08-22",
      "gender_id": 1,
      "category_id": 100
    }
    response = test_client.post("/api/products", json=data)
    assert response.json['status_code'] == 404

  # Test that create product returns 409 if the product already exists
  def test_that_create_product_returns_409_if_the_product_already_exists(self, test_client):
    data = {
      "name": "Test product",
      "code": "THM",
      "description": "Test Description",
      "release_date": "2025-08-22",
      "gender_id": 1,
      "category_id": 1
    }
    response = test_client.post("/api/products", json=data)
    assert response.json['status_code'] == 409

  # Test that create pruduct returns 400 if the product name is empty
  def test_that_create_product_returns_400_if_the_product_name_is_empty(self, test_client):
    data = {
      "name": "",
      "code": "THM",
      "description": "Test Description",
      "release_date": "2025-08-22",
      "gender_id": 1,
      "category_id": 1
    }
    response = test_client.post("/api/products", json=data)
    assert response.json['status_code'] == 400

  # test that get products returns 200 and the products data
  def test_that_get_products_returns_200_and_the_products_data(self, test_client):
    response = test_client.get("/api/products")
    assert response.json['status_code'] == 200
    assert len(response.json['data']['products']) >= 0

  # test that get products with params returns 200 and the products data
  def test_that_get_products_with_params_returns_200_and_the_products_data(self, test_client):
    response = test_client.get("/api/products?page=1&per_page=10&sort_by=id&sort_order=asc&search=")
    assert response.json['status_code'] == 200
    assert len(response.json['data']['products']) >= 0

  # Test the get products method return an empty list of products if no products are found
  def test_get_products_return_an_empty_list_of_products(self, test_client):
    response = test_client.get("/api/products?page=2&per_page=10&sort_by=id&sort_order=asc&search=")
    print(response.json)
    assert response.json['status_code'] == 200
    assert len(response.json['data']['products']) == 0

  # test that get products search returns 200 and the products data
  def test_that_get_products_search_returns_200_and_the_products_data(self, test_client):
    response = test_client.get("/api/products?page=1&per_page=10&sort_by=id&sort_order=asc&search=test")
    assert response.json['status_code'] == 200
    assert len(response.json['data']['products']) >= 0
    data = {
      "name": "Test 1",
      "code": "THM1",
      "description": "Test Description",
      "release_date": "2025-08-22",
      "gender_id": 1,
      "categrory_id": 1
    }
    test_client.post("/api/products", json=data)
    response = test_client.post("/api/products", json=data)
    response = test_client.get("/api/products?page=1&per_page=10&sort_by=id&sort_order=asc&search=Test")
    assert response.json['status_code'] == 200
    assert len(response.json['data']['products']) >= 1

  # test that get product by id returns 200 and the product if exists
  def test_that_get_product_by_id_returns_200_and_the_product_if_exists(self, test_client):
    response = test_client.get("/api/products/1")
    assert response.json['status_code'] == 200
    assert response.json['data']['id'] == 1

  # test that get product by id returns 404 if the product does not exist
  def test_that_get_product_by_id_returns_404_if_the_product_does_not_exist(self, test_client):
    response = test_client.get("/api/prducts/1000")
    assert response.json['status_code'] == 404