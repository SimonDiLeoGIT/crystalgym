import { Gender } from '../interfaces/GenderInterfaces';
import { HttpResponse } from '../interfaces/HttpResponseInterface';
import ApiService from './api.service';

export default class GenderService {
  
  static async getGenders() {
    const response = await ApiService.makeRequest<HttpResponse<Gender[]>>('/genders');
    return response;
  }
}