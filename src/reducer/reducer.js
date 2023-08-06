const reducer = (state, action) => {
  switch (action.type) {
    //create data
    case 'CREATE_EVENT':
      return [...state, action.payload];

    //get data  
    case 'GET_EVENTS':
      return [...action.payload];

    //update data
    case 'UPDATE_EVENT':
      const { id, data } = action.payload;
      const updatedState = state.map((event) => {
        if (event._id === id) {
          return { ...event, ...data };
        }
        return event;
      });
      return updatedState;

    //delete data
    case 'DELETE_EVENT':
      const eventIdToDelete = action.payload;
      const filteredState = state.filter(
        (event) => event._id !== eventIdToDelete
      );
      //console.log(filteredState)
      return filteredState;

    default:
      return state;
  }
};

export default reducer;
