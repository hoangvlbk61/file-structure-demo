import REDUX_TYPES from "../const/redux-types";
const reducer = (state = {}, action) => {
  switch (action.type) {
    case REDUX_TYPES.POST.RECV_DATA:
      const { payload } = action;
      const { dataTypes, data, actionType, status } = payload;
      let newState = { ...state };
      var message;
      switch (actionType) {
        case "fetch":
          newState[dataTypes] = data;
          message = "Tải dữ liệu";
          break;
        case "create":
          message = "Tạo mới";
          break;
        case "update":
          message = "Cập nhật";
          break;
        case "delete":
          message = "Xóa";
          break;
        default:
          return state;
      }
      if (actionType !== "fetch")
        return {
          ...newState,
          loadingStatus: false,
          notification: {
            message: `${message} ${status === 200 ? "thành công" : "thất bại"}`,
            type: status === 200 ? "success" : "danger"
          }
        };
      else
        return {
          ...newState,
          loadingStatus: false
        };
    case REDUX_TYPES.POST.CHANGE_NOTI:
      return {
        ...state,
        notification: undefined
      };
    case REDUX_TYPES.POST.CREATE:
      return {
        ...state,
        loadingStatus: true
      };
    case REDUX_TYPES.POST.UPDATE:
      return {
        ...state,
        loadingStatus: true
      };
    case REDUX_TYPES.POST.DELETE:
      return {
        ...state,
        loadingStatus: true
      };
    case REDUX_TYPES.POST.FETCH:
      return {
        ...state,
        loadingStatus: true
      };
    default:
      return {
        ...state
      };
  }
};

export default reducer;
