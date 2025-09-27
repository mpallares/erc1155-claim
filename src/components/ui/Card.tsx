import Image from 'next/image';
import React from 'react';

interface CardProps {
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function Card({
  image,
  imageAlt,
  title,
  subtitle,
  href,
  onClick,
  className = ''
}: CardProps) {
  const baseClasses = 'w-[280px] bg-white flex flex-col gap-2';

  return (
    <div className={`${baseClasses} ${className}`} onClick={onClick}>
      <div className='aspect-square relative'>
        <Image
          src={image}
          alt={imageAlt}
          fill
          className='object-cover'
        />
      </div>
      <div>
        <h3 className='font-semibold text-dark text-md leading-6'>
          {title}
        </h3>
        <p className='text-gray-500 text-sm leading-5 font-normal'>
          {subtitle}
        </p>
      </div>
    </div>
  );
}