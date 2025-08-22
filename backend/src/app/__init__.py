from flask import Flask
from config import Config, TestingConfig
from extensions import db, migrate, jwt, cors

# Importar modelos
from app.models.color import Color
from app.models.gender import Gender
from app.models.category import Category
from app.models.product import Product
from app.models.variant import Variant
from app.models.user import User
from app.models.image import Image
from app.models.role import Role

def create_app(config_class=Config):
    app = Flask(__name__)

    if config_class == 'testing':
        app.config.from_object(TestingConfig)
    else:
        app.config.from_object(Config)

    # Inicializar extensiones
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

    # Registrar blueprints
    from app.controllers.clotheController import clothe_bp
    from app.controllers.UserController import user_bp
    from app.controllers.authController import auth_bp
    from app.controllers.colorController import color_bp
    from app.controllers.genderController import gender_bp
    from app.controllers.CategoryController import category_bp
    from app.controllers.ProductController import product_bp

    app.register_blueprint(clothe_bp, url_prefix="/api")
    app.register_blueprint(user_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(color_bp, url_prefix="/api")
    app.register_blueprint(gender_bp, url_prefix="/api")
    app.register_blueprint(category_bp, url_prefix="/api")
    app.register_blueprint(product_bp, url_prefix="/api")

    return app
