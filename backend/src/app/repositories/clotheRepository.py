from app import db
from app.models.clothe import Clothe
from app.models.type import Type
from app.models.clothe_color import ClotheColor
from app.models.color import Color
from app.models.gender import Gender

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
    
    def get_clothes_by_category(self, id_type, page=1, page_size=10, sort_by='id', sort_order=None, name=None):
        
        if page < 1:
            return None

        if page_size < 1:
            page_size = 1


        query = db.session.query(
            Clothe,
            Type.name.label('type_name'),
            Gender.name.label('gender_name')
        ).join(Type, Clothe.id_type == Type.id) \
         .join(ClotheColor, Clothe.id == ClotheColor.id_clothe) \
         .join(Gender, Clothe.id_gender == Gender.id) \
         .filter(Clothe.id_type == id_type)
        
        color_query = db.session.query(
            ClotheColor,
            Color.name.label('color_name')
        ).filter(ClotheColor.id_clothe == Clothe.id).join(Color, ClotheColor.id_color == Color.id)


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
            'color': color_name
        } for clothe, type_name, color_name, gender_name in clothes]
        male_clothes = [clothe for clothe in clothes if clothe['gender'] == 'M']
        female_clothes = [clothe for clothe in clothes if clothe['gender'] == 'W']

        all_clothes = {
            'men': male_clothes,
            'women': female_clothes
        }
        response = {
            'category': id_type,
            'clothes': all_clothes,
            'pagination': pagination_data
        }
    
        return response

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
