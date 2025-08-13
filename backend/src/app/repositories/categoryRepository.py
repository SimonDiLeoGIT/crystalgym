from app import db
from app.models.category import Category
from app.utils.pagination import PaginationHelper

class CategoryRepository:

  def __init__(self):
    self.pagination = PaginationHelper()

  def createCategory(self, name, description):
    if (db.session.query(Category).filter(Category.name == name).first()):
      return None
    category = Category(name, description)
    db.session.add(category)
    db.session.commit()
    return category

  def getCategories(self, page=1, per_page=10, sort_by='id', sort_order='asc', search=''):
    query = Category.query
    if search:
      query = query.filter(Category.name.contains(search) & Category.description.contains(search))

    if sort_order == 'asc':
        query = query.order_by(getattr(Category, sort_by).asc())
    else:
        query = query.order_by(getattr(Category, sort_by).desc())

    offset = (page - 1) * per_page
    
    categories = query.offset(offset).limit(per_page).all()

    return categories
  
  def getCategoryById(self, category_id):
    category = db.session.query(Category).filter(Category.id == category_id).first()
    return category
  
  # def get_paginated_Categorys(self, page, page_size, sort_by, sort_order, name):
  #   page = int(page)
  #   page_size = int(page_size)

  #   if page < 1:
  #     return None

  #   if page_size < 1:
  #     page_size = 1

  #   query = Category.query


  #   if sort_order == 'asc':
  #       query = query.order_by(getattr(Category, sort_by).asc())
  #   else:
  #       query = query.order_by(getattr(Category, sort_by).desc())

  #   if name:
  #     query = query.filter(Category.name.ilike(f'%{name}%'))

  #   total_items = query.count()

  #   if (total_items == 0):
  #     total_pages = 1
  #   else:
  #     total_pages = (total_items + page_size - 1) // page_size

  #   if page > total_pages:
  #       page = total_pages

  #   Categorys = self.pagination.generate_pagination(page, page_size, query)

  #   pagination_data = self.pagination.get_pagination_data(page, page_size, total_items, total_pages)

  #   response = {
  #       'categories': [Category.to_json() for Category in Categorys],
  #       'pagination': pagination_data
  #   }

  #   return response

  def updateCategory(self, category_id, name, description):
    category = db.session.query(Category).filter_by(id=category_id).first()
    if not category:
        return None, "Category not found"

    # Check duplicate name, but ignore current category
    if (
        db.session.query(Category)
        .filter(Category.name == name, Category.id != category_id)
        .first()
    ):
        return None, "Category name already exists"

    category.name = name
    category.description = description
    db.session.commit()
    return category, "Category updated successfully"

  def deleteCategory(self, category_id):
    category = db.session.query(Category).filter(Category.id == category_id).first()
    if not category:
      return None, "Category not found"
    db.session.query(Category).filter(Category.id == category_id).delete()
    db.session.commit()
    return category, "Category deleted successfully"