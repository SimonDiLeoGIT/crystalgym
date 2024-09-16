import { CategoryInterface, PaginatedCategoriesInterface } from '../interfaces/CategoryInterfaces';
import ApiService from './api.service';

export default class CategoryService {
  static async getCategories(): Promise<CategoryInterface> {
    const response = await ApiService.makeRequest('/categories');
    return response;
  }


  static async getPaginatedCategories(page: number, perPage: number = 10): Promise<PaginatedCategoriesInterface> {
    const response = await ApiService.makeRequest(`/categories/admin/${page}/${perPage}`);
    return response;
  }

  static async updateCategory(id: number, name: string): Promise<PaginatedCategoriesInterface> {
    const response = await ApiService.makeRequest(`/category/admin`, 'PUT', { 'id_type':id, 'name':name });
    return response;
  }

  static async createCategory(name: string): Promise<PaginatedCategoriesInterface> {
    const response = await ApiService.makeRequest(`/category/admin`, 'POST', {'name':name });
    return response;
  }
}