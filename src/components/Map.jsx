import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const center = {
  lat: 44.363099317114305,
  lng: 26.129275619821453,
};

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
      <Marker position={center} eventHandlers={{ click: onMarkerClick }}>
        <Popup className="map__popup">Farmacia Iziapharm</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
