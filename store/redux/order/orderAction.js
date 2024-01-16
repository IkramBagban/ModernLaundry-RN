export const ADD_ORDER = 'ADD_ORDER';
export const FETCH_ORDERS = 'FETCH_ORDERS';

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const date = new Date();
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://your-api-url.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const responseData = await response.json();

    dispatch({
      type: ADD_ORDER,
      payload: {
        id: responseData.name,
        items: cartItems,
        totalAmount: totalAmount,
        date: date,
      },
    });
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://your-api-url.com/orders/${userId}.json`,
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      const loadedOrders = [];

      for (const key in responseData) {
        loadedOrders.push({
          id: key,
          items: responseData[key].cartItems,
          totalAmount: responseData[key].totalAmount,
          date: new Date(responseData[key].date),
        });
      }

      dispatch({
        type: FETCH_ORDERS,
        payload: loadedOrders,
      });
    } catch (err) {
      throw err;
    }
  };
};
