const apiUrl =
  process.env.NODE_ENV === "development"
    ? "localhost:3006"
    : "sandbox-server.mauaznar.com";

export default apiUrl;
