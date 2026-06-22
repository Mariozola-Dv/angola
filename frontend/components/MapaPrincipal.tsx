'use client';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { dadosIniciais } from './dadosMapa';

const icon = L.icon({ 
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png", 
  iconSize: [25, 41] 
});

export default function MapaPrincipal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="h-full w-full flex items-center justify-center">CARREGANDO DADOS...</div>;

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-[#1e293b] shadow-2xl">
      <MapContainer center={[-11.2027, 17.8739]} zoom={6} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />

        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Infraestruturas">
            <LayerGroup>
              {dadosIniciais.filter(d => d.type === 'infra').map(item => (
                <Marker key={item.id} position={[item.lat, item.lng]} icon={icon}>
                  <Popup>{item.name} <br/> <span className="text-blue-600 font-bold">Status: Online</span></Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Agricultura">
            <LayerGroup>
              {dadosIniciais.filter(d => d.type === 'agro').map(item => (
                <Marker key={item.id} position={[item.lat, item.lng]} icon={icon}>
                  <Popup>{item.name} <br/> <span className="text-emerald-600 font-bold">Monitorização Ativa</span></Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}