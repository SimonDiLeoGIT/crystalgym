from app.utils.singletonMeta import SingletonMeta
from app.repositories.typeRepository import TypeRepository
from app.utils.pagination import PaginationHelper

class TypeService(metaclass=SingletonMeta):

  def __init__(self):
    self.type_repository = TypeRepository()
    self.pagination = PaginationHelper()

  def create_type(self, name):
    category = self.type_repository.create_type(name)
    if category is None:
      return [None, 'Category already exists', 409]
    return [category.to_json(), 'Category created successfully', 201]

  def get_categories(self):
    categories = self.type_repository.get_types()
    if categories is None:
      return [None, 'Categories not found', 404]
    
    categories_json = [category.to_json() for category in categories]
    return [categories_json, 'Categories retrieved successfully', 200]
  
  def get_paginated_categories(self, page=1, page_size=10):
    categories = self.type_repository.get_paginated_types(page, page_size)
    if categories is None:
      return [None, 'Categories not found', 404]
    
    return [categories, 'Categories retrieved successfully', 200]
  
  def update_type(self, id_type, name):
    if not self.type_repository.get_types_by_id(id_type):
      return [None, 'Type not found', 404]
    category = self.type_repository.update_type(id_type, name)
    return [category.to_json(), 'Type updated successfully', 200]