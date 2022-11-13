import { Container } from '@shared/layout/container';
import Carusel from '@shared/layout/carusel';
import QuoteSlide from './quoteSlide';
import quotes from '@shared/constants/quotes.json';

function QuotesSlider() {
  return (
    <Container>
      <Carusel dotColor="bg-secondary">
        {quotes.map((quote, i) => (
          <QuoteSlide
            imageUrl={quote.imageUrl}
            name={quote.name}
            quote={quote.quote}
            key={i}
          />
        ))}
      </Carusel>
    </Container>
  );
}

export default QuotesSlider;
