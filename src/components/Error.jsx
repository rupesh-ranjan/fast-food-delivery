import { useRouteError } from "react-router-dom";

function Error() {
  console.log(useRouteError());
  return (
    <div className="error" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404</h1>
      <p>Page Not Found</p>
    </div>
  );
}

export default Error;
