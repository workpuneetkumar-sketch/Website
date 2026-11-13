"use client";
import { usePathname } from "next/navigation";
import Head from "next/head";

export default function Canonical() {
  const pathname = usePathname();
  const canonical = `https://zyoris.com${pathname}`;
  return (
    <Head>
      <link rel="canonical" href={canonical} />
    </Head>
  );
}
