import { Category } from '../interfaces/CategoryInterfaces';
import { HttpResponse } from '../interfaces/HttpResponseInterface';
import { ProductHttpResponse } from '../interfaces/ProductInterfaces';
import ApiService from './api.service';

export default class ProductService {
  
  static async getProducts(page: number = 1, perPage: number = 10, sortBy: string = 'id', sortOrder: string = 'asc', search: string = '') {
    const query = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      sort_by: sortBy,
      sort_order: sortOrder,
      search: search
    }).toString();
    const response = await ApiService.makeRequest<HttpResponse<ProductHttpResponse>>(`/roducts?${query}`);
    return response;
  }

  static async getCategoryById(id: number) {
    const response = await ApiService.makeRequest(`/categories/${id}`);
    return response;
  }

  static async postCategory(category: Category) {
    const response = await ApiService.makeRequest('/categories', 'POST', category);
    return response;
  }

  static async updateCategory(category: Category) {
    const response = await ApiService.makeRequest('/categories', 'PUT', category);
    return response;
  }

  static async deleteCategory(id: number) {
    const response = await ApiService.makeRequest(`/categories/${id}`, 'DELETE');
    return response;
  }

}