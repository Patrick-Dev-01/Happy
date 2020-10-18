import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import mapMaker from '../images/map-marker.png';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number; 
}

export default function OrphanageMap() {
    const navigation = useNavigation();
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    console.log(orphanages);

    useFocusEffect(() => {
      api.get('/orphanage').then(response => {
        setOrphanages(response.data);
      })
    })

    function handleNavigateToOrphanageDetails(id: number){
      navigation.navigate('OrphanagesDetails', { id });
    }

    function handleNavigateCreateOrphanage(){
      navigation.navigate('SelectMapPosition');
    }

    return (
      <View style={styles.container}>
        <MapView style={styles.map} 
          initialRegion={{
            latitude: -23.5779399,
            longitude: -46.8126483,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
        >
            {orphanages.map(orphanage => {
              return (
              <Marker 
                key={orphanage.id}
                icon={mapMaker}
                calloutAnchor={{
                x: 0.5,
                y: 0,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }} 
              >
              <Callout onPress={() => {handleNavigateToOrphanageDetails(orphanage.id)}}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>Lar das Meninas</Text>
                </View>
              </Callout>
  
              </Marker>
              
              )})
            }
          </MapView>
  
          <View style={styles.footer}>
            <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
  
            <TouchableOpacity style={styles.createOrphanageButton}
            onPress={() => {handleNavigateCreateOrphanage}}>
              <Feather name="plus" size={20} />
            </TouchableOpacity>
          </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
      elevation: 3,
    },
  
    calloutText: {
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#fff',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
    },
  
    footerText: {
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3',
    },
  
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
});
  