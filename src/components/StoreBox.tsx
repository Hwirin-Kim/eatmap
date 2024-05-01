import { StoreType } from "@/interface";
import { markerSelector } from "@/utils/selectMarker";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiMapPin, FiPhone, FiInfo, FiCheck } from "react-icons/fi";

interface StoreBoxProps {
  store: any;
  setStore: Dispatch<SetStateAction<any>>;
}

export default function StoreBox({ store, setStore }: StoreBoxProps) {
  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
      {store && (
        <>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  src={markerSelector(store.bizcnd_code_nm)}
                  width={40}
                  height={40}
                  alt="icon_image"
                />
                <div>
                  <div className="font-semibold">{store.upso_nm}</div>
                  <div className="text-sm">{store.cob_code_nm}</div>
                </div>
              </div>
              <button type="button" onClick={() => setStore(null)}>
                <AiOutlineClose />
              </button>
            </div>
            <ul>
              {store.rdn_code_nm && (
                <li className="mt-4 flex gap-2 items-center">
                  <FiMapPin />
                  {store.rdn_code_nm}
                </li>
              )}
              {store.tel_no && (
                <li className="mt-4 flex gap-2 items-center">
                  <FiPhone />
                  {store.tel_no}
                </li>
              )}
              {store.crtfc_gbn_nm && (
                <li className="mt-4 flex gap-2 items-center">
                  <FiInfo />
                  {store.crtfc_gbn_nm}
                </li>
              )}
              {store.bizcnd_code_nm && (
                <li className="mt-4 flex gap-2 items-center">
                  <FiCheck />
                  {store.bizcnd_code_nm}
                </li>
              )}
            </ul>
          </div>
          <button
            type="button"
            onClick={() => window.alert("상세보기 작업중")}
            className="w-full bg-blue-700 hover:bg-blue-500 text-white py-2 focus:bg-blue-500 font-semibold rounded-b-lg"
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
