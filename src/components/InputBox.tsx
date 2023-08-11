import { Dispatch, SetStateAction, useState } from 'react';
import { exactUrl } from '../constant';
import { ClientInfo } from '../types';
import ArrowLeft from '../assets/icon-arrow.svg';

type Props = {
  setClientInfo: Dispatch<SetStateAction<ClientInfo | null | undefined>>;
};

const InputBox = ({ setClientInfo }: Props) => {
  const [IPAddress, setIPAddress] = useState<string>('');

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

  return (
    <div className="flex justify-center pb-40">
      <input type="text" name="ip-address" id="ip-address" className="input-textbox" placeholder="Search for any IP address or domain" onChange={(event) => setIPAddress(event.target.value)} onKeyUp={(event) => event.key == 'Enter' && getInfo()} />
      <button className="input-btn" onClick={() => getInfo()}>
        <img src={ArrowLeft} alt="arrow left" className="my-5" />
      </button>
    </div>
  );
};

export default InputBox;
