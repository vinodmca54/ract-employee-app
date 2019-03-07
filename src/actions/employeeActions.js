export const getempdata = res => {
  return {
    type: "get_empdata",
    payload: res
  };
};
export const deleteEmpdata = data => {
  return {
    type: "delete_empdata",
    payload: data
  };
};

export const showmodel = () => {
  return {
    type: "show_model"
  };
};
