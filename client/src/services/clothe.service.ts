import { ClotheInterface, ClothesResponse } from '../interfaces/ClothesInterfaces';
import { ErrorInterface } from '../interfaces/ErrorInterface';
import ApiService from './api.service';
import AuthService from './auth.service';

export default class ClotheService {
  // static async getClothes(): Promise<ClotheDataInterface> {
  //   const response = await ApiService.makeRequest('/clothes');
  //   return response;
  // }

  static async postClothe(clothe: FormData): Promise<ClotheInterface> {
    try {
      const response = await ApiService.makeRequest('/clothe', 'POST', clothe);
      return response;
    } catch (error) {
      const apiError = error as ErrorInterface;
      if (apiError.code === 401) {
        console.log('Refreshing access token...');
        try {
          await AuthService.refreshAccessToken();
          const response = await ApiService.makeRequest('/clothe', 'POST', clothe);
          return response;
        } catch (refreshError) {
          console.error('Error refreshing access token:', refreshError);
          throw refreshError ;
        }
      }
      throw error;
    }
  }

  static async getClothes(id_category: number, id_gender?: number, page?: number, perPage?: number, sortBy?: string, sortOrder?: string, name?: string): Promise<ClothesResponse> {
    const params: { [key: string]: string } = {
      id_category: id_category.toString(),
    };

    page && (params.page = page.toString())
    perPage && (params.page_size = perPage.toString())
    sortBy && (params.sort_by = sortBy)
    sortOrder && (params.sort_order = sortOrder)
    name && (params.name = name)
    id_gender && id_gender !== 3 && (params.id_gender = id_gender.toString())

    const query = new URLSearchParams(params).toString();
    const response = await ApiService.makeRequest(`/admin/clothes?${query}`);
    return response;
  }
}