import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import jwt from "jwt-decode";
import { useNavigate , useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { uploadImageThunk, getUserImageThunk, clearUploadInfo, clearUserImage } from "../../store/userSlice";
import styleVariables from "../../styles/main.scss";

function UserPage () {
  const [user, setUser] = useState({name: "Karenchik"});
  const [uploadStatus, setUploadStatus] = useState("");
  const [imageState, setImageState] = useState("")
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const location = useLocation();
  const uploadInfo = useSelector(function(state){
    return state.user.uploadInfo;
  })
  const userImage = useSelector(function(state){
    return state.user.userImage;
  })

  function signOut() {
     localStorage.removeItem("token");
     navigate("/signIn");
  }

  async function getBase64(file) {
    return new Promise((resolve, reject) => {
      var fr = new FileReader();  
      fr.onload = () => {
        resolve(fr.result )
      };
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  
 }

  function newImage(e) {
    const imageForm = new FormData();
    getBase64(e.target.files[0]).then((res) => {
      setImageState(res);
    });
    imageForm.append("token", localStorage.getItem("token"));
    imageForm.append("image", e.target.files[0]);
    dispatch(clearUploadInfo());
    dispatch(uploadImageThunk(imageForm));
  };

  useEffect(() => {
        if(uploadInfo.message) {
          setUploadStatus(uploadInfo.message);
        } else if (uploadInfo.token){
          localStorage.setItem("token", uploadInfo.token);
          setUploadStatus(uploadInfo.message);
        }
  }, [uploadInfo]);

  useEffect(() => {
      if (userImage) {
        setImageState(`data:image/jpeg;base64, ${userImage}`);
      }
   }, [userImage])

  useEffect( () => {
       const user = jwt(localStorage.getItem("token"));
       if (user.username !== location.pathname.slice(10,)){
          navigate("/NotFound");
       }
       setUser(user);
       if (user.filename) {
         dispatch(clearUserImage());
         dispatch(getUserImageThunk({filename:user.filename, token: localStorage.getItem("token")}));
       };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
              width: {xs: "300px", sm: "800px"},
              height: {xs: "400px", sm: "200px"},
              border: `1px solid ${styleVariables.mainColor1}`,
              boxShadow: `-1px 2px 21px 9px rgba(0,0,0,0.75)`,
              margin: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: {xs: "column", sm: "row"},
              backgroundColor: styleVariables.mainColor3,
            }} >
              <Box  sx={{
                  width: {xs: "100%", sm: "30%"},
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column"
                }} >
                  {imageState ? 
                  <Box sx={{width: "100px", height: "100px"}}>
                    <img src={imageState} alt="Not found" style={{width: "100%", height: "100%"}}/>
                  </Box> :
                 <AccountCircleIcon 
                   sx={{
                    fontSize: "50px",
                    color: styleVariables.mainColor1
                   }}/>
                  }
                   <TextField type="file" accept=".jpg,.jpeg,.png" onChange={newImage}/>
                   <Typography
                     color="red"
                     sx={{fontSize: "13px"}}>
                      {uploadStatus}
                   </Typography>
              </Box>
              <Box   sx={{
                  width: {xs: "100%", sm: "70%"},
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