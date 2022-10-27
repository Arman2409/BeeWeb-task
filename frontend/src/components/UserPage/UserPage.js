import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { uploadImageThunk } from "../../store/userSlice";
import styleVariables from "../../styles/main.scss";

function UserPage () {
  const [user, setUser] = useState({name: "Karenchik"});
  const navigate = useNavigate();  
  const dispatch = useDispatch();

  function signOut() {
     localStorage.removeItem("token");
     navigate("/signIn");
  }

  function newImage(e) {
    console.log(e.target.value);
    const imageForm = new FormData();
    console.log(e.target.files)
    imageForm.append("token", localStorage.getItem("token"));
    imageForm.append("image", e.target.files[0]);
    console.log(imageForm);
    dispatch(uploadImageThunk(imageForm));
  };

    useEffect(() => {
       console.log(user);
    }, [user]);

    useEffect(() => {
       setUser(jwt(localStorage.getItem("token")));
    }, []);

    return (
       <Box
         sx={{
          display:"flex",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: styleVariables.backgroundColor1,
         }}>
          <Button 
           variant="contained"
           onClick={signOut}
           sx={{
            height: "30px",
            margin: "5px 0",
            position: "absolute",
            right: "5px"
           }}>
            Sign Out
          </Button>
          <Box 
            className="user-info-container"
            sx={{
              width: "800px",
              height: "200px",
              border: `1px solid ${styleVariables.mainColor1}`,
              boxShadow: `-1px 2px 21px 9px rgba(0,0,0,0.75)`,
              margin: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: styleVariables.mainColor3,
            }} >
              <Box  sx={{
                  width: "30%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column"
                }} >
                 <AccountCircleIcon 
                   sx={{
                    fontSize: "50px",
                    color: styleVariables.mainColor1
                   }}/>
                   <TextField type="file" accept=".jpg,.jpeg,.png" onChange={newImage}/>
              </Box>
              <Box   sx={{
                  width: "60%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column"
                }} >
                  <Typography
                    sx={{
                      color: styleVariables.mainColor1,
                      fontSize: {xs: "25px", md:"35px"},
                    }}>
                    {user.username}
                  </Typography>
                  <Typography
                    sx={{
                      color: styleVariables.mainColor2,
                      fontSize: {xs: "15px", md:"25px"},
                    }}>
                      {user.name}
                </Typography>
              </Box>
          </Box>
       </Box>
    )
}

export default UserPage;