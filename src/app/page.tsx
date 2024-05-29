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

  // Correctly handle the onChange event for Input
  // Note: Define the type of event as React.ChangeEvent<HTMLInputElement>
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rpmValue = parseInt(event.target.value, 10); // Convert the string to an integer
    if (!isNaN(rpmValue) && rpmValue <= 127) {
      setRpmMotor(rpmValue); // Set the rpm motor value if it's a valid number and within the range
    } else if (rpmValue > 127) {
      setRpmMotor(127); // Set rpm motor to maximum value if input exceeds 127
    } else {
      setRpmMotor(undefined); // Set to undefined or reset if the conversion fails or field is cleared
    }
  };

  return (
    <Master>
      <div className="flex min-h-screen flex-col items-center p-24 gap-4">
        <div className="h-20">
          <Input
            crossOrigin={undefined}
            className="h-20 w-96"
            label="Nilai rpm"
            value={rpmMotor}
            onChange={handleChange} // Use the handleChange function
          />
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
