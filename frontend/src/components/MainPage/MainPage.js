import React from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

function MainPage() {
    const navigate = useNavigate();
    
   React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt(token);
      navigate(`/userPage/${decoded.username}`);
    } else {
      navigate("/signIn");
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

};

export default MainPage;