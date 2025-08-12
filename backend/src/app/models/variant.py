from app import db

class Variant(db.Model):
  __tablename__ = "variants"
  id = db.Column(db.Integer, primary_key=True)
  size = db.Column(db.String(1), nullable=False)
  price = db.Column(db.Double, nullable=False)
  stock = db.Column(db.Integer, nullable=False)
  product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
  color_id = db.Column(db.Integer, db.ForeignKey('colors.id'), nullable=False)
  
  def __init__(self, product_id, color_id, size, price, stock):
    self.product_id = product_id
    self.color_id = color_id
    self.size = size
    self.price = price
    self.stock = stock

  def to_json(self):
    return {
        'id': self.id,
        'product_id': self.product_id,
        'color_id': self.color_id,
        'size': self.size,
        'price': self.price,
        'stock': self.stock
      }