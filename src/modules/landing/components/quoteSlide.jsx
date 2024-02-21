function QuoteSlide({ imageUrl, name, quote, title }) {
  return (
    <div
      className="grid grid-cols-1  lg:grid-cols-[2fr_3fr]
      grid-rows-[min-content_1fr] lg:grid-rows-1 gap-2 lg:gap-8 max-w-4xl
      mx-auto translate-x-[var(--carusel-animation)] items-center object-bottom lg:object-center
      transition-transform duration-400 py-8 h-full"
    >
      <img
        src={`${import.meta.env.BASE_URL}${imageUrl}`}
        className="w-1/2 fit-content rounded-md h-auto object-contain
        object-bottom lg:object-center max-h-[24rem]"
      />
      <div className="relative text-primary w-full text-left">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="font-normal text-sm mb-8 ">{title}</p>
        <p className="grow">{quote}</p>
      </div>
    </div>
  );
}

export default QuoteSlide;
