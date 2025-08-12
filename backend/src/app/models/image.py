from app import db

class Image(db.Model):
  __tablename__ = "images"
  id = db.Column(db.Integer, primary_key=True)
  product_id = db.Column(db.Integer, db.ForeignKey('products.id', ondelete='CASCADE'), nullable=False)
  color_id = db.Column(db.Integer, db.ForeignKey('colors.id'), nullable=False)
  url = db.Column(db.String(255), nullable=False)
  name = db.Column(db.String(255), nullable=False)

  def __init__(self, product_id, color_id, url, name):
    self.product_id = product_id
    self.color_id = color_id
    self.url = url
    self.name = name

  def to_json(self):
    return {
      'id': self.id,
      'product_id': self.product_id,
      'color_id': self.color_id,
      'url': self.url,
      'name': self.name
    }