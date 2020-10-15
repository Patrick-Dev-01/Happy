import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import mapMarkerImg from '../assets/icons/map-marker.svg';

import '../styles/components/sidebar.css';
import { useHistory } from 'react-router-dom';

export default function Sidebar(){
    const { goBack } = useHistory();

    return(
        <aside>
          <img src={mapMarkerImg} alt="Happy" />

          <footer>
            <button type="button" onClick={goBack}>
              <FiArrowLeft size={24} color="#FFF" />
            </button>
          </footer>
      </aside>
    );
}