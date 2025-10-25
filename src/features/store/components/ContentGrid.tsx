import React from 'react';
import { type StoreItem } from '../../../types/index';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';

interface ContentGridProps {
  items: StoreItem[];
  isLoading: boolean;
}

const ContentGrid: React.FC<ContentGridProps> = ({ items, isLoading }) => {
  const { ref, isLoading: infiniteLoading, hasMore } = useInfiniteScroll();
  
  // Debug: Log the number of items
  console.log('ContentGrid: Rendering', items.length, 'items');
  console.log('ContentGrid: Items:', items);
  
  // Test with hardcoded items if we have less than 4 items
  const testItems = items.length < 4 ? [
    ...items,
    ...Array.from({ length: 4 - items.length }, (_, i) => ({
      id: `test-${i}`,
      creator: 'Test Creator',
      title: `Test Item ${i + 1}`,
      pricingOption: 0,
      imagePath: 'https://via.placeholder.com/300x300/333/fff?text=Test',
      price: 25
    }))
  ] : items;
  const getPricingDisplay = (item: StoreItem) => {
    switch (item.pricingOption) {
      case 0: // PAID
        return `$${item.price.toFixed(2)}`;
      case 1: // FREE
        return 'FREE';
      case 2: // VIEW_ONLY
        return 'View Only';
      default:
        return 'View Only';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-dark-panel border border-accent-green rounded-lg p-6">
        <div className="flex items-center mb-6">
          <div className="w-3 h-3 bg-accent-green rounded-full mr-2"></div>
          <h2 className="text-lg font-semibold text-white">Contents List</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-700 animate-pulse"></div>
              <div className="p-4 bg-gray-800">
                <div className="h-4 bg-gray-600 rounded mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-600 rounded mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-600 rounded w-16 ml-auto animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-panel border border-accent-green rounded-lg p-6">
      <div className="flex items-center mb-6">
        <div className="w-3 h-3 bg-accent-green rounded-full mr-2"></div>
        <h2 className="text-lg font-semibold text-white">Contents List</h2>
      </div>
      
      {/* Grid Container - Force 4 columns on large screens */}
      <div 
        className="grid gap-6 w-full" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          maxWidth: '100%'
        }}
      >
        {testItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="bg-dark-bg rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-gray-800 flex items-center justify-center overflow-hidden">
              <img 
                src={item.imagePath} 
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-white font-medium mb-1 truncate">{item.title}</h3>
              <p className="text-gray-400 text-sm mb-2 truncate">{item.creator}</p>
              <div className="flex justify-end">
                <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">
                  {getPricingDisplay(item)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div ref={ref} className="flex justify-center py-8">
          {infiniteLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent-green"></div>
              <span className="text-gray-400">Loading more items...</span>
            </div>
          ) : (
            <div className="text-gray-400">Scroll down to load more</div>
          )}
        </div>
      )}
      
      {/* End of results */}
      {!hasMore && items.length > 0 && (
        <div className="flex justify-center py-8">
          <span className="text-gray-400">No more items to load</span>
        </div>
      )}
    </div>
  );
};

export default ContentGrid;
