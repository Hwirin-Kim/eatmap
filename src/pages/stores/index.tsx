import Loader from "@/components/Loader";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { StoreApiResponse, StoreType } from "@/interface";
import { markerSelector } from "@/utils/selectMarker";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery, useQuery } from "react-query";

const getStoreData = async (page: string): Promise<StoreApiResponse> => {
  const { data } = await axios.get(`/api/stores?page=${page}`);
  return data;
};

export default function StoreListPage() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const observerRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!observerRef?.isIntersecting;

  console.log(isPageEnd);
  const { page = "1" } = router.query;
  console.log(page);

  // const {
  //   isLoading,
  //   isError,
  //   data: stores,
  // } = useQuery({
  //   queryKey: ["stores", page],
  //   queryFn: async (): Promise<StoreApiResponse> => {
  //     const { data } = await axios.get(`/api/stores?page=${page}`);
  //     return data;
  //   },
  // });

  const {
    data,
    isFetching,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["stores"],
    queryFn: ({ pageParam = 1 }) => getStoreData(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.totalPages > lastPage.page) return lastPage.page + 1;
      else return undefined;
    },
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.error("error fetching next page", res.error);
    }
  }, [fetchNextPage]);

  console.log(data);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }
    return () => clearTimeout(timerId);
  }, [fetchNext, isPageEnd, hasNextPage]);

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
          data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.data.map((store, index) => {
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
                        {store.phone || "번호없음"} | {store.foodCertifyName}
                        {store.category}
                      </div>
                    </div>
                  </li>
                );
              })}
            </React.Fragment>
          ))
        )}
      </ul>

      {/* 이건 페이지네이션.. 무한스크롤 구현하고 필요없어짐 */}
      {/* {stores?.totalPages && (
        <Pagination
          totalPages={stores.totalPages}
          currentPage={parseInt(page as string)}
          pathname="stores"
        />
      )} */}
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
      <button onClick={() => fetchNextPage()}>다음페이지</button>
    </div>
  );
}
