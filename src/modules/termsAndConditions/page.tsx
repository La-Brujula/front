import { useState, useEffect } from 'react';
//import { useTranslation } from 'react-i18next';

export function TermsAndConditionsPage() {
  //const { t } = useTranslation('tos');
  const [fileContent, setFileContent] = useState<string>('');

  useEffect(() => {
    const fetchTxtFile = async () => {
      try {
        const response = await fetch(
          '/Politicas de uso y privacidad ver04.txt',
        );
        const text = await response.text();
        //setFileContent(t(text));
        setFileContent(text);
      } catch (error) {
        console.error('Error al leer el archivo:', error);
      }
    };

    fetchTxtFile();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-10/12 p-3 lg:p-4">
        <p className="break-words whitespace-pre-wrap">{fileContent}</p>
      </div>
    </div>
  );
}

export default TermsAndConditionsPage;
