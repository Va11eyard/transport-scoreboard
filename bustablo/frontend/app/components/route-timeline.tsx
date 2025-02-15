"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Stop } from "../types";

interface RouteTimelineProps {
  stops: Stop[];
  currentStopIndex: number;
}

export default function RouteTimeline({
  stops,
  currentStopIndex,
}: RouteTimelineProps) {
  const [visibleStops, setVisibleStops] = useState<Stop[]>([]);

  useEffect(() => {
    let passed = stops.slice(0, currentStopIndex).slice(-4);
    let upcoming = stops.slice(currentStopIndex + 1, currentStopIndex + 5);

    if (passed.length < 4) {
      upcoming = stops.slice(
        currentStopIndex + 1,
        currentStopIndex + (9 - passed.length)
      );
    } else if (upcoming.length < 4) {
      passed = stops.slice(
        Math.max(0, currentStopIndex - (9 - upcoming.length)),
        currentStopIndex
      );
    }

    setVisibleStops([...passed, stops[currentStopIndex], ...upcoming]);
  }, [stops, currentStopIndex]);

  const progressHeight =
    currentStopIndex === 0
      ? "5%"
      : currentStopIndex === stops.length - 1
      ? "95%"
      : "50%";

  return (
    <div className="w-[20rem] h-full bg-gray-100 p-6">
      <div className="relative h-full">
        <div className="absolute left-[11px] top-0 h-full w-[2px] flex flex-col">
          <div
            className="bg-blue-700 transition-all duration-500"
            style={{
              height: `${
                (visibleStops.findIndex((stop) => stop.status === "current") +
                  1) *
                (100 / visibleStops.length)
              }%`,
            }}
          />
          <div className="bg-gray-300 flex-1" />
        </div>

        <div className="relative h-full flex flex-col justify-between">
          {visibleStops.map((stop, index) => (
            <motion.div
              key={stop.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <motion.div
                className={`rounded-full border-2 ${
                  stop.status === "current"
                    ? "w-6 h-6 bg-white border-blue-800"
                    : "w-3 h-3 " +
                      (stop.status === "passed"
                        ? "bg-blue-800 border-blue-800 ml-[6px]"
                        : "bg-white border-gray-300 ml-[6px]")
                }`}
                layoutId={`stop-${stop.id}`}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <span
                className={` ${
                  stop.status === "passed"
                    ? "text-sm text-gray-500"
                    : stop.status === "current"
                    ? "text-lg text-gray-900 font-medium"
                    : "text-gray-600"
                }`}
              >
                {stop.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
