import { ADD_COUNT } from '../../constants/reduxConst';

const initialState = {
  counter: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_COUNT: {
      return { ...state, counter: state.counter += 1 };
    }
    default:
      return state;
  }
}
