import { useEffect, useState } from "react";
import Api from "../service/Api";

const useMonitoring = () => {
  const [rpmMotor, setRpmMotor] = useState<number | undefined>(undefined);
  const [speedRpmMotor, setSpeedRpmMotor] = useState<any[]>([]);
  const [lastSpeedRpmMotor, setLastSpeedRpmMotor] = useState<any>();
  console.log(rpmMotor);

  const handleCreatedMonitoring = async () => {
    const api = new Api();
    api.url = "/motor-control/create";
    api.body = { rpmMotor: rpmMotor };
    const response = await api.call();
    console.log(response);
  };

  useEffect(() => {
    const fetchSpeed = async () => {
      const api = new Api();
      api.url = "/motor-control/get-speed-by-date";
      const response = await api.call();
      setSpeedRpmMotor(response.data);
    };

    fetchSpeed(); // Fetch initially

    const interval = setInterval(fetchSpeed, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    const fetchSpeed = async () => {
      const api = new Api();
      api.url = "/motor-control/get-lastspeed-by-date";
      const response = await api.call();
      console.log(response, "================================================");
      if (response.statusCode === 200) {
        setLastSpeedRpmMotor(response.data);
      }
      const interval = setInterval(fetchSpeed, 5000); // Fetch every 5 seconds

      return () => clearInterval(interval); // Cleanup interval on unmount
    };

    fetchSpeed(); // Fetch initially
  }, []);

  const handleStopMonitoring = async () => {
    const api = new Api();
    api.url = "/motor-control/send-command";
    const response = await api.call();
    console.log(response);
    setRpmMotor(0);
  };

  return {
    handleCreatedMonitoring,
    setRpmMotor,
    speedRpmMotor,
    handleStopMonitoring,
    rpmMotor,
    lastSpeedRpmMotor,
  };
};

export { useMonitoring };
