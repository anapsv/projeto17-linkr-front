import axios from "axios";
import { APIHost } from "../config/config";

export async function sendComment(id, body, auth) {
  return axios
    .post(`${APIHost}comments/${id}`, body, auth)
    .then((res) => {
      return res.status;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
}

export async function fetchComments(id, auth) {
  return axios
    .get(`${APIHost}comments/${id}`, auth)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
}