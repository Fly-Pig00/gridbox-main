import React, { useMemo, useState} from 'react'
import { useLoadScript, GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api';
import Link from 'next/link';

declare global {
  interface Window {
    initMap: () => void;
  }
}

export type DistributorsType = {
  name: string,
  address: string,
  lat: number,
  lng: number,
  link: string
}[]

const DistributorsMap = ({distributors} : {distributors: DistributorsType}) => {
  const [openWindow, setOpenWindow] = useState<number | null>(null)
  const libraries = useMemo(() => ['places'], []);
  const unitedStates = useMemo(
    () => ({ lat: 37.09024, lng: -95.712891 }),
    []
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });
  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      clickableIcons: true,
      scrollwheel: true,
      streetViewControl: false,
      mapTypeControl: false
    }),
    []
  );
  
  return (
    <div id="distributors" className='contact__mapDistributors'>
      { !isLoaded 
      ? 
        <div>Loading...</div>
      :
      <GoogleMap
        options={mapOptions}
        zoom={window.innerWidth < 600 ? 2.8 : 3.2}
        center={unitedStates}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        onLoad={() => console.log('Map Component Loaded...')}
      >
        {
          distributors?.map(({name, address, lat, lng, link}, idx) => {
            return(
            <MarkerF
              key={idx}
              position={{lat, lng}}
              onClick={() => setOpenWindow(idx)}
            >
              {openWindow === idx && 
                <InfoWindow
                  position={{lat, lng}}
                  onCloseClick={() => setOpenWindow(idx)}
                >
                  <div>
                    <Link
                      href={link}
                      className="text-accent underline font-medium sm:text-lg"
                      target="_blank"
                    >{name}</Link>
                    <p className='break-words max-w-[120px] sm:max-w-[180px]'>{address}</p>
                  </div>
                </InfoWindow>
              }
            </MarkerF>
            )
          })
        }
        
      </GoogleMap>
      }
    </div>
  )
};

export default DistributorsMap;