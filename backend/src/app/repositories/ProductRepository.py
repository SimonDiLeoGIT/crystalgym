from app import db
from app.models.product import Product
from app.models.category import Category
from app.utils.pagination import PaginationHelper

class ProductRepository:

  def __init__(self):
    self.pagination = PaginationHelper()

  def create_product(self, name, code, description, release_date, gender_id, category_id):
    if db.session.query(Product).filter(Product.code == code).first():
      return None, f"Product with code {code} already exists", 409
    if db.session.query(Category).filter(Category.id == category_id).first() is None:
      return None, f"Category with id {category_id} not found", 404
    product = Product(name=name, code=code, description=description, release_date=release_date, gender_id=gender_id, category_id=category_id)
    db.session.add(product)
    db.session.commit()
    return product.to_json(), "Product created successfully", 201

  def get_products(self, page=1, per_page=10, sort_by='id', sort_order='asc', search='', gender_id=None, category_id=None):
    query = Product.query
    if search:
      query = query.filter(Product.name.contains(search) | Product.description.contains(search) | Product.code.contains(search))
    if gender_id:
      query = query.filter(Product.gender_id == gender_id)
    if category_id:
      query = query.filter(Product.category_id == category_id)

    if sort_order == 'asc':
      query = query.order_by(getattr(Product, sort_by).asc())
    else:
      query = query.order_by(getattr(Product, sort_by).desc())

    # Total items before pagination
    total_items = query.count()
    total_pages = (total_items + per_page - 1) // per_page  # Ceiling division

    # Pagination
    pagination_helper = PaginationHelper()
    products = pagination_helper.generate_pagination(page, per_page, query)

    # Metadata
    pagination_data = pagination_helper.get_pagination_data(page, per_page, total_items, total_pages)

    data = {
      "products": [product.to_json() for product in products],
      "pagination_data": pagination_data
    }

    return data, "Products retrieved successfully", 200
  
  def get_product_by_id(self, product_id):
    product = db.session.query(Product).filter(Product.id == product_id).first()
    if not product:
      return None, "Product with id {product_id} not found", 404
    return product.to_json(), "Product retrieved successfully", 200
  
  def update_product(self, product_id, name, code, description, release_date, gender_id, category_id):
    product = db.session.query(Product).filter(Product.id == product_id).first()
    if not product:
      return None, "Product with id {product_id} not found", 404
    product.name = name
    product.description = description
    product.code = code
    product.release_date = release_date
    product.gender_id = gender_id
    product.category_id = category_id
    db.session.commit()
    return product.to_json(), "Product updated successfully", 200
  
  def delete_product(self, product_id):
    product = db.session.query(Product).filter(Product.id == product_id).first()
    if not product:
      return None, "Product with id {product_id} not found", 404
    db.session.delete(product)
    db.session.commit()
    return product.to_json(), "Product deleted successfully", 200