import { useEffect, useState } from 'react';
import ArrowLeft from './assets/icon-arrow.svg';

type ClientInfo = {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
  };
  isp: string;
};

function App() {
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>();
  const [IPAddress, setIPAddress] = useState<string>('');
  const apiKey = `?apiKey=${import.meta.env.VITE_IPIFY_API_KEY}`;
  const exactUrl = `https://geo.ipify.org/api/v2/country,city${apiKey}`;

  const getInfo = async () => {
    const url = `${exactUrl}&ipAddress=${IPAddress}`;
    const response = await fetch(url);
    if (response.status != 200) {
      setClientInfo(null);
      return;
    }
    const data: ClientInfo = await response.json();
    setClientInfo(data);
  };

  const getLocation = (): string => {
    const location = clientInfo?.location;
    const region = location?.region?.split(' ');

    let shorthandRegion = location?.region;
    if (region != undefined && region?.length > 1) {
      shorthandRegion = region[0].charAt(0).concat(region[1].charAt(0));
    }
    return `${location?.city}, ${shorthandRegion} ${location?.postalCode}`;
  };

  useEffect(() => {
    fetch(exactUrl)
      .then((response) => {
        response.json().then((data: ClientInfo) => {
          setClientInfo(data);
        });
      })
      .catch(console.error);
  }, [exactUrl]);

  return (
    <>
      <main>
        <div className="bg-img">
          <h1 className="title-header">IP Address Tracker</h1>

          <div className="flex justify-center pb-40">
            <input type="text" name="ip-address" id="ip-address" className="input-textbox" placeholder="Search for any IP address or domain" onChange={(event) => setIPAddress(event.target.value)} onKeyUp={(event) => event.key == 'Enter' && getInfo()} />
            <button className="input-btn" onClick={() => getInfo()}>
              <img src={ArrowLeft} alt="arrow left" className="my-5" />
            </button>
          </div>

          <div className="client-info-card">
            <div className="client-info-detail">
              <div className="client-info-detail_title">IP ADDRESS</div>
              <div className="client-info-detail_value md:max-w-[14rem] desktop:max-w-xs truncate">{clientInfo ? clientInfo.ip : 'Unknown'}</div>
            </div>
            <div className="client-info-detail">
              <div className="client-info-detail_title">LOCATION</div>
              <div className="client-info-detail_value md:max-w-[14rem] desktop:max-w-xs">{clientInfo ? getLocation() : 'Unknown'}</div>
            </div>
            <div className="client-info-detail">
              <div className="client-info-detail_title">TIMEZONE</div>
              <div className="client-info-detail_value">{clientInfo ? `UTC ${clientInfo.location.timezone}` : 'Unknown'}</div>
            </div>
            <div className="client-info-detail">
              <div className="client-info-detail_title">ISP</div>
              <div className="client-info-detail_value md:max-w-[14rem] desktop:max-w-xs">{clientInfo ? (clientInfo.isp != '' ? clientInfo.isp : 'None') : 'Unknown'}</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
