export const baseURL =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:9000/api/users"
    : process.env.REACT_APP_API_BASE_URL;
