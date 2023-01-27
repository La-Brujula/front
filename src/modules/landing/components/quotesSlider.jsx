import { Container } from '@shared/layout/container';
import QuoteSlide from './quoteSlide';
import quotes from '@shared/constants/quotes.json';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

function QuotesSlider() {
  return (
    <Container>
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        axis="horizontal"
        infiniteLoop={true}
        autoPlay={true}
        interval={1000 * 17}
        stopOnHover={true}
      >
        {quotes.map((quote, i) => (
          <QuoteSlide
            imageUrl={quote.imageUrl}
            name={quote.name}
            quote={quote.quote}
            title={quote.title}
            key={i}
          />
        ))}
      </Carousel>
    </Container>
  );
}

export default QuotesSlider;
