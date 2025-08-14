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