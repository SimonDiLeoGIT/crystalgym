from flask import Blueprint, request
from flask_jwt_extended import jwt_required
# import services
from app.services.typeService import TypeService
# import utils
from app.utils.responseHandler import ResponseHandler
# import marshmallow
from app.services.imageService import ImageService

from app import Config as config


type_service = TypeService()

type_bp = Blueprint("type_bp", __name__)


@type_bp.route("/categories", methods=["GET"])
def get_categories():
  data = type_service.get_categories()
  if data[0] is None:
    return ResponseHandler().create_error_response('Error', data[1], data[2])
  return ResponseHandler().create_response('success', data[1], data[0], code=data[2])


@type_bp.route("/categories/admin/<int:page>/<int:page_size>", methods=["GET"])
def get_paginated_categories(page=1, page_size=10):
  data = type_service.get_paginated_categories(page, page_size)
  if data[0] is None:
    return ResponseHandler().create_error_response('Error', data[1], data[2])
  return ResponseHandler().create_response('success', data[1], data[0], code=data[2])


@type_bp.route("/categories/admin", methods=["PUT"])
@jwt_required()
def update_type():
  data = type_service.update_type(request.json['id_type'], request.json['name'])
  if data[0] is None:
    return ResponseHandler().create_error_response('Error', data[1], data[2])
  return ResponseHandler().create_response('success', data[1], data[0], code=data[2])