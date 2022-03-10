import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export const pushSuccessMessage = (message: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.PUSH_MESSAGE,
      payload: {
        message,
        variant: "success",
      },
    });
  };
};

export const pushErrorMessage = (message: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.PUSH_MESSAGE,
      payload: {
        message,
        variant: "error",
      },
    });
  };
};
