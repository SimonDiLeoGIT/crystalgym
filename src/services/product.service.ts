import { HttpResponse } from '../interfaces/HttpResponseInterface';
import { Product } from '../interfaces/ProductInterfaces';
import { Variants } from '../interfaces/VariantInterfaces';
import ApiService from './api.service';

export default class ProductService {
  
  static async getAll(page:number = 0) {
    const response = await ApiService.makeRequest<HttpResponse<Product[]>>(`/products/${page ? `?page=${page}` : ''}`);
    return response;
  }
  
  // static async getAllVariants(page:number = 0) {
  //   const response = await ApiService.makeRequest<HttpResponse<Variants[]>>(`/variants/${page ? `?page=${page}` : ''}`);
  //   return response;
  // }
  
  static async getVariantsByCategoryAndGender(page:number = 0, genderId:string, categoryId:string,) {
    const response = await ApiService.makeRequest<HttpResponse<Variants>>(`/variants/${genderId}/${categoryId}${page ? `?page=${page}` : ''}`);
    return response;
  }
  
  // static async getProducts(page: number = 1, perPage: number = 10, sortBy: string = 'id', sortOrder: string = 'asc', search: string = '') {
  //   const query = new URLSearchParams({
  //     page: page.toString(),
  //     per_page: perPage.toString(),
  //     sort_by: sortBy,
  //     sort_order: sortOrder,
  //     search: search
  //   }).toString();
  //   const response = await ApiService.makeRequest<HttpResponse<ProductHttpResponse>>(`/products?${query}`);
  //   return response;
  // }

  static async getProductById(id: number) {
    const response = await ApiService.makeRequest(`/products/${id}`);
    return response;
  }

  static async postProduct(product: Product) {
    const response = await ApiService.makeRequest('/products', 'POST', product);
    return response;
  }

  static async updateProduct(product: Product) {
    const response = await ApiService.makeRequest('/products', 'PUT', product);
    return response;
  }

  static async deleteProduct(id: number) {
    const response = await ApiService.makeRequest(`/products/${id}`, 'DELETE');
    return response;
  }

}