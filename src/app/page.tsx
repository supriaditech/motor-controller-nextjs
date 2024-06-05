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
    lastSpeedRpmMotor,
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

  console.log(lastSpeedRpmMotor, "Speed");
  return (
    <Master>
      <div className="flex min-h-screen flex-col items-center p-24 gap-4 bg-blue-50">
        <div className="w-full justify-center items-center flex flex-col px-72">
          <div className="w-full  mb-10 flex flex-col  items-center px-60  gap-4">
            <div className="font-bold">INPUT PWM</div>
            <Input
              crossOrigin={undefined}
              className="!border-gray-900 focus:!border-gray-900 w-full border-2 h-full flex items-center justify-center text-center text-xl"
              value={rpmMotor}
              onChange={handleChange}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          {/* <div className="w-full justify-center items-center flex flex-col px-72"> */}
          <div className="w-full h-40 mb-10 flex flex-col  items-center px-60 ">
            <div className="h-full w-full border-1 rounded-md border-black flex justify-center items-center text-xl flex-col gap-6">
              <Image
                src="/image/levels-scale.png"
                alt="Logo"
                width={80}
                height={20}
              />

              <div className="font-bold flex">
                Speed Nilai :{" "}
                {lastSpeedRpmMotor ? lastSpeedRpmMotor.speedRpm : 0}
              </div>
            </div>
            {/* </div> */}
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
