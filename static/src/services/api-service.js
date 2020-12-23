import axios from "axios";

const PREFIX = "http://localhost:4001/api";
export const login = (url, userDetails) => {
  return new Promise((res, rej) => {
    post(url, userDetails).then((result) => {
      res(result);
    });
  });
};
export const get = (url, userData) => {
  return new Promise((res, rej) => {
    request({ url, method: "get" }, userData).then((result) => {
      res(result);
    });
  });
};

export const post = (url, data, userData) => {
  return new Promise((res, rej) => {
    request({ url, method: "post", data }, userData).then((result) => {
      res(result);
    });
  });
};

export const put = (url, data, userData) => {
  return new Promise((res, rej) => {
    request({ url, method: "put", data }, userData).then((result) => {
      res(result);
    });
  });
};

export const deleteApi = (url, userData) => {
  return new Promise((res, rej) => {
    request({ url, method: "delete" }, userData).then((result) => {
      res(result);
    });
  });
};

const request = ({ method, url, data }, userData) => {
  return new Promise((res, rej) => {
    if (userData && Object.keys(userData).length || url.indexOf('login') !== -1) {
      url = `${PREFIX}${url}`;
      axios({
        method,
        url,
        data: { ...data, userData },
        headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer sample-token',
        },
      })
        .then((response) => {
          res(response.data);
        })
        .catch((error) => {
          console.log(error);
          rej(error);
        });
    }
  });
};
