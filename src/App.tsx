import { useEffect, useLayoutEffect, useState } from 'react';
import { ClientInfo } from './types';
import { exactUrl } from './constant';
import InputBox from './components/InputBox';
import CardInfo from './components/CardInfo';
import Map from './components/Map';

function App() {
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>();
  const [location, setLocation] = useState({ lat: 40.710231418648, lng: -73.98893138917833 });

  useEffect(() => {
    fetch(exactUrl)
      .then((response) => {
        response.json().then((data: ClientInfo) => {
          setClientInfo(data);
        });
      })
      .catch(console.error);
  }, []);

  useLayoutEffect(() => {
    if (clientInfo) {
      setLocation({
        lat: clientInfo?.location.lat,
        lng: clientInfo?.location.lng,
      });
    }
  }, [clientInfo]);

  return (
    <>
      <main>
        <div className="bg-img z-50">
          <h1 className="title-header">IP Address Tracker</h1>

          <InputBox setClientInfo={setClientInfo} />

          <CardInfo clientInfo={clientInfo} />
        </div>
        <Map location={location} />
      </main>
    </>
  );
}

export default App;
