import axios from "axios";
export default axios.create({
  baseURL: "https://fitkidcateringapp.azurewebsites.net",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});
