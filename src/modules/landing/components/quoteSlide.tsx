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
    <div className="duration-400 mx-auto grid h-full max-w-4xl translate-x-[var(--carusel-animation)] grid-cols-1 grid-rows-[min-content_1fr] items-center justify-center justify-items-center gap-2 object-bottom py-8 text-center transition-transform lg:grid-cols-[2fr_3fr] lg:grid-rows-1 lg:gap-8 lg:object-center">
      <img
        src={`${import.meta.env.BASE_URL}img${imageUrl}`}
        className="fit-content h-auto max-h-[24rem] w-1/2 rounded-md object-contain object-bottom lg:object-center"
      />
      <div className="relative w-full text-left text-primary">
        <h3 className="text-lg font-bold">{t(name)}</h3>
        <p className="mb-8 text-sm font-normal">{t(title)}</p>
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
