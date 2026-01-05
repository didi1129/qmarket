export type SortOption = "updated_at" | "price";
export type SortOrder = "asc" | "desc";

export interface FilterParams {
  minPrice?: number;
  maxPrice?: number;
  sortBy: SortOption;
  sortOrder: SortOrder;
}
