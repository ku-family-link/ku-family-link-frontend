import { useEffect, useRef } from 'react';

const LocationTab = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.KAKAO_API}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {

      window.kakao.maps.load(() => {

        const { kakao } = window;

        const options = {
          center: new kakao.maps.LatLng(37.5403, 127.0739),
          level: 3,
        };

        const map = new kakao.maps.Map(mapRef.current, options);

        const markerPosition = new kakao.maps.LatLng(37.5403, 127.0739);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);
      });
    };

    script.onerror = () => {
      console.error('Kakao SDK script failed to load');
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-gray-100 pb-20">
      <div className="bg-green-200 text-center py-2 font-semibold mb-4">피보호자 위치</div>
      <div ref={mapRef} className="w-[90vw] h-[70vh] mx-auto"></div>
    </div>
  );
};

export default LocationTab;
