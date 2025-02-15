import type { Stop } from "../../types";

interface CurrentStopProps {
  stop: Stop;
}

export function CurrentStop({ stop }: CurrentStopProps) {
  return (
    <div className=" w-full flex items-center justify-end px-8 bg-gray-500">
      <h2 className="text-5xl text-white font-medium">{stop.name}</h2>
    </div>
  );
}
