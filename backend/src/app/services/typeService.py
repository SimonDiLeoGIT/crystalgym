from app.utils.singletonMeta import SingletonMeta
from app.repositories.typeRepository import TypeRepository
from app.utils.pagination import PaginationHelper

class TypeService(metaclass=SingletonMeta):

  def __init__(self):
    self.type_repository = TypeRepository()
    self.pagination = PaginationHelper()

  def create_type(self, name, description):
    category = self.type_repository.create_type(name, description)
    if category is None:
      return [None, 'Category already exists', 409]
    return [category.to_json(), 'Category created successfully', 201]

  def get_categories(self):
    categories = self.type_repository.get_types()
    if categories is None:
      return [None, 'Categories not found', 404]
    
    categories_json = [category.to_json() for category in categories]
    return [categories_json, 'Categories retrieved successfully', 200]
  
  def get_paginated_categories(self, page=1, page_size=10, sort_by='id', sort_order='asc', name=''):
    valid_sort_orders = ['asc', 'desc']
    valid_sort_fields = ['id', 'name', 'description']

    if sort_by not in valid_sort_fields:
        sort_by = 'id'
    if sort_order not in valid_sort_orders:
        sort_order = 'asc'

    categories = self.type_repository.get_paginated_types(page, page_size, sort_by, sort_order, name)
    if categories is None:
      return [None, 'Categories not found', 404]
    
    return [categories, 'Categories retrieved successfully', 200]
  
  def update_type(self, id_type, name, description):
    if not self.type_repository.get_type_by_id(id_type):
      return [None, 'Category not found', 404]
    category = self.type_repository.update_type(id_type, name, description)
    return [category.to_json(), 'Category updated successfully', 200]
  
  def delete_type(self, id_type):
    if not self.type_repository.get_type_by_id(id_type):
      return [None, 'Category not found', 404]
    category = self.type_repository.delete_type(id_type)
    return [category, 'Category deleted successfully', 200]