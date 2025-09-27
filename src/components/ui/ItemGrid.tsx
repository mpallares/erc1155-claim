import React from 'react';

interface ItemGridProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export function ItemGrid<T>({
  title,
  items,
  renderItem,
  className = ''
}: ItemGridProps<T>) {
  return (
    <div className={`w-full ${className}`}>
      <section className='w-full flex flex-col gap-4'>
        <h2 className='text-lg font-semibold text-dark leading-7'>
          {title}
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {items.map((item, index) => renderItem(item, index))}
        </div>
      </section>
    </div>
  );
}