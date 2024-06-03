"use client";
import React from "react"; // Ensure React is imported
import Image from "next/image";
import Master from "./layout/master";
import { Button, Input } from "@material-tailwind/react";
import { useMonitoring } from "../../hooks/useMonitoring";
import RealTimeChart from "./components/grafik/RealTimeChart";

export default function Home() {
  const {
    handleCreatedMonitoring,
    setRpmMotor,
    speedRpmMotor,
    handleStopMonitoring,
    rpmMotor,
  } = useMonitoring();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const rpmValue = parseInt(value, 10); // Convert the string to an integer
    if (!isNaN(rpmValue) && rpmValue <= 255) {
      setRpmMotor(rpmValue); // Set the rpm motor value if it's a valid number and within the range
    } else if (rpmValue > 255) {
      setRpmMotor(255); // Set rpm motor to maximum value if input exceeds 255
    } else {
      setRpmMotor(0); // Clear the value if it's not a number
    }
  };

  const latestSpeedRpm =
    speedRpmMotor?.length > 0
      ? speedRpmMotor[speedRpmMotor.length - 1].speedRpm
      : 0;

  return (
    <Master>
      <div className="flex min-h-screen flex-col items-center p-24 gap-4 bg-blue-50">
        <div className="flex flex-col gap-10 w-full bg-green-200 justify-center items-center">
          <div className="w-96 h-40 mb-10 flex flex-col justify-center items-center">
            <div className="font-bold">INPUT PWM</div>
            <Input
              crossOrigin={undefined}
              className="!border-gray-900 focus:!border-gray-900 w-full h-40 flex items-center justify-center text-center text-xl"
              style={{
                borderWidth: "2px",
                borderColor: "gray-900",
                outline: "none",
              }}
              value={rpmMotor}
              onChange={handleChange}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="w-96 h-40 pb-10 flex flex-col justify-center items-center">
            <div className="font-bold">Speed Nilai</div>
            <div className="h-full w-full border-2 rounded-md border-black flex justify-center items-center text-xl">
              {latestSpeedRpm}
            </div>
          </div>
        </div>
        <div className="flex gap-10 w-full justify-center items-center">
          <Button className="w-80" onClick={handleCreatedMonitoring}>
            Start
          </Button>
          <Button className="w-80" onClick={handleStopMonitoring}>
            Stop
          </Button>
        </div>
        <RealTimeChart speedRpmMotor={speedRpmMotor} />
      </div>
    </Master>
  );
}
