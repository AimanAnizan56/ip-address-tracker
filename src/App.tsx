import { useEffect, useState } from 'react';
import ArrowLeft from './assets/icon-arrow.svg';

type ClientInfo = {
  ip: string;
  version: string;
  org: string;
  latitude: number;
  longtitude: number;
  utc_offset: string;
  city: string;
  region_code: string;
  postal: string;
};

function App() {
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>();

  const getInfo = async (ip: string = ''): Promise<ClientInfo> => {
    let params = `?apiKey=${import.meta.env.VITE_IPIFY_API_KEY}`;
    if (ip != '') params += `?ipAddress=${ip}`;

    const url = `https://geo.ipify.org/api/v2/country${params}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    getInfo()
      .then((data) => {
        setClientInfo(data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <main>
        <div className="bg-background-mobile desktop:bg-background-desktop bg-no-repeat bg-cover relative">
          <h1 className="text-3xl font-medium text-white max-w-xl text-center mx-auto pt-10 mb-8">IP Address Tracker</h1>

          <div className="flex justify-center pb-40">
            <input type="text" name="ip-address" id="ip-address" className="text-lg py-3 pl-5 rounded-l-xl min-w-[300px] w-[50vw] xl:w-[30vw] focus-visible:outline-none" placeholder="Search for any IP address or domain" />
            <button className="bg-very-dark-gray min-w-[50px] rounded-r-xl flex align-middle justify-center active:bg-dark-gray">
              <img src={ArrowLeft} alt="arrow left" className="my-5" />
            </button>
          </div>

          <div className="bg-white -mt-32 md:-mt-20 left-[50%] translate-x-[-50%] w-[85vw] max-w-screen-desktop shadow-md py-5 px-4 md:py-8 text-center md:text-left rounded-xl absolute flex flex-col gap-3 md:flex-row md:divide-x-2 justify-around">
            <div>
              <div className="text-dark-gray font-medium text-sm md:mb-3 desktop:text-md">IP ADDRESS</div>
              <div className="font-medium text-lg desktop:text-3xl">{clientInfo ? clientInfo.ip : '192.212.174.101'}</div>
            </div>
            <div className="md:pl-7">
              <div className="text-dark-gray font-medium text-sm md:mb-3 desktop:text-md">LOCATION</div>
              <div className="font-medium text-lg desktop:text-3xl">Brooklyn, NY 10001</div>
            </div>
            <div className="md:pl-7">
              <div className="text-dark-gray font-medium text-sm md:mb-3 desktop:text-md">TIMEZONE</div>
              <div className="font-medium text-lg desktop:text-3xl">UTC -05:00</div>
            </div>
            <div className="md:pl-7">
              <div className="text-dark-gray font-medium text-sm md:mb-3 desktop:text-md">ISP</div>
              <div className="font-medium text-lg desktop:text-3xl">SpaceX Starlink</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
