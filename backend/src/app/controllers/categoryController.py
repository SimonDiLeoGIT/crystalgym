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

@type_bp.route("/category/admin", methods=["POST"])
@jwt_required()
def create_category():
  data = type_service.create_type(request.json['name'], request.json['description'])
  if data[0] is None:
    return ResponseHandler().create_error_response('Error', data[1], data[2])
  return ResponseHandler().create_response('success', data[1], data[0], code=data[2])


@type_bp.route("/categories", methods=["GET"])
def get_categories():
  data = type_service.get_categories()
  if data[0] is None:
    return ResponseHandler().create_error_response('Error', data[1], data[2])
  return ResponseHandler().create_response('success', data[1], data[0], code=data[2])


@type_bp.route("/categories/admin", methods=["GET"])
def get_paginated_categories():
  page = request.args.get('page', default=1, type=int)
  page_size = request.args.get('page_size', default=10, type=int)
  sort_by = request.args.get('sort_by', default='id', type=str)
  sort_order = request.args.get('sort_order', default='asc', type=str)
  name = request.args.get('name', default='', type=str)
  data = type_service.get_paginated_categories(page, page_size, sort_by, sort_order, name)
  if data[0] is None:
    return ResponseHandler().create_error_response('Error', data[1], data[2])
  return ResponseHandler().create_response('success', data[1], data[0], code=data[2])


@type_bp.route("/category/admin", methods=["PUT"])
@jwt_required()
def update_type():
  data = type_service.update_type(request.json['id_type'], request.json['name'], request.json['description'])
  if data[0] is None:
    return ResponseHandler().create_error_response('Error', data[1], data[2])
  return ResponseHandler().create_response('success', data[1], data[0], code=data[2])

@type_bp.route("/category/admin", methods=["DELETE"])
@jwt_required()
def delete_type():
  data = type_service.delete_type(request.json['id'])
  if data[0] is None:
    return ResponseHandler().create_error_response('Error', data[1], data[2])
  return ResponseHandler().create_response('success', data[1], data[0], code=data[2])