import React, { Component } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

class AreaGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avgArr: [
        { name: "1s" },
        { name: "2s" },
        { name: "3s" },
        { name: "4s" },
        { name: "5s" },
      ],
      seconds: this.props.seconds,
    };
    this.updateData = this.updateData.bind(this);
  }

  updateData() {
    if (this.props.seconds < 6) {
      let newAvgArr = this.state.avgArr.slice();
      newAvgArr[this.props.seconds - 1].Percent = this.props.avgValue;
      this.setState({ avgArr: newAvgArr });
    } else {
      if (this.state.avgArr.length >= 5) {
        this.setState({
          avgArr: this.state.avgArr.slice(1, this.state.avgArr.length + 1),
        });
      }

      this.setState(prevState => ({
        avgArr: [
          ...prevState.avgArr,
          { name: this.props.seconds + "s", Percent: this.props.avgValue },
        ],
      }));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.seconds !== this.props.seconds;
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateData();
    if (prevProps.seconds === this.props.seconds) {
      console.log(prevProps.seconds, "prevProps.seconds");
      console.log(this.props.seconds, "this.props.seconds");
    }
  }

  componentDidMount() {
    this.updateData();
  }

  render() {
    return (
      <div className="area-graph">
        <div className="chart-header">Area Chart</div>
        <ResponsiveContainer minHeight={300}>
          <AreaChart
            width={700}
            height={450}
            data={this.state.avgArr}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <XAxis dataKey="name" stroke="#4e4e4e" />
            <YAxis
              ticks={[0, 20, 40, 60, 80, 100]}
              domain={[0, 100]}
              stroke="#4e4e4e"
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Percent"
              stroke="#5b5b60"
              fill="#cacbce"
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default AreaGraph;
