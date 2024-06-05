import { useEffect, useState } from "react";
import Api from "../service/Api";

const useMonitoring = () => {
  const [rpmMotor, setRpmMotor] = useState<number | undefined>(undefined);
  const [speedRpmMotor, setSpeedRpmMotor] = useState<any[]>([]);
  const [lastSpeedRpmMotor, setLastSpeedRpmMotor] = useState<any>();
  const [pesanDelete, setPesanDelete] = useState<any>();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleCreatedMonitoring = async () => {
    const api = new Api();
    api.url = "/motor-control/create";
    api.body = { rpmMotor: rpmMotor };
    const response = await api.call();
    console.log(response);
  };

  const handleResetMonitoring = async () => {
    const api = new Api();
    api.url = "/motor-control/create";
    api.body = { rpmMotor: -1 };
    const response = await api.call();
    setRpmMotor(0);
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

  const handleDelete = async () => {
    setLoadingDelete(true);
    const apiStop = new Api();
    apiStop.url = "/motor-control/send-command";
    const responseStop = await apiStop.call();
    console.log("responseStop", responseStop);
    setRpmMotor(0);
    if (responseStop.statusCode) {
      const api = new Api();
      api.url = "/motor-control/delete-speed-rpm";
      const response = await api.call();
      setPesanDelete(response);
      console.log("iniadlaah respone delete data", response.message);
      alert(response.message);
      setLoadingDelete(false);
    }
  };

  return {
    handleCreatedMonitoring,
    setRpmMotor,
    speedRpmMotor,
    handleStopMonitoring,
    rpmMotor,
    handleDelete,
    lastSpeedRpmMotor,
    handleResetMonitoring,
    pesanDelete,
    loadingDelete,
  };
};

export { useMonitoring };
