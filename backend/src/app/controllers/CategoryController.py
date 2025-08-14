from flask import Blueprint, request
from flask_jwt_extended import jwt_required
# import utils
from app.utils.responseHandler import ResponseHandler
from app.repositories.CategoryRepository import CategoryRepository

from app import Config as config


category_bp = Blueprint("category_bp", __name__)

category_repository = CategoryRepository()

@category_bp.route("/categories", methods=["POST"])
# @jwt_required()
def create_category():
  data = category_repository.create_category(request.json['name'], request.json['description'])
  if data[0] is None:
    return ResponseHandler().create_error_response(data[1], data[2])
  return ResponseHandler().create_response(data[0].to_json(), message=data[1], code=data[2])


# @category_bp.route("/categories", methods=["GET"])
# def get_categories():
#   data = type_service.get_categories()
#   if data[0] is None:
#     return ResponseHandler().create_error_response('Error', data[1], data[2])
#   return ResponseHandler().create_response('success', data[1], data[0], code=data[2])


# @category_bp.route("/categories/admin", methods=["GET"])
# def get_paginated_categories():
#   page = request.args.get('page', default=1, type=int)
#   page_size = request.args.get('page_size', default=10, type=int)
#   sort_by = request.args.get('sort_by', default='id', type=str)
#   sort_order = request.args.get('sort_order', default='asc', type=str)
#   name = request.args.get('name', default='', type=str)
#   data = type_service.get_paginated_categories(page, page_size, sort_by, sort_order, name)
#   if data[0] is None:
#     return ResponseHandler().create_error_response('Error', data[1], data[2])
#   return ResponseHandler().create_response('success', data[1], data[0], code=data[2])


# @category_bp.route("/category/admin", methods=["PUT"])
# @jwt_required()
# def update_type():
#   data = type_service.update_type(request.json['id_type'], request.json['name'], request.json['description'])
#   if data[0] is None:
#     return ResponseHandler().create_error_response('Error', data[1], data[2])
#   return ResponseHandler().create_response('success', data[1], data[0], code=data[2])

# @category_bp.route("/category/admin", methods=["DELETE"])
# @jwt_required()
# def delete_type():
#   data = type_service.delete_type(request.json['id'])
#   if data[0] is None:
#     return ResponseHandler().create_error_response('Error', data[1], data[2])
#   return ResponseHandler().create_response('success', data[1], data[0], code=data[2])