export const PorFiltros = () => {
  return (
    <div className="flex flex-col gap-3 justify-items-stretch">
      <input
        type="text"
        placeholder="Nombre"
        className="text-xl border border-primary bg-transparent text-primary"
      />
      <select className="text-xl border border-primary bg-transparent text-primary">
        <option value="">Actividad</option>
      </select>
      <select className="text-xl border border-primary bg-transparent text-primary">
        <option value="">Región</option>
      </select>
      <input
        type="text"
        placeholder="Palabra Clave"
        className="text-xl border border-primary bg-transparent text-primary"
      />
    </div>
  );
};
