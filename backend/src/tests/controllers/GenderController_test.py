import pytest
from app import db
from app.models.gender import Gender
from app.controllers.GenderController import gender_bp

class TestGenderController:

  @pytest.fixture(scope='module')

  def gender_controller(self):
    return gender_bp.controller
  
  # Test get genders returns 404 if no genders are found
  def test_get_genders_returns_404_if_no_genders_are_found(self, test_client):
    response = test_client.get("/api/genders")
    assert response.json['status_code'] == 404

  # Test get genders returns 200 and the genders data
  def test_get_genders_returns_200_and_the_genders_data(self, test_client):
    data = {
      "name": "Test Gender",
      "description": "Test Description"
    }
    test_client.post("/api/genders", json=data)
    response = test_client.get("/api/genders")
    assert response.json['status_code'] == 200