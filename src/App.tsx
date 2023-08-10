import ArrowLeft from './assets/icon-arrow.svg';

function App() {
  return (
    <>
      <main>
        <div className="bg-background-mobile desktop:bg-background-desktop bg-no-repeat bg-cover relative">
          <h1 className="text-3xl font-medium text-white max-w-xl text-center mx-auto pt-10 mb-4">IP Address Tracker</h1>

          <div className="flex justify-center">
            <input type="text" name="ip-address" id="ip-address" className="text-lg py-3 pl-5 rounded-l-xl min-w-[300px] w-[50vw] xl:w-[30vw] focus-visible:outline-none" placeholder="Search for any IP address or domain" />
            <button className="bg-very-dark-gray min-w-[50px] rounded-r-xl flex align-middle justify-center">
              <img src={ArrowLeft} alt="arrow left" className="my-5" />
            </button>
          </div>

          <div>info</div>
        </div>
      </main>
    </>
  );
}

export default App;
