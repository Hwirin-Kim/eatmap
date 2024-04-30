/*global kakao*/

import Script from "next/script";
import * as stores from "@/data/store_data.json";
import { markerSelector } from "@/utils/selectMarker";

declare global {
  interface Window {
    kakao: any;
  }
}

//강남역 위도 경도
const DEFAULT_LAT = 37.498095;
const DEFAULT_LNG = 127.02761;

export default function Map() {
  const loadKakaoMap = () => {
    //카카오맵 로드 함수

    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOptions = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOptions);
      const imageSize = new window.kakao.maps.Size(40, 40); // 마커이미지의 크기입니다

      stores.DATA.map((store) => {
        const imageSrc = markerSelector(store.bizcnd_code_nm!);
        const imageOption = {
          offset: new window.kakao.maps.Point(27, 69),
        }; // 마커이미지의 옵션
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );
        const markerPosition = new window.kakao.maps.LatLng(
          store.y_dnts, //위도
          store.x_cnts //경도
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });
        marker.setMap(map);
      });
    });
  };
  console.log(stores);
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
