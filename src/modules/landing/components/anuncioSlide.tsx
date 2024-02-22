export const AnuncioSlide = (props: {
  imageUrl?: string;
  linkUrl?: string;
  horizontalImage?: string;
  verticalImage?: string;
}) => {
  const { imageUrl, linkUrl, horizontalImage, verticalImage } = props;
  return (
    <div className="max-w-3xl mx-auto">
      <a
        href={linkUrl}
        target={!!linkUrl ? '_blank' : ''}
        rel="noopener noreferrer"
        className={[
          !!linkUrl ? 'cursor-pointer' : 'cursor-default select-none',
          'flex items-center justify-center',
        ].join(' ')}
      >
        {!!imageUrl ? (
          <img
            src={`${import.meta.env.BASE_URL}img${imageUrl}`}
            alt=""
            className="w-full top-0 left-0 h-full object-contain"
          />
        ) : (
          <>
            <picture className="h-full object-contain max-h-[75vw]">
              <source
                media="(max-width:465px)"
                src={`${import.meta.env.BASE_URL}img${verticalImage}`}
              />
              <source
                media="(min-width:466px)"
                src={`${import.meta.env.BASE_URL}img${horizontalImage}`}
              />
              <img
                src={`${import.meta.env.BASE_URL}img${verticalImage}`}
                alt=""
                className="w-full hidden md:block object-contain"
              />
            </picture>
          </>
        )}
      </a>
    </div>
  );
};
