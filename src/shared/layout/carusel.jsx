import { useState } from 'react';

function Carusel({ children }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translation, setTranslation] = useState('0%');
  const changeSlide = (i) => {
    setTranslation('-100%');
    setTimeout(() => {
      setCurrentSlide(i);
      setTranslation('0%');
    }, 200);
  };

  return (
    <div
      className="relative flex flex-col gap-8"
      style={{ '--carusel-animation': translation }}
    >
      {children[currentSlide]}
      <div className="flex flex-row gap-4 justify-center">
        {Object.keys(children).map((i) => (
          <div
            key={i}
            className={
              'rounded-full h-6 w-6 bg-secondary cursor-pointer transition-colors' +
              (currentSlide != i ? ' bg-opacity-20' : '')
            }
            onClick={() => changeSlide(i)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Carusel;
