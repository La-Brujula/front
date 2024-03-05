import { useTranslation } from 'react-i18next';

// name
// t("landing:Avelino Rodríguez")
// t("landing:Rosa Adela López Zuckermann")
// t("landing:Annmarie Meier")
// t("landing:Luis Chávez")
// t("landing:Inti Cordera")

// quote
// t("landing:Durante más de una década La Brújula se ha posicionado como un recurso de uso obligado para los productores ya que integra a todos los elementos del ecosistema de la industria en una herramienta práctica últil y siempre actualizada.")
// t("landing:LA BRÚJULA es un instrumento de orientación, su funcionamiento se basa en el magnetismo. La Brújula de Romelia, es una herramienta, un instrumento de comunicación, una red. Nos ayuda a seguir el rumbo para encontrarnos y conocernos, apoya y crea sinergias para descubrir la diversidad y funciona. Reúne, sistematiza, promueve y vincula. Labor inmensa, Romelia Alvarez ha logrado ese magnetismo.")
// t("landing:En el tupido y creciente universo audiovisual jalisciense hacía falta una brújula para que los involucrados no perdieran la orientación. Así nació La Brújula creada e impulsada por Romelia Álvarez. En sus inicios fue modesta pero creció y se enriqueció. Hoy, la guía para los creadores, productores y trabajadores del audiovisual no sólo se ha convertido en una herramienta necesaria sino que ha construido comunidad. Ahora que La Brújula entra en una nueva etapa, el cine y las demás expresiones audiovisuales producidas en nuestra región, contarán con una brújula extendida con la que podrán crear historias con calidad e identidad.")
// t("landing:Tengo el placer de haber visto nacer y haber patrocinado estando en Kodak desde su inicio sin pausas a una de las herramientas más importantes dentro de la industria Audiovisual que es \"La Brújula\", y pude ser testigo a través de los productores y el gremio audiovisual en general que dió la bienvenida a este magnífico directorio usándolo en todo momento, nacionales y extranjeros que producen en nuestro país. \"Larga vida a La Brújula")
// t("landing:"Pensar en LA BRÚJULA, es como pensar en dibujar un mapa, orientarnos en la mejor dirección, y con una ruta fija. Y muchas veces, nuestras tareas en el campo audiovisual, y en el desarrollo de proyectos, requieren fijar muy bien nuestro destino, por eso... muchos años para este compás, LA BRÚJULA.")

// title
// t("landing:Director de Thelift y Presidente de CANACINE")
// t("landing:Casa Productora ROSA MEDIA")
// t("landing:Crítica y Académica")
// t("landing:Business Development Manager & Brand Ambassador @ Kino Flo Systems")
// t("landing:Director ejecutivo DocsMX")

function QuoteSlide({
  imageUrl,
  name,
  quote,
  title,
}: {
  imageUrl: string;
  name: string;
  quote: string;
  title: string;
}) {
  const { t } = useTranslation('landing');

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]
      grid-rows-[min-content_1fr] lg:grid-rows-1 gap-2 lg:gap-8 max-w-4xl
      mx-auto translate-x-[var(--carusel-animation)] items-center object-bottom lg:object-center
      transition-transform duration-400 py-8 h-full"
    >
      <img
        src={`${import.meta.env.BASE_URL}img${imageUrl}`}
        className="w-1/2 fit-content rounded-md h-auto object-contain
        object-bottom lg:object-center max-h-[24rem]"
      />
      <div className="relative text-primary w-full text-left">
        <h3 className="font-bold text-lg">{t(name)}</h3>
        <p className="font-normal text-sm mb-8 ">{t(title)}</p>
        <p className="grow">{t(quote)}</p>
      </div>
    </div>
  );
}

export default QuoteSlide;
