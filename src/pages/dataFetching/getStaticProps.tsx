import { GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";

export default function Page({
  number,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div>static world! {number}</div>;
}

export const getStaticProps: GetStaticProps<{ number: number }> = async () => {
  const num = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain"
  );
  const number = await num.json();
  return { props: { number } };
};
