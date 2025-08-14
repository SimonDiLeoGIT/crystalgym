import pytest
from app.repositories.CategoryRepository import CategoryRepository
from app import db
from app.models.category import Category

class TestCategoryRepository:
  @pytest.fixture(scope='module')

  def category_repository(self):
    return CategoryRepository()
  
  # Test the create_category method return the created category
  def test_create_category_return_the_created_category(self, test_client, category_repository):
    with test_client.application.app_context():
      category = category_repository.create_category('test', 'test')
      assert category[0].name == 'test'
      assert category[0].description == 'test'
  
  # Test the create_category method return None if the category already exists
  def test_create_category_return_none_if_the_category_already_exists(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test_2', 'test_2')
      category_already_exists = category_repository.create_category('test_2', 'test_2')
      assert category_already_exists[0] == None
      db.session.query(Category).delete()

  # Test the get_categories method return an empty list if there are no categories
  def test_get_categories_return_an_empty_list_if_there_are_no_categories(self, test_client, category_repository):
    with test_client.application.app_context():
      # Delete all categories
      db.session.query(Category).delete()
      categories = category_repository.get_categories()
      assert len(categories[0]) == 0

  # Test the get_categories method return a list of categories if non parameters are passed
  def test_get_categories_return_a_list_of_categories_if_non_parameters_are_passed(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      categories = category_repository.get_categories()
      assert len(categories[0]) == 2
      db.session.query(Category).delete()

  # Test the get_categories method return a list of per_page or less categories if per_page are passed
  def test_get_categories_return_a_list_of_per_page_or_less_categories_if_per_page_are_passed(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      categories = category_repository.get_categories(per_page=5)
      assert len(categories[0]) <= 5
      db.session.query(Category).delete()

  # Test the get_categories method return a list of categories from page
  def test_get_categories_return_a_list_of_categories_from_page(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      categories = category_repository.get_categories(page=2, per_page=2)
      assert len(categories[0]) == 2
      db.session.query(Category).delete()
  
  # Test the get_categories method return an empty list of categories from page if offset is greater than the number of categories
  def test_get_categories_return_an_empty_list_of_categories_from_page_if_offset_is_greater_than_the_number_of_categories(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      categories = category_repository.get_categories(page=2)
      assert len(categories[0]) == 0
      db.session.query(Category).delete()

  # Test the get_categories method return a list of categories sorted by id
  def test_get_categories_return_a_list_of_categories_sorted_by_id(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      categories = category_repository.get_categories(sort_by='id')
      assert categories[0][0].name == 'test'
      db.session.query(Category).delete()

  # Test the get_categories method return a list of categories sorted by name
  def test_get_categories_return_a_list_of_categories_sorted_by_name(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      categories = category_repository.get_categories(sort_by='name')
      assert categories[0][0].name == 'test'
      db.session.query(Category).delete()
  
  # Test the get_categories method return a list of categories sorted by description
  def test_get_categories_return_a_list_of_categories_sorted_by_description(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      categories = category_repository.get_categories(sort_by='description')
      assert categories[0][0].name == 'test'
      db.session.query(Category).delete()

  # Test the get_categories method return a list of categories sorted by id in descending order
  def test_get_categories_return_a_list_of_categories_sorted_by_id_in_descending_order(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      categories = category_repository.get_categories(sort_by='id', sort_order='desc')
      assert categories[0][0].name == 'test_4'
      db.session.query(Category).delete()

  # Test the get_categories method return a list of categories sorted by name in descending order
  def test_get_categories_return_a_list_of_categories_sorted_by_name_in_descending_order(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      categories = category_repository.get_categories(sort_by='name', sort_order='desc')
      assert categories[0][0].name == 'test_4'
      db.session.query(Category).delete()

  # Test the get_categories method return a list of categories sorted by description in descending order
  def test_get_categories_return_a_list_of_categories_sorted_by_description_in_descending_order(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      categories = category_repository.get_categories(sort_by='description', sort_order='desc')
      assert categories[0][0].name == 'test_4'
      db.session.query(Category).delete()

  # Test the get_categories method return a list of categories where search is passed
  def test_get_categories_return_a_list_of_categories_where_search_is_passed(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      categories = category_repository.get_categories(search='test')
      assert len(categories[0]) == 4
      assert categories[0][0].name == 'test'
      db.session.query(Category).delete()
      
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      categories = category_repository.get_categories(search='test_2')
      assert categories[0][0].name == 'test_2'
      db.session.query(Category).delete()

  # Test get_category_by_id method return a category by id
  def test_get_category_by_id_return_a_category_by_id(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      category = category_repository.get_category_by_id(1)
      assert category.name == 'test'
      db.session.query(Category).delete()

  # Test get_category_by_id method return None if category is not found by id
  def test_get_category_by_id_return_None_if_category_is_not_found_by_id(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      category = category_repository.get_category_by_id(5)
      assert category[0] == None
      db.session.query(Category).delete()

  # Test update_category method return updated category
  def test_update_category_return_updated_category(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      category = category_repository.update_category(1, 'test_5', 'test_5')
      assert category.name == 'test_5'
      db.session.query(Category).delete()

  # Test update_category return None if category is not found by id
  def test_update_category_return_None_if_category_is_not_found_by_id(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      category = category_repository.update_category(5, 'test_5', 'test_5')
      assert category[0] == None
      db.session.query(Category).delete()

  # Test delete_category method return deleted category
  def test_delete_category_return_deleted_category(self, test_client, category_repository):
    with test_client.application.app_context():
      category = category_repository.create_category('test_6', 'test_6')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      deleted_category = category_repository.delete_category(category[0].id)
      assert deleted_category.name == 'test_6'
      db.session.query(Category).delete()

  # Test delete_category return None if category is not found by id
  def test_delete_category_return_none_if_category_is_not_found_by_id(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.create_category('test', 'test')
      category_repository.create_category('test_2', 'test_2')
      category_repository.create_category('test_3', 'test_3')
      category_repository.create_category('test_4', 'test_4')
      category = category_repository.delete_category(6)
      assert category[0] == None
      db.session.query(Category).delete()