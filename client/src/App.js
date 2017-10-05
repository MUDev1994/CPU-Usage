import React, { Component } from "react";
import Header from "./components/Header";
import MeterChart from "./components/MeterChart";
import AreaGraph from "./components/AreaGraph";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 1,
      avgValue: 0,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    fetch("http://localhost:3001/")
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        this.setState({
          avgValue: responseJson.data.avg,
          seconds: this.state.seconds + 1,
        });
      });
  }

  componentDidMount() {
    setInterval(this.fetchData, 1000);
  }

  render() {
    return (
      <div className="container">
        <Header />
        <MeterChart avgValue={this.state.avgValue} />
        <AreaGraph
          avgValue={this.state.avgValue}
          seconds={this.state.seconds}
        />
      </div>
    );
  }
}

export default App;
