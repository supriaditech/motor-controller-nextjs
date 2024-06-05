import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import * as XLSX from "xlsx";
import { Button } from "@material-tailwind/react";
import { useMonitoring } from "../../../../hooks/useMonitoring";

type DataPoint = {
  x: number;
  y: number;
};

export default function RealTimeChart({
  speedRpmMotor = [],
  handleDelete,
  pesanDelete,
  loadingDelete,
}: any) {
  const formatDataForChart = (data: any[]): DataPoint[] => {
    if (!Array.isArray(data)) return [];
    return data?.map((item) => ({
      x: item.seconds,
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
      type: "numeric",
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
      speedRpmMotor.map((item: any) => ({
        ID: item.id,
        "Speed RPM": item.speedRpm,
        "Nilai seconds": item.seconds,
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
      {data.length > 0 ? (
        <ReactApexChart
          options={chartOptions}
          series={[{ name: "Motor Speed RPM", data }]}
          type="line"
          height={500}
          width={1400}
        />
      ) : (
        <div className="flex justify-center items-center h-100 w-full">
          {pesanDelete ? pesanDelete.message : "data loading..."}
        </div>
      )}

      {data.length <= 0 && pesanDelete && (
        <div className="flex justify-center items-center h-100 w-full">
          {pesanDelete ? pesanDelete.message : "data loading..."}
        </div>
      )}
      <div className="flex gap-6">
        <Button onClick={exportToExcel} className="w-80 bg-green-500">
          Save to Excel
        </Button>
        <Button onClick={handleDelete} className="w-80 bg-green-500">
          Delete data
        </Button>
      </div>
    </>
  );
}
