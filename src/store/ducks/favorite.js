/**
 * types
 */
export const Types = {
  ADD_REQUEST: 'favorite/ADD_REQUEST',
  ADD_SUCESS: 'favorite/ADD_SUCESS',
  ADD_FAILURE: 'favorite/ADD_FAILURE',
};

/**
 * Reducers
 */
const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null,
};

export default function favorities(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.data],
        error: null,
      };
    case Types.ADD_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}

/**
 * Actions
 */
export const Creators = {
  addFavoriteRequest: repository => ({
    type: Types.ADD_REQUEST,
    payload: { repository },
  }),

  // REQUEST -> SAGA -> CHAMADA API -> METODO SUCCESS

  addFavoriteSuccess: data => ({
    type: Types.ADD_SUCESS,
    payload: { data },
  }),

  addFavoriteFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error },
  }),
};
