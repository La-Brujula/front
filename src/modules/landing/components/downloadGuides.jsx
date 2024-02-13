import Strip from './strip';
import { Container } from '@/shared/layout/container';

function DownloadGuides() {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div
          className="text-left py-16 px-8 flex
        flex-row justify-end w-full"
        >
          <div className="max-w-lg">
            <h2>
              Descarga
              <br />
              <span className="text-blue">La Brújula</span>
              <br />
              en PDF para utilizarla sin conexión
            </h2>
          </div>
        </div>
        <div
          className="lg:col-span-2 grid lg:grid-cols-5 gap-4 font-bold text-lg
        text-right isolate transform overflow-hidden w-full"
        >
          <Strip
            bgColor="bg-secondary"
            label="Occidente"
            link="/guias/pdfs/laBrujulaOccidente2023.pdf"
          />
          <Strip
            bgColor="bg-[#E82D87]"
            label="Centro"
            link="/guias/pdfs/labrujulaCentro2023.pdf"
          />
          <Strip
            bgColor="bg-[#FAE800]"
            label="Norte"
            link="/guias/pdfs/labrujulaNorte2023.pdf"
          />
          <Strip
            bgColor="bg-[#E5341B]"
            label="Noreste"
            link="/guias/pdfs/labrujulaNoroeste2023.pdf"
          />
          <Strip
            bgColor="bg-[#00A039]"
            label="Sureste"
            link="/guias/pdfs/labrujulaSureste2023.pdf"
          />
        </div>
      </div>
    </Container>
  );
}

export default DownloadGuides;
