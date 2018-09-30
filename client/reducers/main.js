const initialState = {
  mainState: 'init'
};

export default function main(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_STATE': {
      return {
        mainState: action.payload,
      };
    }
    default:
      return state;
  }
}
