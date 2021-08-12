import { useReducer } from "react";

const initialinputstate = {
  value: "",
  isTouhed: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }

  if (action.type === "RESET") {
    return {
      isTouched: false,
      value: "",
    };
  }
  return {
    initialinputstate,
  };
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialinputstate
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueCHangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    hasError: hasError,
    valueCHangeHandler: valueCHangeHandler,
    inputBlurHandler: inputBlurHandler,
    isValid: valueIsValid,
    reset: reset,
  };
};

export default useInput;
