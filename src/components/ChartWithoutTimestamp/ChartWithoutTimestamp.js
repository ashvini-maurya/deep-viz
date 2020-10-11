import React, { useState } from "react";
import ApexChart from "react-apexcharts";

const ChartWithoutTimestamp = (props) => {
  let low = props.cvedata
    .filter((item) => item["cve_severity"] === "low")
    .reduce((a, b) => a + (b["cve_cvss_score"] || 0), 0);

  let medium = props.cvedata
    .filter((item) => item["cve_severity"] === "medium")
    .reduce((a, b) => a + (b["cve_cvss_score"] || 0), 0);

  let high = props.cvedata
    .filter((item) => item["cve_severity"] === "high")
    .reduce((a, b) => a + (b["cve_cvss_score"] || 0), 0);

  let critical = props.cvedata
    .filter((item) => item["cve_severity"] === "critical")
    .reduce((a, b) => a + (b["cve_cvss_score"] || 0), 0);

  const [state, setState] = useState({
    series: [low, medium, high, critical],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      title: {
        text: "Without Timestamp Visualization",
        align: "left",
      },
      labels: ["Low", "Medium", "High", "Critical"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <ApexChart
        options={state.options}
        series={state.series}
        type="pie"
        width={380}
      />
    </div>
  );
};

export default ChartWithoutTimestamp;
