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
  const formatDataForChart = (data: any[]): DataPoint[] => {
    if (!Array.isArray(data)) return [];
    return data?.map((item) => ({
      x: new Date(item.createdAt).getTime(),
      y: item.speedRpm,
    }));
  };

  const [data, setData] = useState<DataPoint[]>(
    formatDataForChart(speedRpmMotor)
  );

  useEffect(() => {
    setData(formatDataForChart(speedRpmMotor));
  }, [speedRpmMotor]);

  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      animations: {
        enabled: true,
        easing: "easeout",
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
      type: "datetime",
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
    const ws = XLSX.utils.json_to_sheet(
      speedRpmMotor.map((item) => ({
        ID: item.id,
        "Speed RPM": item.speedRpm,
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
        <ReactApexChart
          options={chartOptions}
          series={[{ name: "Motor Speed RPM", data }]}
          type="line"
          height={500}
          width={1400}
        />
      ) : (
        <div className="h-72 w-full text-center border-2 rounded-md flex justify-center items-center">
          Data Not Found, pastikan server aktif
        </div>
      )}
      <Button onClick={exportToExcel} className="w-80">
        Save to Excel
      </Button>
    </>
  );
}
