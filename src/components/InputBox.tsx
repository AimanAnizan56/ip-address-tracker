import { Dispatch, SetStateAction, useState } from 'react';
import { domainRegex, exactUrl } from '../constant';
import { ClientInfo } from '../types';
import ArrowLeft from '../assets/icon-arrow.svg';

type Props = {
  setClientInfo: Dispatch<SetStateAction<ClientInfo | null | undefined>>;
};

const InputBox = ({ setClientInfo }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');

  const getInfo = async () => {
    let url: string;
    domainRegex.lastIndex = 0; // RESETTING LAST INDEX
    if (domainRegex.test(inputValue)) url = `${exactUrl}/domain/${inputValue}`;
    else url = `${exactUrl}/ip/${inputValue}`;
    const response = await fetch(url);
    if (response.status != 200) {
      setClientInfo(null);
      return;
    }
    const data: ClientInfo = await response.json();
    if (data.code == 403) {
      setClientInfo(null);
      return;
    }
    setClientInfo(data);
  };

  return (
    <div className="flex justify-center pb-40">
      <input type="text" name="ip-address" id="ip-address" className="input-textbox" placeholder="Search for any IP address or domain" onChange={(event) => setInputValue(event.target.value)} onKeyUp={(event) => event.key == 'Enter' && getInfo()} />
      <button className="input-btn" onClick={() => getInfo()}>
        <img src={ArrowLeft} alt="arrow left" className="my-5" />
      </button>
    </div>
  );
};

export default InputBox;
