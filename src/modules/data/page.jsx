import { Container } from '@shared/layout/container';

import areas from '@shared/constants/areas.json';

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
