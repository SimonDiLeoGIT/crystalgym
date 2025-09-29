import { CategoriesByGender, Category } from '../interfaces/CategoryInterfaces';
import { HttpResponse } from '../interfaces/HttpResponseInterface';
import ApiService from './api.service';

export default class CategoryService {
  
  static async getCategories() {
    const response = await ApiService.makeRequest<HttpResponse<Category[]>>('/categories/');
    return response;
  }

  static async getCategoriesByGender() {
    const response = await ApiService.makeRequest<HttpResponse<CategoriesByGender>>('/categories-by-gender/');
    return response;
  }
 
}