import pytest
from datetime import datetime
from app import create_app, db
from app.models.user import User
from app.models.role import Role
from app.models.color import Color
from app.models.type import Type
from app.models.gender import Gender
from app.models.clothe import Clothe
from app.models.clothe_color import ClotheColor

@pytest.fixture(scope='module')
def test_client():
    # Configura la aplicación y el cliente de prueba
    flask_app = create_app('testing')
    testing_client = flask_app.test_client()

    # Crea un contexto de aplicación para la configuración de la base de datos
    with flask_app.app_context():
        # Crea las tablas de la base de datos
        db.create_all()

        # Crea los roles necesarios
        roles = [
            {'name': 'admin', 'description': 'can add new clothes and new admins'},
            {'name': 'user', 'description': 'can buy clothes'}
        ]
        for role in roles:
            db.session.add(Role(**role))
        db.session.commit()

        # Crear un color de prueba
        color = {'name': 'red'}
        db.session.add(Color(**color))
        db.session.commit()

        clothe = {
            'name': 'test_clothe',
            'description': 'test_description',
            'price': 1,
            'id_gender': 1,
            'id_type': 1,
            'release_date': datetime.now()
        }

        db.session.add(Clothe(**clothe))
        db.session.commit()

        clothe_color = {
            'id_clothe': 1,
            'id_color': 1,
            'stock': 1
        }

        db.session.add(ClotheColor(**clothe_color))
        db.session.commit()

        # Crear una categoría de prueba
        category = {'name': 'hoodie_test', 'description': 'hoodies_test'}
        db.session.add(Type(**category))
        db.session.commit()

        # Crear un género de prueba
        gender = {'name': 'M', 'description': 'male'}
        db.session.add(Gender(**gender))
        db.session.commit()

        # Limpiar usuarios y otros datos si es necesario
        User.query.delete()
        db.session.commit()

        # Devuelve el cliente de prueba
        yield testing_client

        # Limpieza después de las pruebas
        db.session.remove()
        db.drop_all()
