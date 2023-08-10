import { useEffect, useState } from 'react';
import ArrowLeft from './assets/icon-arrow.svg';

function App() {
  const [ip, setIp] = useState<string>();

  const getIp = async () => {
    const response = await fetch(`https://ipapi.co/json/`);
    const data = await response.json();
    setIp(data.ip);
    console.log(ip);
  };

  useEffect(() => {
    getIp().catch(console.error);
  }, []);

  return (
    <>
      <main>
        <div className="bg-background-mobile desktop:bg-background-desktop bg-no-repeat bg-cover relative">
          <h1 className="text-3xl font-medium text-white max-w-xl text-center mx-auto pt-10 mb-4">IP Address Tracker</h1>

          <div className="flex justify-center pb-40">
            <input type="text" name="ip-address" id="ip-address" className="text-lg py-3 pl-5 rounded-l-xl min-w-[300px] w-[50vw] xl:w-[30vw] focus-visible:outline-none" placeholder="Search for any IP address or domain" />
            <button className="bg-very-dark-gray min-w-[50px] rounded-r-xl flex align-middle justify-center">
              <img src={ArrowLeft} alt="arrow left" className="my-5" />
            </button>
          </div>

          <div className="bg-white -mt-32 left-[50%] translate-x-[-50%] w-[85vw] max-w-screen-desktop shadow-md py-5 px-4 text-center md:text-left rounded-xl absolute flex flex-col gap-3 md:flex-row md:divide-x-2 justify-around">
            <div>
              <div className="text-dark-gray font-medium text-sm">IP ADDRESS</div>
              <div className="font-medium text-lg">192.212.174.101</div>
            </div>
            <div className="md:pl-7">
              <div className="text-dark-gray font-medium text-sm">LOCATION</div>
              <div className="font-medium text-lg">Brooklyn, NY 10001</div>
            </div>
            <div className="md:pl-7">
              <div className="text-dark-gray font-medium text-sm">TIMEZONE</div>
              <div className="font-medium text-lg">UTC -05:00</div>
            </div>
            <div className="md:pl-7">
              <div className="text-dark-gray font-medium text-sm">ISP</div>
              <div className="font-medium text-lg">SpaceX Starlink</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
