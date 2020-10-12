import React, { useState } from "react";
import ApexChart from "react-apexcharts";
import moment from "moment";

const ChartWithTimestamp = (props) => {
  const [timestampData] = useState({
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        curve: "smooth",
        dashArray: 0,
      },
      title: {
        text: "Timestamp Visualization",
        align: "left",
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ""
          );
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: props.cvedata.map((item) =>
          moment(item["@timestamp"]).format("DD-MM-YYYY HH:mm:ss")
        ),
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val;
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val;
              },
            },
          },
          {
            title: {
              formatter: function (val) {
                return val;
              },
            },
          },
        ],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
    series: [
      {
        name: "Low",
        data: props.cvedata
          .filter((item) => item["cve_severity"] === "low")
          .map((score) => score["cve_cvss_score"]),
      },
      {
        name: "Medium",
        data: props.cvedata
          .filter((item) => item["cve_severity"] === "medium")
          .map((score) => score["cve_cvss_score"]),
      },
      {
        name: "High",
        data: props.cvedata
          .filter((item) => item["cve_severity"] === "high")
          .map((score) => score["cve_cvss_score"]),
      },
      {
        name: "Critical",
        data: props.cvedata
          .filter((item) => item["cve_severity"] === "critical")
          .map((score) => score["cve_cvss_score"]),
      },
    ],
  });

  return (
    <div>
      <ApexChart
        options={timestampData.options}
        series={timestampData.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ChartWithTimestamp;
