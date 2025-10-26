// Pricing Option constants as specified in requirements
export const PricingOption = {
  PAID: 0,
  FREE: 1,
  VIEW_ONLY: 2,
} as const;

export type PricingOption = typeof PricingOption[keyof typeof PricingOption];

// API Response types
export interface StoreItem {
  id: string;
  creator: string;
  title: string;
  pricingOption: PricingOption;
  imagePath: string;
  price: number;
}

// Filter and Search types
export interface FilterState {
  pricingOptions: PricingOption[];
  keyword: string;
  priceRange: [number, number];
  sortBy: SortOption;
}

export const SortOption = {
  ITEM_NAME: 'itemName',
  HIGHER_PRICE: 'higherPrice',
  LOWER_PRICE: 'lowerPrice',
} as const;

export type SortOption = typeof SortOption[keyof typeof SortOption];

// API Request types
export interface FetchStoreItemsParams {
  page?: number;
  limit?: number;
  filters?: Partial<FilterState>;
}

// UI State types
export interface UIState {
  isLoading: boolean;
  hasMore: boolean;
  currentPage: number;
}
