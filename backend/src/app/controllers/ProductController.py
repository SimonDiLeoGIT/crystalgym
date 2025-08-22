from flask import Blueprint, request
from flask_jwt_extended import jwt_required
# import utils
from app.utils.responseHandler import ResponseHandler
from app.repositories.ProductRepository import ProductRepository
from app.utils.pagination import PaginationHelper

from datetime import datetime
from app import Config as config


product_bp = Blueprint("product_bp", __name__)

product_repository = ProductRepository()
pagination_helper = PaginationHelper()

@product_bp.route("/products", methods=["POST"])
# @jwt_required()
def create_product():
  if 'name' not in request.json or not request.json['name']:
    return ResponseHandler().create_error_response('Name param is required', 400)
  if 'code' not in request.json or not request.json['code']:
    return ResponseHandler().create_error_response('Code param is required', 400)
  if 'category_id' not in request.json or not request.json['category_id']:
    return ResponseHandler().create_error_response('Category param is required', 400)
  if 'gender_id' not in request.json or not request.json['gender_id']:
    return ResponseHandler().create_error_response('Gender param is required', 400)
  if 'release_date' not in request.json or not request.json['release_date']:
    release_date = datetime.today().date()
  else:
    release_date = datetime.strptime(request.json['release_date'], "%Y-%m-%d").date()

  data, message, code = product_repository.create_product(request.json['name'], request.json['code'], request.json['description'], release_date, request.json['gender_id'], request.json['category_id'])
  
  if data is None:
    return ResponseHandler().create_error_response(message=message, code=code)
  return ResponseHandler().create_response(data, message=message, code=code)

@product_bp.route("/products", methods=["GET"])
def get_products():
  # @jwt_required()
  page = request.args.get("page", default=1, type=int)
  per_page = request.args.get("per_page", default=10, type=int)
  sort_by = request.args.get("sort_by", default="id", type=str)
  sort_order = request.args.get("sort_order", default="asc", type=str)
  search = request.args.get("search", default="", type=str)
  data, message, code = product_repository.get_products(page, per_page, sort_by, sort_order, search)
  if data is None:
    return ResponseHandler().create_error_response(message=message, code=code)
  return ResponseHandler().create_response(data=data, message=message, code=code)

@product_bp.route("/products/<int:product_id>", methods=["GET"])
# @jwt_required()
def get_product_by_id(product_id):
  data, message, code = product_repository.get_product_by_id(product_id)
  if data is None:
    return ResponseHandler().create_error_response(message=message, code=code)
  return ResponseHandler().create_response(data=data, message=message, code=code)

@product_bp.route("/products", methods=["PUT"])
# @jwt_required()
def update_category():
  if ('name' not in request.json or not request.json['name']):
    return ResponseHandler().create_error_response('Name param is required', 400)
  data, message, code = product_repository.update_category(request.json['id'], request.json['name'], request.json['description'])
  if data is None:
    return ResponseHandler().create_error_response(message=message, code=code)
  return ResponseHandler().create_response(data=data, message=message, code=code)

@product_bp.route("/products/<int:category_id>", methods=["DELETE"])
# @jwt_required()
def delete_category(category_id):
  data, message, code = product_repository.delete_category(category_id)
  if data is None:
    return ResponseHandler().create_error_response(message=message, code=code)
  return ResponseHandler().create_response(data=data, message=message, code=code)