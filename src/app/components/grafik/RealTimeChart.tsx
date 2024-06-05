import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import * as XLSX from "xlsx";
import { Button } from "@material-tailwind/react";

type DataPoint = {
  x: number;
  y: number;
};

export default function RealTimeChart({
  speedRpmMotor = [],
}: {
  speedRpmMotor: any[];
}) {
  const formatDataForChart = (data: any[], startTime: Date): DataPoint[] => {
    if (!Array.isArray(data)) return [];
    return data?.map((item, index) => ({
      x: (new Date(item.createdAt).getTime() - startTime.getTime()) / 1000, // Calculate relative time since motor started
      y: item.speedRpm,
    }));
  };

  const [data, setData] = useState<DataPoint[]>([]);
  const [startTime, setStartTime] = useState<Date>(new Date());

  useEffect(() => {
    setStartTime(new Date()); // Set start time when component mounts
  }, []);

  useEffect(() => {
    setData(formatDataForChart(speedRpmMotor, startTime)); // Update data when speedRpmMotor changes
  }, [speedRpmMotor, startTime]);

  const chartOptions: ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      animations: {
        enabled: true,
        easing: "easein",
        dynamicAnimation: {
          speed: 50000,
        },
      },
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: false,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: [],
        },
        autoSelected: "zoom",
      },
    },
    xaxis: {
      type: "numeric",
      title: {
        text: "Seconds Since Start",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    const startTimeValue = startTime.getTime();
    const ws = XLSX.utils.json_to_sheet(
      speedRpmMotor.map((item) => ({
        ID: item.id,
        "Speed RPM": item.speedRpm,
        "Seconds Since Start":
          (new Date(item.createdAt).getTime() - startTimeValue) / 1000,
        "Created At": item.createdAt,
        "Updated At": item.updatedAt,
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Motor Speeds");
    XLSX.writeFile(wb, "MotorSpeeds.xlsx");
  };

  return (
    <>
      {data && data.length > 0 ? (
        <div>
          <ReactApexChart
            options={chartOptions}
            series={[{ name: "Motor Speed RPM", data }]}
            type="area"
            height={500}
            width={1400}
          />
          <Button onClick={exportToExcel} className="w-80">
            Save to Excel
          </Button>
        </div>
      ) : (
        <div className="h-72 w-full text-center border-2 rounded-md flex justify-center items-center">
          Data Not Found, pastikan server aktif
        </div>
      )}
    </>
  );
}
