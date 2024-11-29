import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import MeterChart from "./components/MeterChart";
import AreaGraph from "./components/AreaGraph";
import FullScreenLoader from "./components/FullScreenLoader";

const App = () => {
  const [seconds, setSeconds] = useState(1);
  const [avgValue, setAvgValue] = useState(0);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://cpuusage.onrender.com/api")
        .then((response) => response.json())
        .then((data) => {
          setHasFetchedData(true);
          setAvgValue(data?.data?.averageCpuUsage);
          setSeconds((prev) => prev + 1);
        });
    };
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {!hasFetchedData && <FullScreenLoader />}
      <Header />
      <MeterChart avgValue={avgValue} />
      <AreaGraph avgValue={avgValue} seconds={seconds} />
    </div>
  );
};

export default App;
