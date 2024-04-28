import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";

export default function Page({
  number,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div>ServerSide world! {number}</div>;
}

export const getServerSideProps: GetServerSideProps<{
  number: number;
}> = async () => {
  const num = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain"
  );
  const number = await num.json();
  return { props: { number } };
};
