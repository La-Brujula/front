import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation('navigation')
  return (
    <div className="w-full text-center flex flex-col justify-center gap-4 py-4 px-2">
      {t("")}
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
          {t("contactUs")}
        </a>
        <p>
          {t("seeOur")}&nbsp;
          <a href="/contacto" className="text-primary">
            {("privacy")}
          </a>
          &nbsp;y&nbsp;
          <a href="/contacto" className="text-primary">
            {("legal")}
          </a>
        </p>
        <p>{t("trademark")}</p>
      </div>
    </div>
  );
};
