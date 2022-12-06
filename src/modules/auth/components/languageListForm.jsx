import AddOutlined from '@mui/icons-material/AddOutlined';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import IconButton from '@mui/material/IconButton';
import languages from '@shared/constants/languages.json';
import { ButtonSelect } from '@shared/components/buttonSelect';
import { useEffect } from 'react';
import { useReducer } from 'react';

const reducer = (state, action) => {
  const newArray = !!state ? state.slice() : [];
  switch (action.type) {
    case 'add':
      newArray.splice(newArray.length, 0, {
        lang: 'es',
        proficiency: 0,
      });
      return newArray;
    case 'remove':
      if (action.index === undefined) throw 'Missing index';
      newArray.splice(action.index, 1);
      return newArray;
    case 'change':
      if (action.index === undefined) throw 'Missing index';
      if (!action.item) throw 'Missing item';
      return newArray.map((item, index) => {
        if (index !== action.index) {
          return { ...item };
        }
        return {
          ...item,
          ...action.item,
        };
      });
    case 'rebase':
      return action.state;
  }
};

export const LanguageListForm = ({ name, setValue, getValues }) => {
  const [state, dispatch] = useReducer(reducer, [
    { lang: 'es', proficiency: 0 },
  ]);

  const updateValue = (i, property) => (ev) => {
    dispatch({
      type: 'change',
      index: i,
      item:
        property == 'lang'
          ? { lang: ev.currentTarget.value }
          : { proficiency: ev.currentTarget.value },
    });
  };

  useEffect(() => {
    setValue(name, state);
    console.log(getValues())
  }, [state]);

  return (
    <div className="col-span-2">
      <>
        {!!state &&
          state.map((lang, i) => (
            <div key={i} className="mb-8">
              <div className="mb-4 flex flex-col md:flex-row gap-4">
                <div className="flex flex-col gap-4 w-full">
                  <select
                    onChange={updateValue(i, 'lang')}
                    className="w-full"
                    value={lang.lang}
                  >
                    <option value="other">Otro</option>
                    {languages.map((defLang) => (
                      <option value={defLang} key={defLang}>
                        {defLang}
                      </option>
                    ))}
                  </select>
                  {!languages.includes(lang.lang) && (
                    <input
                      type="text"
                      onChange={updateValue(i, 'lang')}
                      placeholder="Escribe aquí el nombre de tu idioma"
                    />
                  )}
                </div>
                {state.length > 1 && (
                  <IconButton
                    onClick={() => dispatch({ type: 'remove', index: i })}
                  >
                    <CloseOutlined />
                  </IconButton>
                )}
              </div>
              <div className="grow">
                <ButtonSelect
                  fieldName={'languages[' + i + '].proficiency'}
                  values={['basic', 'intermediate', 'advanced', 'native']}
                  labels={[
                    'Básico',
                    'Intermedio',
                    'Avanzado',
                    'Lengua Materna',
                  ]}
                  onClick={updateValue(i, 'proficiency')}
                  setValue={setValue}
                  getValue={getValues}
                />
              </div>
            </div>
          ))}
        <IconButton
          onClick={() => dispatch({ type: 'add' })}
          className="!mx-auto !block"
        >
          <AddOutlined />
        </IconButton>
      </>
    </div>
  );
};
