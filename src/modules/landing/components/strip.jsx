function Strip({ bgColor, link, label }) {
  return (
    <a
      className={`grow ${bgColor} text-white flex items-center rounded-2xl
      cursor-pointer justify-start -scale-100 p-4 text-4xl uppercase`}
      style={{ writingMode: 'vertical-lr' }}
      href={link}
      download
    >
      <span className="cursor-envents-none">{label}</span>
    </a>
  );
}

export default Strip;
