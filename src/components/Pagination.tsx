import Link from "next/link";
import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  pathname: string;
}
export default function Pagination({
  totalPages,
  currentPage,
  pathname,
}: PaginationProps) {
  return (
    <div className="py-6 w-full px-10 flex justify-center gap-4 bg-white my-10 flex-wrap text-black">
      {totalPages <= 10 ? (
        [...Array(totalPages)].map((x, i) => (
          <Link href={{ pathname: pathname, query: { page: i + 1 } }} key={i}>
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white ${
                i + 1 === currentPage
                  ? "text-blue-600 font-bold"
                  : "text-gray-300"
              }`}
            >
              {i + 1}
            </span>
          </Link>
        ))
      ) : (
        <>
          {currentPage > 1 && (
            <Link
              href={{
                pathname: pathname,
                query: { page: currentPage - 1 },
              }}
            >
              <span className={`px-3 py-2 rounded border shadow-sm bg-white `}>
                이전
              </span>
            </Link>
          )}
          <Link
            href={{
              pathname: pathname,
              query: { page: currentPage },
            }}
          >
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white text-blue-600 `}
            >
              {currentPage}
            </span>
          </Link>
          {currentPage < totalPages && (
            <Link
              href={{
                pathname: pathname,
                query: { page: currentPage + 1 },
              }}
            >
              <span className={`px-3 py-2 rounded border shadow-sm bg-white `}>
                다음
              </span>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
