import { Category, CategoryHttpResponse } from '../interfaces/CategoryInterfaces';
import { HttpResponse } from '../interfaces/HttpResponseInterface';
import ApiService from './api.service';

export default class CategoryService {
  
  static async getCategories(page: number = 1, perPage: number = 10, sortBy: string = 'id', sortOrder: string = 'asc', search: string = '') {
    const query = new URLSearchParams({
      page: page.toString(),
      page_size: perPage.toString(),
      sort_by: sortBy,
      sort_order: sortOrder,
      search: search
    }).toString();
    const response = await ApiService.makeRequest<HttpResponse<CategoryHttpResponse>>(`/categories?${query}`);
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

}