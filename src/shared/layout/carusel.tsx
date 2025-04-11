import { Children, ReactNode } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

function ResponsiveCarousel(props: {
  children: ReactNode;
  noBackground?: boolean;
}) {
  const { children, noBackground } = props;
  return (
    <div
      className={[
        noBackground || 'bg-transparent',
        'flex items-center justify-center overflow-hidden p-8 px-16',
      ].join(' ')}
    >
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {Children.map(children, (child) => (
            <CarouselItem>{child}</CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  );
}

export default ResponsiveCarousel;
