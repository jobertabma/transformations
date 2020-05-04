export const ACTION_UPDATE_INPUT = "ACTION_UPDATE_INPUT";
export const ACTION_UPDATE_OUTPUT = "ACTION_UPDATE_OUTPUT";
export const ACTION_HANDLE_RUN = "ACTION_HANDLE_RUN";
export const ACTION_TOGGLE_TRANSFORMATION = "ACTION_TOGGLE_TRANSFORMATION";
export const ACTION_RESET_MATCHES = "ACTION_RESET_MATCHES";
export const ACTION_ADD_MATCH = "ACTION_ADD_MATCH";
export const ACTION_RUN_START = "ACTION_RUN_START";
export const ACTION_RUN_STOP = "ACTION_RUN_STOP";

const reducer = (state, action = {}) => {
  switch (action.type) {
    case ACTION_UPDATE_INPUT:
      return {
        ...state,
        matches: [],
        input: action.value
      };
    case ACTION_UPDATE_OUTPUT:
      return {
        ...state,
        matches: [],
        output: action.value
      };
    case ACTION_TOGGLE_TRANSFORMATION:
      return {
        ...state,
        matches: [],
        transformations: {
          ...state.transformations,
          [action.value[0]]: action.value[1]
        }
      };
    case ACTION_RESET_MATCHES:
      return {
        ...state,
        matches: []
      };
    case ACTION_ADD_MATCH:
      return {
        ...state,
        matches: [...state.matches, action.value]
      };
    case ACTION_RUN_START:
      return {
        ...state,
        isRunning: true
      };
    case ACTION_RUN_STOP:
      return {
        ...state,
        isRunning: false
      };
    default:
      return state;
  }
};

export default reducer;
