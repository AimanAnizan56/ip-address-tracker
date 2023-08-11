import { useEffect, useState } from 'react';
import { ClientInfo } from './types';
import { exactUrl } from './constant';
import InputBox from './components/InputBox';
import CardInfo from './components/CardInfo';
import Map from './components/Map';

function App() {
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>();

  useEffect(() => {
    fetch(exactUrl)
      .then((response) => {
        response.json().then((data: ClientInfo) => {
          setClientInfo(data);
        });
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <main>
        <div className="bg-img">
          <h1 className="title-header">IP Address Tracker</h1>

          <InputBox setClientInfo={setClientInfo} />

          <CardInfo clientInfo={clientInfo} />
        </div>
        <Map />
      </main>
    </>
  );
}

export default App;
