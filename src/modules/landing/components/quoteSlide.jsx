function QuoteSlide({ imageUrl, name, quote }) {
  return (
    <div className="flex flex-col lg:flex-row gap-16 max-w-4xl mx-auto translate-x-[var(--carusel-animation)]
    items-center transition-transform duration-400">
      <img src={imageUrl} className="object-cover w-full max-w-xs rounded-lg"/>
      <div className="relative text-primary flex-2 p-4 w-full">
        <h3 className="text-center mb-8 font-normal text-lg">{name}</h3>
        <p className="text-left grow">{quote}</p>
        <img
          src={`${import.meta.env.BASE_URL}img/Apostrofe.svg`}
          className="absolute left-0 top-0 h-12"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default QuoteSlide;
