from app import db
from app.models.category import Category
from app.utils.pagination import PaginationHelper

class CategoryRepository:

  def __init__(self):
    self.pagination = PaginationHelper()

  def create_category(self, name, description):
    if db.session.query(Category).filter(Category.name == name).first():
        return None, f"Category with name {name} already exists", 409
    category = Category(name, description)
    db.session.add(category)
    db.session.commit()
    return category, "Category created successfully", 201


  def get_categories(self, page=1, per_page=10, sort_by='id', sort_order='asc', search=''):
    query = Category.query
    if search:
      query = query.filter(Category.name.contains(search) & Category.description.contains(search))

    if sort_order == 'asc':
        query = query.order_by(getattr(Category, sort_by).asc())
    else:
        query = query.order_by(getattr(Category, sort_by).desc())

    offset = (page - 1) * per_page
    
    categories = query.offset(offset).limit(per_page).all()

    return categories, "Categories retrieved successfully", 200
  
  def get_category_by_id(self, category_id):
    category = db.session.query(Category).filter(Category.id == category_id).first()
    if not category:
      return None, "Category with id {category_id} not found"
    return category

  def update_category(self, category_id, name, description):
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
    return category

  def delete_category(self, category_id):
    category = db.session.query(Category).filter(Category.id == category_id).first()
    if not category:
      return None, "Category not found"
    db.session.query(Category).filter(Category.id == category_id).delete()
    db.session.commit()
    return category