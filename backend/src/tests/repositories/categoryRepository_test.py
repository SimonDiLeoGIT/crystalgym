import pytest
from app.repositories.categoryRepository import CategoryRepository
from app import db
from app.models.category import Category

class TestCategoryRepository:
  @pytest.fixture(scope='module')

  def category_repository(self):
    return CategoryRepository()
  
  # Test the createCategory method return the created category
  def test_createCategory_return_the_created_category(self, test_client, category_repository):
    with test_client.application.app_context():
      category = category_repository.createCategory('test', 'test')
      assert category.name == 'test'
      assert category.description == 'test'
  
  # Test the createCategory method return None if the category already exists
  def test_createCategory_return_none_if_the_category_already_exists(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test_2', 'test_2')
      category_already_exists = category_repository.createCategory('test_2', 'test_2')
      assert category_already_exists == None
      db.session.query(Category).delete()

  # Test the getCategories method return an empty list if there are no categories
  def test_getCategories_return_an_empty_list_if_there_are_no_categories(self, test_client, category_repository):
    with test_client.application.app_context():
      # Delete all categories
      db.session.query(Category).delete()
      categories = category_repository.getCategories()
      assert len(categories) == 0

  # Test the getCategories method return a list of categories if non parameters are passed
  def test_getCategories_return_a_list_of_categories_if_non_parameters_are_passed(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      categories = category_repository.getCategories()
      assert len(categories) == 2
      db.session.query(Category).delete()

  # Test the getCategories method return a list of per_page or less categories if per_page are passed
  def test_getCategories_return_a_list_of_per_page_or_less_categories_if_per_page_are_passed(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      categories = category_repository.getCategories(per_page=5)
      assert len(categories) <= 5
      db.session.query(Category).delete()

  # Test the getCategories method return a list of categories from page
  def test_getCategories_return_a_list_of_categories_from_page(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      categories = category_repository.getCategories(page=2, per_page=2)
      assert len(categories) == 2
      db.session.query(Category).delete()
  
  # Test the getCategories method return an empty list of categories from page if offset is greater than the number of categories
  def test_getCategories_return_an_empty_list_of_categories_from_page_if_offset_is_greater_than_the_number_of_categories(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      categories = category_repository.getCategories(page=2)
      assert len(categories) == 0
      db.session.query(Category).delete()

  # Test the getCategories method return a list of categories sorted by id
  def test_getCategories_return_a_list_of_categories_sorted_by_id(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      categories = category_repository.getCategories(sort_by='id')
      assert categories[0].name == 'test'
      db.session.query(Category).delete()

  # Test the getCategories method return a list of categories sorted by name
  def test_getCategories_return_a_list_of_categories_sorted_by_name(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      categories = category_repository.getCategories(sort_by='name')
      assert categories[0].name == 'test'
      db.session.query(Category).delete()
  
  # Test the getCategories method return a list of categories sorted by description
  def test_getCategories_return_a_list_of_categories_sorted_by_description(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      categories = category_repository.getCategories(sort_by='description')
      assert categories[0].name == 'test'
      db.session.query(Category).delete()

  # Test the getCategories method return a list of categories sorted by id in descending order
  def test_getCategories_return_a_list_of_categories_sorted_by_id_in_descending_order(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      categories = category_repository.getCategories(sort_by='id', sort_order='desc')
      assert categories[0].name == 'test_4'
      db.session.query(Category).delete()

  # Test the getCategories method return a list of categories sorted by name in descending order
  def test_getCategories_return_a_list_of_categories_sorted_by_name_in_descending_order(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      categories = category_repository.getCategories(sort_by='name', sort_order='desc')
      assert categories[0].name == 'test_4'
      db.session.query(Category).delete()

  # Test the getCategories method return a list of categories sorted by description in descending order
  def test_getCategories_return_a_list_of_categories_sorted_by_description_in_descending_order(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      categories = category_repository.getCategories(sort_by='description', sort_order='desc')
      assert categories[0].name == 'test_4'
      db.session.query(Category).delete()

  # Test the getCategories method return a list of categories where search is passed
  def test_getCategories_return_a_list_of_categories_where_search_is_passed(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      categories = category_repository.getCategories(search='test')
      assert len(categories) == 4
      assert categories[0].name == 'test'
      db.session.query(Category).delete()
      
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      categories = category_repository.getCategories(search='test_2')
      assert categories[0].name == 'test_2'
      db.session.query(Category).delete()

  # Test getCategoryById method return a category by id
  def test_getCategoryById_return_a_category_by_id(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      category = category_repository.getCategoryById(1)
      assert category.name == 'test'
      db.session.query(Category).delete()

  # Test getCategoryById method return None if category is not found by id
  def test_getCategoryById_return_None_if_category_is_not_found_by_id(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      category = category_repository.getCategoryById(5)
      assert category == None
      db.session.query(Category).delete()

  # Test updateCategory method return updated category
  def test_updateCategory_return_updated_category(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      category = category_repository.updateCategory(1, 'test_5', 'test_5')
      assert category[0].name == 'test_5'
      db.session.query(Category).delete()

  # Test updateCategory return None if category is not found by id
  def test_updateCategory_return_None_if_category_is_not_found_by_id(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      category = category_repository.updateCategory(5, 'test_5', 'test_5')
      assert category[0] == None
      db.session.query(Category).delete()

  # Test deleteCategory method return deleted category
  def test_deleteCategory_return_deleted_category(self, test_client, category_repository):
    with test_client.application.app_context():
      category = category_repository.createCategory('test_6', 'test_6')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      deleted_category = category_repository.deleteCategory(category.id)
      assert deleted_category[0].name == 'test_6'
      db.session.query(Category).delete()

  # Test deleteCategory return None if category is not found by id
  def test_deleteCategory_return_none_if_category_is_not_found_by_id(self, test_client, category_repository):
    with test_client.application.app_context():
      category_repository.createCategory('test', 'test')
      category_repository.createCategory('test_2', 'test_2')
      category_repository.createCategory('test_3', 'test_3')
      category_repository.createCategory('test_4', 'test_4')
      category = category_repository.deleteCategory(6)
      assert category[0] == None
      db.session.query(Category).delete()