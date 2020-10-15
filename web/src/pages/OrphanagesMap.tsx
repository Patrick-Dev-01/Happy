import React, { useEffect, useState } from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import '../styles/pages/orphanages.css';

import mapMarkerImg from '../assets/icons/map-marker.svg';
import mapIcon from '../utils/mapIcon';

import api from '../services/api';

interface Orphanage{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])
    
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="marker"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Taboão da Serra</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>

            <Map
             center={[ -23.6212141, -46.8187688 ]}
             zoom={15}
             style={{ width: '100%', height: '100%' }}
            >
                 
             <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>

             {orphanages.map(orphanage => (
                <Marker 
                    key={orphanage.id}
                    icon={mapIcon}
                    position={[orphanage.latitude, orphanage.longitude]}
                >
                    <Popup closeButton={false} minWidth={240} maxWidth={240}
                    className="map-popup">
                        {orphanage.name}
                         Lar das meninas
                        <Link to={`/orphanage/${orphanage.id}`}>
                          <FiArrowRight />
                        </Link>
                    </Popup>
                </Marker>
             ))}

            </Map>

            <Link to="/orphanage/create" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    );
}

export default OrphanagesMap;