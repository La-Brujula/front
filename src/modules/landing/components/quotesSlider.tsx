import ResponsiveCarousel from '@/shared/layout/carusel';

import quotes from '@shared/constants/quotes.json';
import { Container } from '@shared/layout/container';

// requires a loader
import QuoteSlide from './quoteSlide';

function QuotesSlider() {
  return (
    <Container>
      <ResponsiveCarousel>
        {quotes
          .sort(() => Math.random() - 0.5)
          .map((quote) => (
            <QuoteSlide
              key={quote.name}
              imageUrl={quote.imageUrl}
              name={quote.name}
              quote={quote.quote}
              title={quote.title}
            />
          ))}
      </ResponsiveCarousel>
    </Container>
  );
}

export default QuotesSlider;
