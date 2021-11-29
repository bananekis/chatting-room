import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";

export const color = {
  darkBlue: "#1f1fd3",
  lightBlue: "#0000ffc8",
  skyBlue: "#006cff",
  grey: "grey",
  green: "green",
  lightGreen: "lightgreen",
  white: "#fff",
  black: "#000",
};

// initialzie cookies

export const cookies = new Cookies();

// api config

export const apiKey = process.env.REACT_APP_API_KEY;
export const client = StreamChat.getInstance(`${apiKey}`);
export const authToken = cookies.get("token");

// server URL

export const URL = "http://localhost:5000/auth";
