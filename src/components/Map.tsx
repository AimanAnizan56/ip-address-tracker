import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import locationIcon from '../assets/icon-location.svg';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

type Props = {
  location: {
    lat: number;
    lng: number;
  };
};

const Map = ({ location }: Props) => {
  const url = `https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}.png?key=${import.meta.env.VITE_MAPTILER_KEY}`;
  const customMarker = new Icon({
    iconUrl: locationIcon,
    iconSize: [35, 45],
  });

  return (
    <MapContainer center={location} zoom={13} scrollWheelZoom={false} className="h-[66vh] w-[100vw] z-0">
      <TileLayer attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>' url={url} />
      <Marker position={location} title="Current location" icon={customMarker} />
    </MapContainer>
  );
};

export default Map;
