import { useCallback, useReducer } from "react";

const httpReducer = (state, action) => {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: "pending",
    };
  }

  if (action.type === "SUCCESS") {
    return {
      status: "completed",
      error: null,
      data: action.responseData,
    };
  }

  if (action.type === "ERROR") {
    return {
      status: "completed",
      error: action.errorMessage,
      data: null,
    };
  }
  return state;
};

const useHttp = (requestFunction, startWithPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? "pending" : null,
    error: null,
    data: null,
  });

  const sendRequest = useCallback(
    async (requestData) => {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (error) {
        dispatch({
          type: "ERROR",
          errorMessage: error.message || "Something Went Wrong!",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
