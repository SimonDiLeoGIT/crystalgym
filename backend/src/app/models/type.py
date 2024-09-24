from app import db

class Type(db.Model):
  __tablename__ = "types"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(255), nullable=True)

  def __init__(self, name, description):
    self.name = name
    self.descripcion = description

  def to_json(self):
    return {
      "id": self.id,
      "name": self.name,
      "description": self.description
    }