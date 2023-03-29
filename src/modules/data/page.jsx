import { useState } from 'react';

import { Container } from '@shared/layout/container';
import areas from '@shared/constants/areas.json';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'labrujulaaudiovisual-c163e.firebaseapp.com',
  projectId: 'labrujulaaudiovisual-c163e',
  storageBucket: 'labrujulaaudiovisual-c163e.appspot.com',
  messagingSenderId: '885517889321',
  appId: '1 =885517889321 =web =fb26c1963591eb7e939138',
  measurementId: 'G-XFFBN17QWY',
};

const app = initializeApp(firebaseConfig);

export function DataPage() {
  const [category, setCategory] = useState('');

  return (
    <>
      <Container className="text-primary">
        <div className="max-w-3xl mx-auto mb-8">
          <h2>
            {'Estadisticas'}
          </h2>
          <p style={{ fontWeight:700 }}>Categoria</p>
          <select onChange={e => setCategory(e.target.value)}>
            <option value=''>----</option>
            {(() => {
              return Object.entries(areas).map(v => {
                return [v[0], Object.entries(v[1]).map(_v => {
                  return [_v[0], Object.entries(_v[1])[0][0].split(/-/)[0]];
                })];
              }).map(v => v[1]).flat().sort((a, b) => a[0].localeCompare(b[0])).map(v => {
                return <option key={v[1]} value={v[1]}>{v[0]}</option>;
              });
            })()}
          </select>
          {category
          ? <div style={{ margin:'32px 0 0 0' }}>
            <p style={{ fontWeight:700 }}>Lista de Contactos</p>
            <p>{category}</p>
            </div>
          : undefined}
        </div>
      </Container>
    </>
  );
}

export default DataPage;
