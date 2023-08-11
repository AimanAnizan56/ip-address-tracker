import { ClientInfo } from '../types';

type Props = {
  clientInfo: ClientInfo | null | undefined;
};

const CardInfo = ({ clientInfo }: Props) => {
  const getLocation = (): string => {
    const location = clientInfo?.location;
    const region = location?.region?.split(' ');

    let shorthandRegion = location?.region;
    if (region != undefined && region?.length > 1) {
      shorthandRegion = region[0].charAt(0).concat(region[1].charAt(0));
    }
    return `${location?.city}, ${shorthandRegion} ${location?.postalCode}`;
  };

  return (
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
  );
};

export default CardInfo;
