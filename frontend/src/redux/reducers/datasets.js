const datasets = (state = [], action) => {
  switch (action.type) {
    case 'ADD_DATASET':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    default:
      return state;
  }
};

export default datasets;
