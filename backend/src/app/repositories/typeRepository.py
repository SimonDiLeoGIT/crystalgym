from app import db
from app.models.type import Type
from app.utils.pagination import PaginationHelper

class TypeRepository:

  def __init__(self):
    self.pagination = PaginationHelper()

  def create_type(self, name, description):
    category = Type(name=name, description=description)
    db.session.add(category)
    db.session.commit()
    return category

  def get_types(self):
    types = db.session.query(Type).all()
    return types
  
  def get_types_by_id(self, id_type):
    category = db.session.query(Type).filter(Type.id == id_type).first()
    return category
  
  def get_paginated_types(self, page, page_size, sort_by, sort_order, name):
    page = int(page)
    page_size = int(page_size)

    if page < 1:
      return None

    if page_size < 1:
      page_size = 1

    query = Type.query


    if sort_order == 'asc':
        query = query.order_by(getattr(Type, sort_by).asc())
    else:
        query = query.order_by(getattr(Type, sort_by).desc())

    if name:
      query = query.filter(Type.name.ilike(f'%{name}%'))

    total_items = query.count()

    if (total_items == 0):
      total_pages = 1
    else:
      total_pages = (total_items + page_size - 1) // page_size

    if page > total_pages:
        page = total_pages

    types = self.pagination.generate_pagination(page, page_size, query)

    pagination_data = self.pagination.get_pagination_data(page, page_size, total_items, total_pages)

    response = {
        'categories': [type.to_json() for type in types],
        'pagination': pagination_data
    }

    return response

  def update_type(self, id_type, name, description):
    if not db.session.query(Type).filter(Type.id == id_type).first():
      return None
    category = db.session.query(Type).filter(Type.id == id_type).first()
    category.name = name
    category.description = description
    db.session.commit()
    return category