"use client";

import type { BusData } from "../../types";

interface BusProps {
  data: BusData;
}

export function Bus({ data }: BusProps) {
  return (
    <div className="w-[20rem] flex items-center justify-between px-6 bg-green-800 text-white p-3">
      <span className="text-5xl font-bold">{data.number}</span>
      <span className="text-2xl font-medium">{data.id}</span>
    </div>
  );
}
