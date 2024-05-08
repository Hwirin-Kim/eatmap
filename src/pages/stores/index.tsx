import Loading from "@/components/Loading";
import { StoreType } from "@/interface";
import { markerSelector } from "@/utils/selectMarker";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";

export default function StoreListPage() {
  const {
    isLoading,
    isError,
    data: stores,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: async (): Promise<StoreType[]> => {
      const { data } = await axios.get(`/api/stores`);
      return data;
    },
  });

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[30%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  return (
    <div className=" px-4 md:max-w-5xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.map((store, index) => {
            return (
              <li className="flex justify-between gap-x-6 py-5" key={index}>
                <div className="flex gap-x-4">
                  <Image
                    src={markerSelector(store.category!)}
                    width={48}
                    height={48}
                    alt="icon_image"
                  />
                  <div>
                    <div className="text-sm font-semibold leading-6  text-gray-900">
                      {store.name}
                    </div>
                    <div className="mt-1 truncate text-sm font-semibold leading-5  text-gray-500">
                      {store.name}
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <div className="text-sm font-semibold leading-6  text-gray-900">
                    {store.address}
                  </div>
                  <div className="mt-1 truncate text-sm font-semibold leading-5  text-gray-500">
                    {store.phone || "번호없음"} | {store.foodCertifyName} |{" "}
                    {store.category}
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);

  return {
    props: { stores: stores.data },
  };
}
