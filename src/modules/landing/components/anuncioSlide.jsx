export const AnuncioSlide = ({ imageUrl, linkUrl }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <a href={linkUrl} target="_blank" rel="noopener noreferrer">
        <img src={imageUrl} alt="" className="w-full h-auto" />
      </a>
    </div>
  );
};
