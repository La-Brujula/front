import { initializeApp } from 'firebase/app';
import {
  DocumentData,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import areas from '@shared/constants/areas.json';
import { Container } from '@shared/layout/container';

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
const db = getFirestore(app);
const usersRef = collection(db, 'users');

export function DataPage() {
  const [category, setCategory] = useState('');
  const [contacts, setContacts] = useState<DocumentData[]>([]);

  useEffect(() => {
    (async () => {
      if (category) {
        const _contacts: DocumentData[] = [];

        const users = query(
          usersRef,
          where('searchName', 'array-contains', category),
        );
        (await getDocs(users)).forEach((doc) => _contacts.push(doc.data()));

        setContacts(_contacts);
      }
    })();
  }, [category]);

  return (
    <>
      <Container className="text-primary">
        <div className="mx-auto mb-8">
          <h2>{'Estadisticas'}</h2>
          <p style={{ fontWeight: 700 }}>Categoria</p>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">----</option>
            {(() => {
              return Object.entries(areas)
                .map((v) => {
                  return [
                    v[0],
                    Object.entries(v[1]).map((_v) => {
                      return [_v[0], Object.entries(_v[1])[0][0].split(/-/)[0]];
                    }),
                  ];
                })
                .map((v) => v[1])
                .flat()
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map((v) => {
                  return (
                    <option
                      key={v[1]}
                      value={v[1]}
                    >
                      {v[0]}
                    </option>
                  );
                });
            })()}
          </select>
          {category ? (
            <div style={{ margin: '32px 0 0 0' }}>
              <p style={{ fontWeight: 700 }}>Lista de Contactos</p>
              <p>
                {(() => {
                  if (contacts && contacts.length > 0) {
                    return (
                      <>
                        <div>{contacts.length} resultados</div>
                        <table
                          style={{
                            margin: '16px 0 0 0',
                            textAlign: 'left',
                          }}
                        >
                          <tr>
                            <th
                              style={{
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Email
                            </th>
                            <th
                              style={{
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Tipo de Persona
                            </th>
                            <th
                              style={{
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Nickname
                            </th>
                            <th
                              style={{
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Nombre
                            </th>
                            <th
                              style={{
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Apellido(s)
                            </th>
                            <th
                              style={{
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Pais
                            </th>
                            <th
                              style={{
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Localidad
                            </th>
                            <th
                              style={{
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Actividad 1
                            </th>
                            <th
                              style={{
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Actividad 2
                            </th>
                            <th
                              style={{
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Actividad 3
                            </th>
                            <th
                              style={{
                                whiteSpace: 'nowrap',
                              }}
                            >
                              # Brujulas
                            </th>
                            <th
                              style={{
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Suscriptor
                            </th>
                          </tr>
                          {contacts
                            .sort((a, b) => a.email.localeCompare(b.email))
                            .map((v) => {
                              return (
                                <tr>
                                  <td>{v.email || ''}</td>
                                  <td>
                                    {v.type == 'fisica' ? 'Física' : 'Moral'}
                                  </td>
                                  <td>{v.nickname || ''}</td>
                                  <td>{v.name || ''}</td>
                                  <td>{v.lastname || ''}</td>
                                  <td>{v.country || ''}</td>
                                  <td>{v.location || ''}</td>
                                  <td>{(v.subareas || [])[0] || ''}</td>
                                  <td>{(v.subareas || [])[1] || ''}</td>
                                  <td>{(v.subareas || [])[2] || ''}</td>
                                  <td>
                                    {
                                      (v.reviews || []).filter((v: any) => !!v)
                                        .length
                                    }
                                  </td>
                                  <td>No</td>
                                </tr>
                              );
                            })}
                        </table>
                      </>
                    );
                  }
                })()}
              </p>
            </div>
          ) : undefined}
        </div>
      </Container>
    </>
  );
}

export default DataPage;