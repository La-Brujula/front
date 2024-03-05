import quotes from '@shared/constants/quotes.json';
import { Container } from '@shared/layout/container';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import QuoteSlide from './quoteSlide';

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
        {quotes.map((quote) => (
          <QuoteSlide
            key={quote.name}
            imageUrl={quote.imageUrl}
            name={quote.name}
            quote={quote.quote}
            title={quote.title}
          />
        ))}
      </Carousel>
    </Container>
  );
}

export default QuotesSlider;
