import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
    const navigate = useNavigate();
    
   React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/userPage");
    } else {
      navigate("/signIn");
    };
  }, []);

};

export default MainPage;