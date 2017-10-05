const express = require("express");
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});

app.use(cors());

let intervalStarted = false;
const os = require("os");
let avg = 0;
let n = 2;

function cpuAverage() {
  let totalIdle = 0,
    totalTick = 0;
  let cpus = os.cpus();

  for (let i = 0, len = cpus.length; i < len; i++) {
    let cpu = cpus[i];
    for (type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  }

  return {
    idle: totalIdle / cpus.length,
    total: totalTick / cpus.length
  };
}

let startTimes = cpuAverage();

function startInterval() {
  setInterval(function () {
    let endTimes = cpuAverage();
    let idleDelta = endTimes.idle - startTimes.idle;
    let totalDelta = endTimes.total - startTimes.total;
    let percentageCPU = 100 - ~~(100 * idleDelta / totalDelta);
    avg = parseFloat((avg + (percentageCPU - avg) / n).toFixed(2));
    console.log(avg + "% CPU Usage.");
    startTimes = endTimes;
  }, 1000);
}
app.get("/", function (req, res) {
  if (!intervalStarted) {
    startInterval();
    intervalStarted = true;
  }

  res.json({
    message: "ok",
    data: {
      avg
    },
  });
});

app.get("*", function (req, res) {
  res.status(404).send({
    message: "Oops! Not found."
  });
});