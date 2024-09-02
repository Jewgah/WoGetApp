import React from "react";
import { Container } from "@mui/material";
import logo from "../../assets/images/icons/logo.png";

const ErrorPage = () => {
  return (
    <Container>
      <img src={logo} alt="" style={{ width: "30%" }} />
      <h2 className="headline font-primary">{"Page unavailable"}</h2>
      <p className="sub-content">
        {`The page you are trying to reach is currently not available.
                        This may be due to the fact that the page does not exist or has been moved.`}
      </p>
    </Container>
  );
};

export default ErrorPage;
