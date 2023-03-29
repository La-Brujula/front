import { Container } from '@shared/layout/container';

import areas from '@shared/constants/areas.json';

window.areas = areas;

export function DataPage() {
  return (
    <>
      <Container className="text-primary">
        <div className="max-w-3xl mx-auto mb-8">
          <h2>
            {'Estadisticas'}
          </h2>
          <p>Categoria</p>
          <select onChange={e => {
            console.log('e.target.value', e.target.value);
          }}>
            {(() => {
              return Object.entries(areas).map(v => {
                return [v[0], Object.entries(v[1]).map(_v => {
                  return [_v[0], Object.entries(_v[1])[0][0].split(/-/)[0]];
                })];
              }).map(v => v[1]).flat().map(v => {
                return <option value={v[1]}>{v[0]}</option>;
              });
            })()}
          </select>
          <p>
            {'Something something'}
          </p>
        </div>
      </Container>
    </>
  );
}

export default DataPage;
