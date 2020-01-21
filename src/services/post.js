import axios from "axios";
import API from "../const/api";
import Constant from "../const/constant";

export const fetchs = () => {
    return new Promise((resolve, reject) => {
      try {
        axios({
          method: Constant.METHOD_API.GET,
          url: API.POST.FETCH
        })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      } catch (error) {}
    });
  };

export const fetchLazy = (pageNo, pageSize) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: Constant.METHOD_API.GET,
        url: API.POST.FETCH_LAZY(pageNo, pageSize),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => {
            console.log("EDIT: response: ", res);
            
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    } catch (error) {}
  });
};

export const creates = payload => {
  console.log("payload create : ", payload);
  
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: Constant.METHOD_API.POST,
        url: API.POST.CREATE,
        headers: {
            Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: payload
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    } catch (error) {
      console.log("Error is: ", error);
    }
  });
};

export const updates = payload => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: Constant.METHOD_API.PUT,
        url: API.POST.UPDATE(payload.id),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: payload
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    } catch (error) {
      console.log("Error is: ", error);
    }
  });
};

export const deletes = id => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        method: Constant.METHOD_API.DELETE,
        url: API.POST.DELETE(id),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
        .then(res => {
            console.log("DELETE response: ", res);
            
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    } catch (error) {
      console.log("Error is: ", error);
    }
  });
};
