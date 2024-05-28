import { useEffect, useState } from "react";
import Api from "../service/Api";

const useMonitoring = () => {
  const [rpmMotor, setRpmMotor] = useState<number>();
  const [speedRpmMotor, setSpeedRpmMotor] = useState<any>();
  console.log(rpmMotor);
  const handleCreatedMonitoring = async () => {
    const api = new Api();
    api.url = "/motor-control/create";
    api.body = { rpmMotor: rpmMotor };
    const respone = await api.call();
    console.log(respone);
  };

  useEffect(() => {
    const facthSpeed = async () => {
      const api = new Api();
      api.url = "/motor-control/get-speed-by-date";
      const respone = await api.call();
      setSpeedRpmMotor(respone.data);
    };
    facthSpeed();
  }, [speedRpmMotor]);

  const handleStopMonitoring = async () => {
    const api = new Api();
    api.url = "/motor-control/send-command";
    const respone = await api.call();
    console.log(respone);
    setRpmMotor(0);
  };
  return {
    handleCreatedMonitoring,
    setRpmMotor,
    speedRpmMotor,
    handleStopMonitoring,
    rpmMotor,
  };
};

export { useMonitoring };
