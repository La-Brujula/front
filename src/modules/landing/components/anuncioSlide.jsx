export const AnuncioSlide = ({
  imageUrl,
  linkUrl,
  horizontalImage,
  verticalImage,
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <a
        href={linkUrl}
        target={!!linkUrl ? '_blank' : ''}
        rel="noopener noreferrer"
        className={!!linkUrl ? 'cursor-pointer' : 'cursor-default select-none'}
      >
        {!!imageUrl ? (
          <img
            src={`${import.meta.env.BASE_URL}img${imageUrl}`}
            alt=""
            className="w-full top-0 left-0 h-full object-contain"
          />
        ) : (
          <>
            <img
              src={`${import.meta.env.BASE_URL}img${horizontalImage}`}
              alt=""
              className="w-full top-0 left-0 h-full hidden lg:block object-contain"
            />
            <img
              src={`${import.meta.env.BASE_URL}img${verticalImage}`}
              alt=""
              className="w-full top-0 left-0 h-full block lg:hidden object-contain"
            />
          </>
        )}
      </a>
    </div>
  );
};
