import Map from "@/components/Map";
import Markers from "@/components/Markers";
import { useState } from "react";
import * as stores from "@/data/store_data.json";
import { StoreType } from "@/interface";
import StoreBox from "@/components/StoreBox";
import axios from "axios";

export default function Home({ stores }: { stores: StoreType[] }) {
  const [map, setMap] = useState();
  const [currentStore, setCurrentStore] = useState<StoreType | null>(null);
  console.log(currentStore);
  return (
    <>
      <Map setMap={setMap} />
      <Markers stores={stores} map={map} setCurrentStore={setCurrentStore} />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}

export async function getStaticProps() {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);
  return {
    props: { stores: stores.data },
    revalidate: 60 * 60,
  };
}
