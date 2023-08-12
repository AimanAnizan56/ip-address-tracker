import { useEffect, useLayoutEffect, useState } from 'react';
import { ClientInfo } from './types';
import { exactUrl } from './constant';
import InputBox from './components/InputBox';
import CardInfo from './components/CardInfo';
import Map from './components/Map';

function App() {
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>();
  const [location, setLocation] = useState({ lat: 40.710231418648, lng: -73.98893138917833 });
  const [isError, setError] = useState({
    value: false,
    message: '',
  });

  useEffect(() => {
    fetch(exactUrl)
      .then((response) => {
        response.json().then((data: ClientInfo) => {
          if (response.status != 200 || data.code == 403) {
            setError({
              value: true,
              message: data.messages,
            });
            return;
          }
          setClientInfo(data);
        });
      })
      .catch(console.error);
  }, []);

  useLayoutEffect(() => {
    if ((clientInfo != null || clientInfo != undefined) && clientInfo.location) {
      setLocation({
        lat: clientInfo?.location.lat,
        lng: clientInfo?.location.lng,
      });
    }
  }, [clientInfo]);

  return (
    <>
      <main className="min-h-[100vh] flex flex-col">
        <div className="bg-img z-50">
          <h1 className="title-header">IP Address Tracker</h1>

          {isError.value && <div className="text-red-500 max-w-xl mx-auto text-center">{isError.message}</div>}
          <InputBox setClientInfo={setClientInfo} />

          <CardInfo clientInfo={clientInfo} />
        </div>
        <Map location={location} />
      </main>
    </>
  );
}

export default App;
