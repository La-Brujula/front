import { Trans, useTranslation } from 'react-i18next';

// name
// t("quotes:Avelino Rodríguez")
// t("quotes:Rosa Adela López Zuckermann")
// t("quotes:Annmarie Meier")
// t("quotes:Luis Chávez")
// t("quotes:Inti Cordera")

// quote
// t("quotes:Avelino RodríguezQuote")
// t("quotes:Rosa Adela López ZuckermannQuote")
// t("quotes:Annmarie MeierQuote")
// t("quotes:Luis ChávezQuote")
// t("quotes:Inti CorderaQuote")

// title
// t("quotes:Director de Thelift y Presidente de CANACINE")
// t("quotes:Casa Productora ROSA MEDIA")
// t("quotes:Crítica y Académica")
// t("quotes:Business Development Manager & Brand Ambassador @ Kino Flo Systems")
// t("quotes:Director ejecutivo DocsMX")

function QuoteSlide({
  imageUrl,
  name,
  quote,
  title,
}: {
  imageUrl: string;
  name: string;
  quote: string;
  title: string;
}) {
  const { t } = useTranslation('quotes');

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]
      grid-rows-[min-content_1fr] lg:grid-rows-1 gap-2 lg:gap-8 max-w-4xl
      mx-auto translate-x-[var(--carusel-animation)] items-center object-bottom lg:object-center
      transition-transform duration-400 py-8 h-full"
    >
      <img
        src={`${import.meta.env.BASE_URL}img${imageUrl}`}
        className="w-1/2 fit-content rounded-md h-auto object-contain
        object-bottom lg:object-center max-h-[24rem]"
      />
      <div className="relative text-primary w-full text-left">
        <h3 className="font-bold text-lg">{t(name)}</h3>
        <p className="font-normal text-sm mb-8 ">{t(title)}</p>
        <p className="grow">
          <Trans
            i18nKey={name + 'Quote'}
            t={t}
          >
            {quote}
          </Trans>
        </p>
      </div>
    </div>
  );
}

export default QuoteSlide;
