// 初始化状�?
const initState = {
};

export function __Name__(state = initState, action) {
  switch (action.type) {
    case 'RECEIVE_DEMO_DATA':
      return {
        ...state,
        demo: action.data
      };
    default:
      return { ...state };
  }
};
