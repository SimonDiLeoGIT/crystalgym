from flask import Blueprint, request
from flask_jwt_extended import jwt_required
# import utils
from app.utils.responseHandler import ResponseHandler
from app.repositories.CategoryRepository import CategoryRepository
from app.utils.pagination import PaginationHelper

from app import Config as config


category_bp = Blueprint("category_bp", __name__)

category_repository = CategoryRepository()
pagination_helper = PaginationHelper()

@category_bp.route("/categories", methods=["POST"])
# @jwt_required()
def create_category():
  if 'name' not in request.json or not request.json['name']:
    return ResponseHandler().create_error_response('Name param is required', 400)
  data, message, code = category_repository.create_category(request.json['name'], request.json['description'])
  if data is None:
    return ResponseHandler().create_error_response(message=message, code=code)
  return ResponseHandler().create_response(data, message=message, code=code)

@category_bp.route("/categories/all", methods=["GET"])
def get_all():
  # @jwt_required()
  data, message, code = category_repository.get_all()
  if data is None:
    return ResponseHandler().create_error_response(message=message, code=code)
  return ResponseHandler().create_response(data=data, message=message, code=code)

@category_bp.route("/categories", methods=["GET"])
def get_categories():
  # @jwt_required()
  page = request.args.get("page", default=1, type=int)
  per_page = request.args.get("per_page", default=10, type=int)
  sort_by = request.args.get("sort_by", default="id", type=str)
  sort_order = request.args.get("sort_order", default="asc", type=str)
  search = request.args.get("search", default="", type=str)
  data, message, code = category_repository.get_categories(page, per_page, sort_by, sort_order, search)
  if data is None:
    return ResponseHandler().create_error_response(message=message, code=code)
  return ResponseHandler().create_response(data=data, message=message, code=code)

@category_bp.route("/categories/<int:category_id>", methods=["GET"])
# @jwt_required()
def get_category_by_id(category_id):
  data, message, code = category_repository.get_category_by_id(category_id)
  if data is None:
    return ResponseHandler().create_error_response(message=message, code=code)
  return ResponseHandler().create_response(data=data, message=message, code=code)

@category_bp.route("/categories", methods=["PUT"])
# @jwt_required()
def update_category():
  if ('name' not in request.json or not request.json['name']):
    return ResponseHandler().create_error_response('Name param is required', 400)
  data, message, code = category_repository.update_category(request.json['id'], request.json['name'], request.json['description'])
  if data is None:
    return ResponseHandler().create_error_response(message=message, code=code)
  return ResponseHandler().create_response(data=data, message=message, code=code)

@category_bp.route("/categories/<int:category_id>", methods=["DELETE"])
# @jwt_required()
def delete_category(category_id):
  data, message, code = category_repository.delete_category(category_id)
  if data is None:
    return ResponseHandler().create_error_response(message=message, code=code)
  return ResponseHandler().create_response(data=data, message=message, code=code)

