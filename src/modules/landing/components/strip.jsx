function Strip({ bgColor, textColor, link, label }) {
  return (
    <a
      className={`grow ${bgColor} ${textColor} py-8 cursor-pointer
    flex flex-col justify-center -scale-100 hover:-scale-110 transition-transform`}
      style={{ writingMode: 'vertical-rl' }}
      href={link}
      download
    >
      <span className="cursor-envents-none cursor-pointer">{label}</span>
    </a>
  );
}

export default Strip;
