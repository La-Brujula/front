import { Container } from '@shared/layout/container';
import Carusel from '@shared/layout/carusel';
import QuoteSlide from './quoteSlide';

function QuotesSlider() {
  return (
    <Container>
      <Carusel dotColor="bg-secondary">
        <QuoteSlide
          imageUrl="https://images.unsplash.com/photo-1504022462188-88f023db97bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          name="Yalitza Aparicio"
          quote={`La Brújula es la guía más especializada en el medio que hay en el mercado,
          solo si buscas lo mejor lo encontrarás allí, yo como especialista la uso porque
          me ahorra mucho tiempo, recomiendo ampliamente que la usen si buscan contactarse
          con personas de prestigiado renombre, también está diseñada para que sea accesible
          y encuentres fácilmente a quien buscas. Las actualizaciones son constantemente
          renovadas y esto en un mundo que se mueve tan rápido hace una gran diferencia ya
          que no pierdes el tiempo buscando algún contacto y lo mejor te pueden encontrar
          fácilmente a ti`}
        />
        <QuoteSlide
          imageUrl="https://images.unsplash.com/photo-1522669830117-58a450cc6077?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
          name="Yalitza Aparicio 2"
          quote={`La Brújula es la guía más especializada en el medio que hay en el mercado,
          solo si buscas lo mejor lo encontrarás allí, yo como especialista la uso porque
          me ahorra mucho tiempo, recomiendo ampliamente que la usen si buscan contactarse
          con personas de prestigiado renombre, también está diseñada para que sea accesible
          y encuentres fácilmente a quien buscas. Las actualizaciones son constantemente
          renovadas y esto en un mundo que se mueve tan rápido hace una gran diferencia ya
          que no pierdes el tiempo buscando algún contacto y lo mejor te pueden encontrar
          fácilmente a ti`}
        />
      </Carusel>
    </Container>
  );
}

export default QuotesSlider;
