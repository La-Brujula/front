export const Footer = () => {
  return (
    <div className="w-full text-center flex flex-col justify-center gap-4 py-4 px-2">
      Se parte de nuestra comunidad
      <div className="flex flex-row gap-8 mx-auto">
        <a href="BRUJULA_FACEBOOK">
          <img src="/fb.svg" alt="Facebook" className="h-10" />
        </a>
        <a href="BRUJULA_INSTAGRAM">
          <img src="/ig.svg" alt="Instagram" className="h-10" />
        </a>
        <a href="BRUJULA_FACEBOOK">
          <img src="/wa.svg" alt="WhatsApp" className="h-10" />
        </a>
      </div>
      <div className="">
        <a href="/contacto" className="text-primary">
          Contáctanos
        </a>
        <p>
          Conoce nuestro&nbsp;
          <a href="/contacto" className="text-primary">
            aviso de privacidad
          </a>
          &nbsp;y&nbsp;
          <a href="/contacto" className="text-primary">
            aviso legal
          </a>
        </p>
        <p>La Brújula es una marca registrada.</p>
      </div>
    </div>
  );
};
