import React from "react";

const initialState = {
  search: {
    countryTo: "",
    countryFrom: "",
    startDate: new Date(),
    returnDate: "",
  },
  detail: {
    data: [],
    currentPage: 1,
    isPrevPage: false,
    isNextPage: true,
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "updateViews":
      return {
        ...state,
        detail: { ...action.payload, data: [...action.payload.data] },
      };
    case "search":
      return {
        ...state,
        search: { ...action.payload },
      };
    default:
      return { ...state };
  }
}

export default reducer;
