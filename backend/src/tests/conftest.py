import pytest
from datetime import datetime
from app import create_app, db
from app.models.user import User
from app.models.role import Role
from app.models.color import Color
from app.models.category import Category
from app.models.gender import Gender

@pytest.fixture(scope='module')
def test_client():
    flask_app = create_app('testing')
    testing_client = flask_app.test_client()

    with flask_app.app_context():
        db.create_all()

        # Add roles
        roles = [
            {'name': 'admin', 'description': 'can add new clothes and new admins'},
            {'name': 'user', 'description': 'can buy clothes'}
        ]
        db.session.bulk_insert_mappings(Role, roles)
        db.session.commit()

        # # Add type (category)
        # category = Type(name='hoodie_test', description='hoodies_test')
        # db.session.add(category)
        # db.session.commit()

        # # Add gender
        # gender = Gender(name='M', description='male')
        # db.session.add(gender)
        # db.session.commit()

        # # Add color
        # color = Color(name='red')
        # db.session.add(color)
        # db.session.commit()

        # # Add clothe (now that type and gender exist)
        # clothe = Clothe(
        #     name='test_clothe',
        #     description='test_description',
        #     price=1,
        #     id_gender=gender.id,
        #     id_type=category.id,
        #     release_date=datetime.now()
        # )
        # db.session.add(clothe)
        # db.session.commit()

        # # Add clothe color
        # clothe_color = ClotheColor(
        #     id_clothe=clothe.id,
        #     id_color=color.id,
        #     stock=1
        # )
        # db.session.add(clothe_color)
        # db.session.commit()

        # # Optional: clean up users
        # User.query.delete()
        # db.session.commit()

        yield testing_client

        db.session.remove()
        db.drop_all()
