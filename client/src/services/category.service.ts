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

  static async updateCategories(id: number, name: string): Promise<PaginatedCategoriesInterface> {
    const response = await ApiService.makeRequest(`/categories/admin`, 'PUT', { 'id_type':id, 'name':name });
    return response;
  }
}