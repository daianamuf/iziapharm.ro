import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const center = {
  lat: 44.389998,
  lng: 26.118999,
};

let defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function Map() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;

  const onMarkerClick = () => {
    const confirmOpen = window.confirm(
      "Do you want to open this location in Google Maps?"
    );
    if (confirmOpen) window.open(googleMapsUrl, "_blank");
  };
  return (
    <MapContainer
      className="map"
      center={center}
      zoom={15}
      style={{ height: "260px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        icon={defaultIcon}
        position={center}
        eventHandlers={{ click: onMarkerClick }}
      >
        <Popup className="map__popup">Farmacia Iziapharm</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
