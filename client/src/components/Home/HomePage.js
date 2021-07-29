import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-date-picker";
import { addDays } from "date-fns";
import "./HomePage.css";
const HomePage = (props) => {
  const [countryList, setCountryList] = useState(""),
    [isFormValid, setIsFormValid] = useState(false),
    country = useSelector((state) => state.search),
    dispatch = useDispatch(),
    history = useHistory(),
    getPathValue = (obj, path, defaultValue = null) =>
      obj ? obj[path] || defaultValue : defaultValue,
    validateForm = () => {
      if (country.startDate && country.countryFrom && country.countryTo) {
        console.group("True");
        return setIsFormValid(true);
      }
      return setIsFormValid(false);
    };

  const clickHandler = (event) => {
      event.preventDefault();
      dispatch({ type: "search", payload: { ...country } });
      history.push({
        pathname: "/viewDetail",
        state: {
          ...country,
        },
      });
    },
    clearDisabled = () => {
      const disabledObj = countryList.find((item) => item.isdisabled);
      const nonDisabledOptionList = countryList.filter(
        (item) => !item.isdisabled
      );
      if (disabledObj) {
        delete disabledObj["isdisabled"];
        return setCountryList([...nonDisabledOptionList, disabledObj]);
      }

      return setCountryList([...nonDisabledOptionList]);
    },
    setDisabled = (value) => {
      clearDisabled();
      const selectedObj = countryList.find((item) => item.value == value),
        nonSelectedList = countryList.filter((item) => item.value != value);
      if (selectedObj) {
        selectedObj.isdisabled = true;
        setCountryList([...nonSelectedList, selectedObj]);
      }
    },
    fromCountryChangeHandler = (e) => {
      const value = getPathValue(e, "value");
      setDisabled(value);
      dispatch({ type: "search", payload: { ...country, countryFrom: value } });
    },
    toCountryChangeHandler = (e) => {
      const value = getPathValue(e, "value");
      setDisabled(value);
      dispatch({ type: "search", payload: { ...country, countryTo: value } });
    };
  useEffect(() => validateForm(), [country]);

  useEffect(() => {
    fetch("http://localhost:8080/countries")
      .then((response) => response.json())
      .then((data) => setCountryList(data));
  }, []);

  return (
    <div>
      <h3>Search For Your Flight</h3>
      <div className={"container"}>
        <div className={"section"}>
          <label>Source City: </label>
          <Select
            className={"section-value"}
            onChange={fromCountryChangeHandler}
            options={countryList}
            defaultValue={{
              label: country.countryFrom,
              value: country.countryFrom,
            }}
            isOptionDisabled={(option) => option.isdisabled}
            isClearable
          />
        </div>
        <div className={"section"}>
          <label>Destination City: </label>
          <Select
            className={"section-value"}
            defaultValue={{
              label: country.countryTo,
              value: country.countryTo,
            }}
            options={countryList}
            isClearable
            onChange={toCountryChangeHandler}
            isOptionDisabled={(option) => option.isdisabled}
          />
        </div>
        <div className={"section"}>
          <label>Travel Date</label>
          <DatePicker
            className={"section-value"}
            required={true}
            minDate={new Date()}
            value={country.startDate}
            onChange={(date) =>
              dispatch({
                type: "search",
                payload: { ...country, startDate: date },
              })
            }
            maxDate={addDays(new Date(), 365)}
          />
        </div>
        <div className={"section"}>
          <label>Return Date</label>
          <DatePicker
            className={"section-value"}
            minDate={country.startDate}
            value={country.returnDate}
            onChange={(date) =>
              dispatch({
                type: "search",
                payload: { ...country, returnDate: date },
              })
            }
            maxDate={addDays(new Date(), 365)}
          />
        </div>
      </div>
      <div className={"btn-container"}>
        <button
          disabled={!isFormValid}
          className={"search-button"}
          type="submit"
          onClick={clickHandler}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default HomePage;
