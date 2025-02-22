import type { Stop } from "../../types";

interface CurrentStopProps {
  stop: Stop;
}

export function CurrentStop({ stop }: CurrentStopProps) {
  return (
    <div className=" w-full flex items-center justify-start px-8 border-[#D1D5DB]">
      <h2 className="text-6xl text-white font-medium">{stop.name}</h2>
    </div>
  );
}
