from app import db
from app.models.gender import Gender

class GenderRepository:

  def get_gender_by_id(self, id_gender):
    return db.session.query(Gender).filter(Gender.id == id_gender).first()
  
  def get_gender_by_name(self, gender):
    return db.session.query(Gender).filter(Gender.name == gender).first()

  def get_genders(self):
    genders = db.session.query(Gender).all()
    if not genders:
      return None, "Gender not found", 404
    return [gender.to_json() for gender in genders], "Genders retrieved successfully", 200

  def create_gender(self, name):
    gender = db.session.query(Gender).filter(Gender.name == name).first()
    if gender:
      return None, f"Gender with name {name} already exists", 409
    gender = Gender(name)
    db.session.add(gender)
    db.session.commit()
    return gender.to_json(), "Gender created successfully", 201