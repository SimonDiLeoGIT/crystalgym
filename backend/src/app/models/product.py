from app import db

class Product(db.Model):
  __tablename__ = "products"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  code = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(255), nullable=False)
  release_date = db.Column(db.Date, nullable=False)
  category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
  gender_id = db.Column(db.Integer, db.ForeignKey('genders.id'), nullable=False)
  
  def __init__(self, name, code, description, release_date, gender_id, category_id):
    self.name = name
    self.code = code
    self.description = description
    self.release_date = release_date
    self.category_id = category_id
    self.gender_id = gender_id

  def to_json(self):
    return {
        'id': self.id,
        'name': self.name,
        'code': self.code,
        'description': self.description,
        'release_date': self.release_date,
        'category_id': self.category_id,
        'gender_id': self.gender_id,
      }