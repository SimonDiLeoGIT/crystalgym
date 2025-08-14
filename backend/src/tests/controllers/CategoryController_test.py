import pytest
from app import db
from app.models.category import Category
from app.controllers.CategoryController import category_bp

class TestCategoryController:

  @pytest.fixture(scope='module')

  def category_controller(self):
    return category_bp.controller
  
  # Test that create category returns 201 and the category data
  def test_that_create_category_returns_201_and_the_category_data(self, test_client):
    data = {
      "name": "Test Category",
      "description": "Test Description"
    }
    response = test_client.post("/api/categories", json=data)
    assert response.json['status_code'] == 201
    assert response.json['data']['id']

  # test that create category returns 409 if the category already exists
  def test_that_create_category_returns_409_if_the_category_already_exists(self, test_client):
    data = {
      "name": "Test Category",
      "description": "Test Description"
    }
    test_client.post("/api/categories", json=data)
    response = test_client.post("/api/categories", json=data)
    assert response.json['status_code'] == 409

  # test that create category returns 400 if the category name is empty
  def test_that_create_category_returns_400_if_the_category_name_is_empty(self, test_client):
    data = {
      "name": "",
      "description": "Test Description"
    }
    response = test_client.post("/api/categories", json=data)
    assert response.json['status_code'] == 400

  # test that get categories returns 200 and the categories data
  def test_that_get_categories_returns_200_and_the_categories_data(self, test_client):
    response = test_client.get("/api/categories")
    assert response.json['status_code'] == 200
    assert len(response.json['data']['categories']) >= 0

  # test that get category with params returns 200 and the category data
  def test_that_get_category_with_params_returns_200_and_the_category_data(self, test_client):
    response = test_client.get("/api/categories?page=1&per_page=10&sort_by=id&sort_order=asc&search=")
    assert response.json['status_code'] == 200
    assert len(response.json['data']) >= 0

  # Test the get_categories method return an empty list of categories if no categories are found
  def test_get_categories_return_an_empty_list_of_categories(self, test_client):
    response = test_client.get("/api/categories?page=2&per_page=10&sort_by=id&sort_order=asc&search=")
    print(response.json)
    assert response.json['status_code'] == 200
    assert len(response.json['data']) == 0

  # test that get category search returns 200 and the category data
  def test_that_get_category_search_returns_200_and_the_category_data(self, test_client):
    response = test_client.get("/api/categories?page=1&per_page=10&sort_by=id&sort_order=asc&search=test")
    assert response.json['status_code'] == 200
    assert len(response.json['data']) >= 0
    data = {
      "name": "Test ",
      "description": "Test Description"
    }
    test_client.post("/api/categories", json=data)
    response = test_client.post("/api/categories", json=data)
    response = test_client.get("/api/categories?page=1&per_page=10&sort_by=id&sort_order=asc&search=Test")
    assert response.json['status_code'] == 200
    assert len(response.json['data']) >= 1