import { CategoryDataInterface, CategoryInterface, PaginatedCategoriesInterface } from '../interfaces/CategoryInterfaces';
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

  static async updateCategory(category: CategoryDataInterface): Promise<PaginatedCategoriesInterface> {
    const response = await ApiService.makeRequest(`/category/admin`, 'PUT', { 'id_type':category.id, 'name':category.name, 'description':category.description });
    return response;
  }

  static async createCategory(category: CategoryDataInterface): Promise<PaginatedCategoriesInterface> {
    const response = await ApiService.makeRequest(`/category/admin`, 'POST', {'name': category.name, 'description': category.description });
    return response;
  }
}