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
        <div className="bg-background-mobile desktop:bg-background-desktop bg-no-repeat bg-cover relative">
          <h1 className="text-3xl font-medium text-white max-w-xl text-center mx-auto pt-10 mb-8">IP Address Tracker</h1>

          <div className="flex justify-center pb-40">
            <input
              type="text"
              name="ip-address"
              id="ip-address"
              className="text-lg py-3 pl-5 rounded-l-xl min-w-[300px] w-[50vw] xl:w-[30vw] focus-visible:outline-none"
              placeholder="Search for any IP address or domain"
              onChange={(event) => setIPAddress(event.target.value)}
              onKeyUp={(event) => event.key == 'Enter' && getInfo()}
            />
            <button className="bg-very-dark-gray min-w-[50px] rounded-r-xl flex align-middle justify-center active:bg-dark-gray" onClick={() => getInfo()}>
              <img src={ArrowLeft} alt="arrow left" className="my-5" />
            </button>
          </div>

          <div className="bg-white -mt-32 md:-mt-20 left-[50%] translate-x-[-50%] w-[85vw] max-w-screen-desktop shadow-md py-5 px-4 md:py-8 text-center md:text-left rounded-xl absolute flex flex-col gap-3 md:flex-row md:divide-x-2 justify-around">
            <div className="flex flex-col justify-center">
              <div className="text-dark-gray font-medium text-sm md:mb-3 desktop:text-md">IP ADDRESS</div>
              <div className="font-medium text-lg desktop:text-3xl md:max-w-[14rem] desktop:max-w-xs truncate">{clientInfo ? clientInfo.ip : 'Unknown'}</div>
            </div>
            <div className="md:pl-7 flex flex-col justify-center">
              <div className="text-dark-gray font-medium text-sm md:mb-3 desktop:text-md">LOCATION</div>
              <div className="font-medium text-lg desktop:text-3xl md:max-w-[14rem] desktop:max-w-xs">{clientInfo ? getLocation() : 'Unknown'}</div>
            </div>
            <div className="md:pl-7 flex flex-col justify-center">
              <div className="text-dark-gray font-medium text-sm md:mb-3 desktop:text-md">TIMEZONE</div>
              <div className="font-medium text-lg desktop:text-3xl">{clientInfo ? `UTC ${clientInfo.location.timezone}` : 'Unknown'}</div>
            </div>
            <div className="md:pl-7 flex flex-col justify-center">
              <div className="text-dark-gray font-medium text-sm md:mb-3 desktop:text-md">ISP</div>
              <div className="font-medium text-lg desktop:text-3xl md:max-w-[14rem] desktop:max-w-xs">{clientInfo ? (clientInfo.isp != '' ? clientInfo.isp : 'None') : 'Unknown'}</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
