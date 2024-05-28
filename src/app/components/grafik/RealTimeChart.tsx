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
    return data.map((item) => ({
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
      type: "bar",
      height: 350,
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 50000,
        },
      },
      toolbar: {
        show: true, // Enable the toolbar
        tools: {
          download: false, // Disable download tool
          selection: false, // Disable selection tool
          zoom: true, // Enable zoom tool
          zoomin: true, // Enable zoom in tool
          zoomout: true, // Enable zoom out tool
          pan: true, // Enable pan tool
          reset: true, // Enable reset tool
          customIcons: [], // You can add custom icons if needed
        },
        autoSelected: "zoom", // Default tool selection
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
      <ReactApexChart
        options={chartOptions}
        series={[{ name: "Motor Speed RPM", data }]}
        type="bar"
        height={350}
        width={800}
      />
      <Button onClick={exportToExcel} className="w-80">
        Save to Excel
      </Button>
    </>
  );
}
