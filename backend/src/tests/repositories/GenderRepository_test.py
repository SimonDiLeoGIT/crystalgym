import pytest
from app.repositories.GenderRepository import GenderRepository
from app import db
from app.models.gender import Gender

class TestGenderRepository:
  @pytest.fixture(scope='module')

  def gender_repository(self):
    return GenderRepository()
  
  # Test get_genders returns 404 if no genders are found
  def test_get_genders_returns_404_if_no_genders_are_found(self, test_client, gender_repository):
    with test_client.application.app_context():
      data, message, code = gender_repository.get_genders()
      assert data is None
      assert message == "Gender not found"
      assert code == 404

  # Test get_genders returns 200 if genders are found
  def test_get_genders_returns_200_if_genders_are_found(self, test_client, gender_repository):
    with test_client.application.app_context():
      gender_repository.create_gender('test')
      data, message, code = gender_repository.get_genders()
      assert data is not None
      assert message == "Genders retrieved successfully"
      assert code == 200
  