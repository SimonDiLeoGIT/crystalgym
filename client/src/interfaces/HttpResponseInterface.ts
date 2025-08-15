export interface HttpResponse<T> {
  data: T;
  status_code: number;
  message: string;
  success: boolean;
}