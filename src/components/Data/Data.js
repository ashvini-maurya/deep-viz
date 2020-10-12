import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import ChartWithTimestamp from "../ChartWithTimestamp/ChartWithTimestamp";
import ChartWithoutTimestamp from "../ChartWithoutTimestamp/ChartWithoutTimestamp";

const Data = () => {
  const [cvedata, setCVEdata] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [sliceData, setSliceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(
        "http://52.152.146.89:8007/cve-data.json"
      );
      setCVEdata(request.data);
      setPageCount(Math.ceil(request.data.length / 100));
      setSliceData(request.data.slice(0, 100));
      return request;
    };
    fetchData();
  }, []);

  const handlePageClick = (e) => {
    setSliceData(cvedata.slice(e * 100 - 100, e * 100));
  };

  return (
    <>
      <h2>Deepfence</h2>
      {sliceData?.length > 0 ? (
        <>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={(e) => handlePageClick(e.selected + 1)}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
          <ChartWithTimestamp cvedata={sliceData} />
          <ChartWithoutTimestamp cvedata={sliceData} />
        </>
      ) : (
        <p>Loading...!</p>
      )}
    </>
  );
};

export default Data;
