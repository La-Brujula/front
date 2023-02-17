function QuoteSlide({ imageUrl, name, quote, title }) {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-4 lg:gap-8 max-w-4xl
      mx-auto translate-x-[var(--carusel-animation)] items-center
      transition-transform duration-400 py-8 h-full"
    >
      <img
        src={`${import.meta.env.BASE_URL}img${imageUrl}`}
        className="w-320 rounded-md h-240 object-cover object-fit object-center" 
      />
      <div className="grid gap-2 grid-cols-[2rem_1fr] self-start">
        <img
          src={`${import.meta.env.BASE_URL}img/Apostrofe.svg`}
          className="h-8 self-start"
          loading="lazy"
        />
        <div className="relative text-primary w-full text-left">
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="font-normal text-sm mb-8 ">{title}</p>
          <p className="grow">{quote}</p>
        </div>
      </div>
    </div>
  );
}

export default QuoteSlide;
