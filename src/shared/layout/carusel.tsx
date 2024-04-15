import { ReactChild } from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

function Carousel(props: { children: ReactChild[]; noBackground?: boolean }) {
  const { children, noBackground } = props;
  return (
    <div
      className={[
        noBackground || 'bg-[linear-gradient(180deg,_#fff0_80%,_#2d7bbf_80%)]',
        'flex items-center justify-center overflow-hidden',
      ].join(' ')}
    >
      <ResponsiveCarousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        axis="horizontal"
        // dynamicHeight={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        stopOnHover={true}
      >
        {children}
      </ResponsiveCarousel>
    </div>
  );
}

export default Carousel;
