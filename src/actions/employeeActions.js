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
  console.log("nowwwwwwwwwaction");
  return {
    type: "show_model"
  };
};

export const hidemodel = () => {
  console.log("nowwwwwwwwwaction");
  return {
    type: "hide_model"
  };
};
