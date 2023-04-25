import Strip from './strip';

function DownloadGuides() {
  return (
    <div className="flex flex-col lg:flex-row">
      <div
        className="grow bg-primary text-white text-left py-16 px-8 flex
    flex-row justify-end w-full"
      >
        <div className="max-w-lg">
          <h2>
            Descarga {' '}
            <span className="text-blue">La Brújula</span> en PDF para utilizarla sin conexión
          </h2>
        </div>
      </div>
      <div
        className="grow flex flex-row font-bold text-lg bg-blue
    text-right isolate transform overflow-hidden w-full gap-0"
      >
        <Strip
          bgColor="bg-secondary"
          textColor="text-[#E63319]"
          label="Occidente"
          link="/guias/pdfs/laBrujulaOccidente2023.pdf"
        />
        <Strip
          bgColor="bg-[#E82D87]"
          textColor="text-[#FAE800]"
          label="Centro"
          link="/guias/pdfs/labrujulaCentro2023.pdf"
        />
        <Strip
          bgColor="bg-[#FAE800]"
          textColor="text-[#E82D87]"
          label="Norte"
          link="/guias/pdfs/labrujulaNorte2023.pdf"
        />
        <Strip
          bgColor="bg-[#E5341B]"
          textColor="text-[#09ABE4]"
          label="Noreste"
          link="/guias/pdfs/labrujulaNoroeste2023.pdf"
        />
        <Strip
          bgColor="bg-[#00A039]"
          textColor="text-[#252F60]"
          label="Sureste"
          link="/guias/pdfs/labrujulaSureste2023.pdf" 
        />
        <Strip
          bgColor="bg-[#252F60]"
          textColor="text-[#00A039]"
          label="Guanajuato"
          link="/guias/pdfs/labrujulaGuanajuato2023.pdf"
        />
        <Strip
          bgColor="bg-[#F08500]"
          textColor="text-[#E82D87]"
          label="Aguascalientes"
          link="/guias/pdfs/labrujulaAguascalientes2023.pdf"
        />
        <img
          src={`${import.meta.env.BASE_URL}img/HalfLogo.svg`}
          className="absolute left-1/2 bottom-0 -translate-x-1/2
          h-1/3 lg:h-1/2 pointer-events-none"
        />
      </div>
    </div>
  );
}

export default DownloadGuides;
