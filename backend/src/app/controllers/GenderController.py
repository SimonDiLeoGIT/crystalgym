from flask import Blueprint, request
# import services
# import utils
from app.utils.responseHandler import ResponseHandler
from app.repositories.GenderRepository import GenderRepository



gender_bp = Blueprint("gender_bp", __name__)

@gender_bp.route("/genders", methods=["POST"])
def create_gender():
  data, message, code = GenderRepository().create_gender(request.json['name'], request.json['description'])
  if data is None:
    return ResponseHandler().create_error_response(message=message, code=code)
  return ResponseHandler().create_response(data=data, message=message, code=code)

@gender_bp.route("/genders", methods=["GET"])
def get_genders():
  data, message, code = GenderRepository().get_genders()
  if data is None:
    return ResponseHandler().create_error_response(message=message, code=code)
  return ResponseHandler().create_response(data=data, message=message, code=code)

