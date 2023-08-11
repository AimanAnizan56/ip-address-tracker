import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import locationIcon from '../assets/icon-location.svg';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useEffect } from 'react';

type Props = {
  location: {
    lat: number;
    lng: number;
  };
};

const FlyToComponent = ({ location }: Props) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([location.lat, location.lng], map.getZoom(), {
      duration: 2,
    });
  }, [location, map]);
  return null;
};

const Map = ({ location }: Props) => {
  const url = `https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}.png?key=${import.meta.env.VITE_MAPTILER_KEY}`;
  const customMarker = new Icon({
    iconUrl: locationIcon,
    iconSize: [35, 45],
  });

  return (
    <MapContainer center={location} zoom={16} scrollWheelZoom={false} className="flex-1 z-0" zoomControl={false}>
      <TileLayer attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>' url={url} />
      <ZoomControl position="bottomright" />
      <Marker position={location} title="Current location" icon={customMarker} />
      <FlyToComponent location={location} />
    </MapContainer>
  );
};

export default Map;
