import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../types/offer';

type MapProps = {
  offers: Offer[];
};

const DEFAULT_ZOOM = 12;

export function Map({ offers }: MapProps): React.JSX.Element {
  const mapRef = useRef<leaflet.Map | null>(null);
  const mapContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current !== null || offers.length === 0) {
      return;
    }

    const city = {
      lat: offers[0].location.latitude,
      lng: offers[0].location.longitude,
    };

    const map = leaflet.map(mapContainerRef.current, {
      center: city,
      zoom: DEFAULT_ZOOM,
    });

    leaflet
      .tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      )
      .addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [offers]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const markersLayer = leaflet.layerGroup().addTo(mapRef.current);

    const defaultIcon = leaflet.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [28, 40],
      iconAnchor: [14, 40],
    });

    offers.forEach((offer) => {
      leaflet
        .marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {
            icon: defaultIcon,
          }
        )
        .addTo(markersLayer);
    });

    return () => {
      markersLayer.clearLayers();
      mapRef.current?.removeLayer(markersLayer);
    };
  }, [offers]);

  return (
    <section
      className="cities__map map"
      ref={mapContainerRef}
    />
  );
}
