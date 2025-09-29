export interface PaginationInterface {
  current_page: number,
  has_next: number,
  has_prev: number,
  next_page: number,
  page_size: number,
  prev_page: number,
  total_items: number,
  total_pages: number
}