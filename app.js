const express = require("express");
const cors = require("cors");
const path = require("path");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3002;
let isIntervalRunning = false;
let avg = 0;
const smoothingFactor = 2;

// Middleware setup
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Function to calculate CPU average
function calculateCpuAverage() {
  const cpus = os.cpus();
  let totalIdle = 0;
  let totalTick = 0;

  cpus.forEach(cpu => {
    for (const timeType in cpu.times) {
      totalTick += cpu.times[timeType];
    }
    totalIdle += cpu.times.idle;
  });

  return {
    idle: totalIdle / cpus.length,
    total: totalTick / cpus.length,
  };
}

// Initialize CPU average
let previousCpuTimes = calculateCpuAverage();

// Function to start the CPU usage interval
function monitorCpuUsage() {
  setInterval(() => {
    const currentCpuTimes = calculateCpuAverage();
    const idleDifference = currentCpuTimes.idle - previousCpuTimes.idle;
    const totalDifference = currentCpuTimes.total - previousCpuTimes.total;
    const currentCpuUsage = 100 - Math.floor((100 * idleDifference) / totalDifference);

    // Smooth out the average using exponential moving average
    avg = parseFloat(
      (avg + (currentCpuUsage - avg) / smoothingFactor).toFixed(2)
    );

    console.log(`CPU Usage: ${avg}%`);
    previousCpuTimes = currentCpuTimes;
  }, 1000);
}

// API endpoint to get the current CPU usage average
app.get("/api", (req, res) => {
  if (!isIntervalRunning) {
    monitorCpuUsage();
    isIntervalRunning = true;
  }

  res.json({
    message: "ok",
    data: {
      avg,
    },
  });
});

// Catch-all route to serve the client application
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
