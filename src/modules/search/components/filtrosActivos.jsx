export const FiltrosActivos = ({ filters }) => {
    return <div className="flex flex-row flex-wrap gap-4">
        <h4>Filtros Activos:</h4>
        {!!filters && Object.entries(filters)?.map(([k, v]) => !!v && <p key={k}><b>{k}</b>: {v}</p>)}
    </div>

}