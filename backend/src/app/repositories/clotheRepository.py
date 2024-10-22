from app import db
from app.models.clothe import Clothe
from app.models.type import Type
from app.models.clothe_color import ClotheColor
from app.models.color import Color
from app.models.gender import Gender
from app.models.image import Image

from app.utils.pagination import PaginationHelper

class ClotheRepository:
    def __init__(self):
        self.pagination = PaginationHelper()

    def save_clothe(self, name, description, price, release_date, id_gender, id_type):
        new_clothe = Clothe(name, description,  price, release_date, id_gender, id_type)
        db.session.add(new_clothe)
        db.session.commit()
        return new_clothe
    
    def get_clothe_by_id(self, id_clothe):
        return db.session.query(Clothe).filter(Clothe.id == id_clothe).first()
    
    def get_clothes_by_category(self, id_type, id_gender=None, page=1, page_size=10, sort_by='id', sort_order=None, name=None):
        
        if page < 1:
            return None

        if page_size < 1:
            page_size = 1


        query = db.session.query(
            Clothe,
            Type.id,
            Gender.name.label('gender_name'),
            Color.id
        ).join(Type, Clothe.id_type == Type.id) \
         .join(Gender, Clothe.id_gender == Gender.id) \
         .join(ClotheColor, Clothe.id == ClotheColor.id_clothe) \
         .join(Color, ClotheColor.id_color == Color.id) \
         .filter(Clothe.id_type == id_type)
        
        if id_gender is not None:
            query = query.filter(Clothe.id_gender == id_gender)

        query = self.pagination.filter_and_sort(query, Type, sort_by, sort_order, 'name', name)

        total_items = query.count()

        if (total_items == 0):
            return None
        else:
            total_pages = (total_items + page_size - 1) // page_size

        if page > total_pages:
            page = total_pages


        clothes = self.pagination.generate_pagination(page, page_size, query)

        pagination_data = self.pagination.get_pagination_data(page, page_size, total_items, total_pages)

        clothes = [{
            **clothe.to_json(),
            'gender': gender_name,
            'id_color': id_color
        } for clothe, type_id, gender_name, id_color in clothes]

        response = {
            'clothes': clothes,
            'pagination': pagination_data
        }
        return response
    
    def get_clothe_colors_by_id(self, id_clothe):
        return db.session.query(ClotheColor).filter(ClotheColor.id_clothe == id_clothe).join(Color, ClotheColor.id_color == Color.id).all()

    def get_clothe_images_by_id(self, id_clothe, id_color):
        return db.session.query(Image).filter(Image.id_clothe == id_clothe, Image.id_color == id_color).all()

    def get_clothes_by_category_gender(self, id_gender, id_type, page, page_size):
        page = int(page)
        page_size = int(page_size)

        if page < 1 or page_size < 1:
            raise ValueError("Page and page size must be positive integers.")

        clothes_query = db.session.query(
            Clothe,
            Type.name.label('type_name'),
            ClotheColor.id_color
        ).join(Type, Clothe.id_type == Type.id) \
         .join(ClotheColor, Clothe.id == ClotheColor.id_clothe) \
         .filter(Clothe.id_gender == id_gender, Clothe.id_type == id_type)
        

        clothes = self.pagination.generate_pagination(page, page_size, clothes_query)
        total_pages = (clothes_query.count() // page_size) + 1

        response = {
            'clothes': [clothe.to_json() for clothe, type_name, color_id in clothes],
            'category': clothes[0][1] if clothes else None,
            'total_pages': total_pages
        }
        
        return response
    
    def update_clothe(self, id_clothe, name, description, price):
        
        if not db.session.query(Clothe).filter(Clothe.id == id_clothe).first():
            return None

        updated_clothe = db.session.query(Clothe).filter(Clothe.id == id_clothe).first()
        updated_clothe.name = name
        updated_clothe.description = description
        updated_clothe.price = price
        db.session.commit()
        return updated_clothe
    
    def delete_clothe(self, id_clothe):
        if not db.session.query(Clothe).filter(Clothe.id == id_clothe).first():
            return None
        db.session.query(Clothe).filter(Clothe.id == id_clothe).delete()
        db.session.commit()
        return True
