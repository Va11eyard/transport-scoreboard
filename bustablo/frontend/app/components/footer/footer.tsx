import { CurrentStop } from "./current-stop";
import { FareInfo } from "./fare-info";
import type { Stop } from "../../types";

interface FooterProps {
  currentStop: Stop;
}

export function Footer({ currentStop }: FooterProps) {
  return (
    <footer className="flex h-[6rem] bg-green-800 mt-auto">
      <CurrentStop stop={currentStop} />
      <FareInfo />
    </footer>
  );
}
