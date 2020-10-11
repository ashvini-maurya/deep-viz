import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "../Chart/Chart";

const Data = () => {
  const [cvedata, setCVEdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(
        "http://52.152.146.89:8007/cve-data.json"
      );
      setCVEdata(request.data);
      return request;
    };
    fetchData();
  }, []);

  console.log("hello: ", cvedata);

  return (
    <div>
      <h2>Deepfence</h2>
      {cvedata?.length > 0 ? <Chart cvedata={cvedata} /> : <p>Loading...!</p>}
    </div>
  );
};

export default Data;
