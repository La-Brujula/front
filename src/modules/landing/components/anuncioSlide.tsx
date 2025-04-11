export const AnuncioSlide = (props: {
  imageUrl?: string;
  linkUrl?: string;
  horizontalImage?: string;
  verticalImage?: string;
}) => {
  const { imageUrl, linkUrl, horizontalImage, verticalImage } = props;
  return (
    <div className="mx-auto max-w-3xl">
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
            className="left-0 top-0 h-full w-full object-contain"
          />
        ) : (
          <>
            <picture className="h-full max-h-[75vw] object-contain">
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
                className="hidden w-full object-contain md:block"
              />
            </picture>
          </>
        )}
      </a>
    </div>
  );
};
