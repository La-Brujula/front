import { useTranslation } from "react-i18next";

export const PorFiltros = () => {
  const { t } = useTranslation("search")
  return (
    <form
      action="/buscar"
      className="flex flex-col gap-4 justify-items-stretch"
    >
      <div className="flex flex-col xl:flex-row gap-3 justify-items-stretch">
        <input
          type="text"
          placeholder={t("name")}
          name="nombre"
          autoComplete="none"
          className="text-xl border border-primary bg-transparent
        text-primary placeholder:text-primary grow"
        />
        <select
          className="text-xl border border-primary
      bg-transparent text-primary grow"
          name="actividad"
        >
          <option value="" disabled selected>{t("activity")}</option>
        </select>
        <select
          className="text-xl border border-primary
      bg-transparent text-primary grow"
          name="region"
        >
          <option value="" disabled selected>{t("region")}</option>
        </select>
        <input
          type="text"
          placeholder={t("keyword")}
          className="text-xl border border-primary bg-transparent
        text-primary placeholder:text-primary grow"
          name="keyword"
        />
      </div>
      <input type="submit" value={t("search")} className="w-auto mx-auto" />
    </form>
  );
};
