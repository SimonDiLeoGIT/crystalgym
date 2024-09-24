from app.utils.singletonMeta import SingletonMeta

class PaginationHelper(metaclass=SingletonMeta):

    def generate_pagination(self, page, page_size, query):
        offset = (page - 1) * page_size
        return query.offset(offset).limit(page_size).all()

    def get_pagination_data(self, page, page_size, total_items, total_pages):
        return {
            'current_page': page,
            'total_items': total_items,
            'page_size': page_size,
            'total_pages': total_pages,
            'next_page': page + 1 if page < total_pages else None,
            'prev_page': page - 1 if page > 1 else None,
            'has_next': page < total_pages,
            'has_prev': page > 1
        }