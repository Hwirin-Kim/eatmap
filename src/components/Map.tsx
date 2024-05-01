/*global kakao*/

import Script from "next/script";
import * as stores from "@/data/store_data.json";
import { markerSelector } from "@/utils/selectMarker";
import { Dispatch, SetStateAction } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

//강남역 위도 경도
const DEFAULT_LAT = 37.498095;
const DEFAULT_LNG = 127.02761;

interface MapProps {
  setMap: Dispatch<SetStateAction<any>>;
}

export default function Map({ setMap }: MapProps) {
  const loadKakaoMap = () => {
    //카카오맵 로드 함수

    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOptions = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOptions);

      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
