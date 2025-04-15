export const AnuncioSlide = (props: {
  linkUrl?: string;
  verticalImage?: string;
}) => {
  const { linkUrl, verticalImage } = props;
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
        <img
          src={`${import.meta.env.BASE_URL}img${verticalImage}`}
          alt=""
          className="h-full max-h-[75vw] w-full object-contain md:block"
        />
      </a>
    </div>
  );
};
