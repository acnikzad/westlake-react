import React from "react";
import Chartist from "react-chartist";
import ChartistTooltip from "chartist-plugin-tooltips-updated";

const SalesValueChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [[1, 2, 2, 3, 3, 4, 3]],
  };

  const options = {
    low: 0,
    showArea: true,
    fullWidth: true,
    axisX: {
      position: "end",
      showGrid: true,
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      labelInterpolationFnc: (value) => `$${value / 1}k`,
    },
    plugins: [
      ChartistTooltip(), // Ensure this is correctly set
    ],
  };

  return (
    <Chartist
      data={data}
      options={options}
      type="Line"
      className="ct-series-g ct-double-octave"
    />
  );
};

const SalesValueChartphone = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [[1, 2, 2, 3, 3, 4, 3]],
  };

  const options = {
    low: 0,
    showArea: true,
    fullWidth: false,
    axisX: {
      position: "end",
      showGrid: true,
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      labelInterpolationFnc: (value) => `$${value / 1}k`,
    },
    plugins: [
      ChartistTooltip(), // Ensure this is correctly set
    ],
  };

  return (
    <Chartist
      data={data}
      options={options}
      type="Line"
      className="ct-series-g ct-major-tenth"
    />
  );
};

const CircleChart = (props) => {
  const { series = [], donutWidth = 20 } = props;
  const sum = (a, b) => a + b;

  const options = {
    low: 0,
    high: 8,
    donutWidth,
    donut: true,
    donutSolid: true,
    fullWidth: false,
    showLabel: false,
    labelInterpolationFnc: (value) =>
      `${Math.round((value / series.reduce(sum)) * 100)}%`,
    plugins: [
      ChartistTooltip(), // Ensure this is correctly set
    ],
  };

  return (
    <Chartist
      data={{ series }}
      options={options}
      type="Pie"
      className="ct-golden-section"
    />
  );
};

const BarChart = (props) => {
  const {
    labels = [],
    series = [],
    chartClassName = "ct-golden-section",
  } = props;
  const data = { labels, series };

  const options = {
    low: 0,
    showArea: true,
    axisX: {
      position: "end",
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      offset: 0,
    },
    plugins: [
      ChartistTooltip(), // Ensure this is correctly set
    ],
  };

  return (
    <Chartist
      data={data}
      options={options}
      type="Bar"
      className={chartClassName}
    />
  );
};

export { SalesValueChart, SalesValueChartphone, CircleChart, BarChart };
