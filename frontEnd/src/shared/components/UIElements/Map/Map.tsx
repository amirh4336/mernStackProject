import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "./Map.css";
import { FC } from "react";

interface IMapProps {
  center?: [number, number];
  zoom?: number;
  markerPos?: [number, number];
  title: string;
}

const Map: FC<IMapProps> = ({
  center = [51.505, -0.09],
  zoom = 13,
  markerPos = [51.505, -0.09],
  title,
}) => {
  return (
    <MapContainer
      //@ts-expect-error leafMap props
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <TileLayer
        //@ts-expect-error leafMap attr
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={markerPos}>
        <Popup>{title}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
