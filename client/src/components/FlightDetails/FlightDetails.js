import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./FlightDetails.css";
import HomePage from "../Home/HomePage";

const FlightDetails = ({ location }) => {
  const [apiData, setApiData] = useState({}),
    [gridData, setGridData] = useState([]),
    dispatch = useDispatch(),
    { state } = location,
    paginationData = useSelector((state) => state.detail),
    searchForm = useSelector((state) => state.search),
    isLoaded = apiData.data !== undefined;

  const createPaginationData = (data) => {
      const arrays = [];
      while (data.length) arrays.push(data.splice(0, 7));
      dispatch({
        type: "updateViews",
        payload: { ...paginationData, data: [...arrays] },
      });
    },
    getList = () => {
      const gridList = paginationData.data[paginationData.currentPage - 1].map(
        ({
          flightNumber,
          airlineName,
          arrival,
          arrivalTime,
          departureTime,
          departure,
          price,
          duration,
          stopsInTheWay,
        }) => (
          <div className={"item-container"}>
            <div className="item-content">
              <div className={"name"}>{airlineName}</div>
              <hr />
              <table>
                <tbody>
                  <tr>
                    <td className={"number"}>
                      <div>Flight Number</div>
                      <div>{flightNumber}</div>
                    </td>
                    <td className={"place-container"}>
                      <div className="source">
                        <div>Source</div>
                        <div>
                          {departure} @{departureTime}
                        </div>
                      </div>
                      <div className="destination">
                        <div>Destination</div>
                        <div>
                          {arrival} @{arrivalTime}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <div className="item-footer">
                <div className="stops">
                  <div>Total Stops</div>
                  <div>{stopsInTheWay}</div>
                </div>
                <div className="duration">
                  <div>Duration</div>
                  <div>{duration}</div>
                </div>
                <div className="price">
                  <div>Price</div>
                  <div>{price}</div>
                </div>
                <button className="btn">View Seats</button>
              </div>
            </div>
          </div>
        )
      );
      setGridData([...gridList]);
      dispatch({ type: "search", payload: { ...searchForm } });
    };

  useEffect(() => {
    if (isLoaded) {
      createPaginationData([...apiData.data]);
    }
  }, [apiData]);

  useEffect(() => {
    if (isLoaded) {
      getList();
    }
  }, [paginationData]);
  useEffect(() => {
    fetch("http://localhost:8080/search")
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);
      });
  }, []);
  return (
    <>
      <div className="detail-container">
        <div className="grid-1">
          <HomePage />
        </div>
        <div>
          {" "}
          <div className="pagination">
            <div className="pagination-grid">
              <button
                className="btn"
                disabled={!paginationData.isPrevPage}
                onClick={() => {
                  let updatedCurrentPage = {
                    currentPage: paginationData.currentPage - 1,
                    isNextPage: true,
                  };
                  if (paginationData.currentPage - 1 === 1)
                    updatedCurrentPage = {
                      ...updatedCurrentPage,
                      isPrevPage: false,
                    };
                  dispatch({
                    type: "updateViews",
                    payload: { ...paginationData, ...updatedCurrentPage },
                  });
                }}
              >
                Previous Page
              </button>
              <span>
                Page {paginationData.currentPage} of {apiData.totalPages}
              </span>
              <button
                className="btn"
                onClick={() => {
                  let updatedCurrentPage = {
                    currentPage: paginationData.currentPage + 1,
                    isPrevPage: true,
                  };
                  if (paginationData.currentPage + 1 === 5)
                    updatedCurrentPage = {
                      ...updatedCurrentPage,
                      isNextPage: false,
                    };
                  dispatch({
                    type: "updateViews",
                    payload: { ...paginationData, ...updatedCurrentPage },
                  });
                }}
                disabled={!paginationData.isNextPage}
              >
                Next Page
              </button>
            </div>
          </div>
          {gridData}
        </div>
      </div>
    </>
  );
};

export default FlightDetails;
