export interface ItemPriceChange {
  id: number;
  item_name: string;
  item_gender: string;
  log_date: string;
  change_rate: number;
  prev_price: number;
  cur_price: number;
  image: string | null;
  days_since_last_sale: number;
}

export type ChangeRateSortOrder = "default" | "desc" | "asc";
