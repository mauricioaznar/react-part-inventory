const apiUrl =
  process.env.NODE_ENV === "development"
    ? "localhost:3007"
    : "subnautica-server.mauaznar.com";

export default apiUrl;
