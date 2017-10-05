import React, { Component } from "react";

let tick = { plot0: 0 };

class MeterChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tick: this.props.avgValue,
    };
  }

  handleMeterChart() {
    window.feed = function(callback) {
      callback(JSON.stringify(tick));
    };

    let meterChartConfig = {
      type: "gauge",
      "background-color": "transparent",

      globals: {
        fontSize: 25,
      },
      plotarea: {
        marginTop: 80,
      },
      plot: {
        size: "100%",
        valueBox: {
          placement: "center",
          text: "%v", //default
          fontSize: 35,
          rules: [
            {
              rule: "%v <= 20",
              text: "%v<br>EXCELLENT",
            },
            {
              rule: "%v < 40 && %v > 20",
              text: "%v<br>Good",
            },
            {
              rule: "%v < 60 && %v > 40",
              text: "%v<br>Fair",
            },
            {
              rule: "%v > 60",
              text: "%v<br>Bad",
            },
          ],
        },
      },
      tooltip: {
        borderRadius: 5,
      },
      scaleR: {
        aperture: 200,
        minValue: 0,
        maxValue: 100,
        step: 10,
        center: {
          visible: false,
        },
        tick: {
          visible: false,
        },
        item: {
          offsetR: 0,
          rules: [
            {
              rule: "%i == 9",
              offsetX: 15,
            },
          ],
        },
        labels: ["0", "", "20", "", "40", "", "60", "", "80", "", "100"],
        ring: {
          size: 50,
          rules: [
            {
              rule: "%v >= 60",
              backgroundColor: "#E53935",
            },
            {
              rule: "%v > 40 && %v <= 60",
              backgroundColor: "#EF5350",
            },
            {
              rule: "%v > 20 && %v <= 40",
              backgroundColor: "#FFA726",
            },
            {
              rule: "%v <= 20",
              backgroundColor: "#29B6F6",
            },
          ],
        },
      },
      refresh: {
        type: "feed",
        transport: "js",
        url: "feed()",
        interval: 1000,
      },
      series: [
        {
          values: [0], // starting value
          backgroundColor: "black",
          indicator: [10, 10, 10, 10, 0.75],
          animation: {
            effect: 2,
            method: 1,
            sequence: 4,
            speed: 900,
          },
        },
      ],
    };

    window.zingchart.render({
      id: "meterChart",
      data: meterChartConfig,
      height: "500",
      width: "100%",
    });
  }

  componentDidUpdate() {
    tick.plot0 = this.props.avgValue;
  }

  componentDidMount() {
    this.handleMeterChart();
  }

  render() {
    return (
      <div className="meter-chart">
        <div className="chart-header">Meter Chart</div>
        <div id="meterChart" />
      </div>
    );
  }
}

export default MeterChart;
