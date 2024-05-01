import { StoreType } from "@/interface";
import { markerSelector } from "@/utils/selectMarker";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

interface MarkersProps {
  map: any;
  stores: StoreType[];
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({
  map,
  stores,
  setCurrentStore,
}: MarkersProps) {
  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      const imageSize = new window.kakao.maps.Size(40, 40); // 마커이미지의 크기입니다

      stores.map((store) => {
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

        // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
        const iwContent = `<div class="infowindow">${store.upso_nm}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

        // 커스텀 오버레이를 생성합니다
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: iwContent,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        // 마커에 마우스오버 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 마커위에 표시합니다
          customOverlay.setMap(map, marker);
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          // 마커에 마우스아웃 이벤트가 발생하면 커스텀 오버레이를 제거합니다
          customOverlay.setMap();
        });

        marker.setMap(map);

        //클릭시 currentStore상태에 추가
        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrentStore(store);
        });
      });
    }
  }, [map, setCurrentStore, stores]);
  useEffect(() => {
    loadKakaoMarkers();
  }, [map, loadKakaoMarkers]);
  return <></>;
}
