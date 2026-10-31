import { useReducer, useEffect } from 'react';

const initialState = {
  loading: true,
  error: null,
  data: null,
};

function fetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: null };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function useFetch(fetchFn, dependencies = []) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    dispatch({ type: 'FETCH_INIT' });

    fetchFn(controller.signal)
      .then((data) => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILURE', payload: err.message || 'An error occurred' });
        }
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, dependencies);

  return state;
}