import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { clearGroup } from '../reducers/group.slice';
import { saveThemeColor, saveThemeImage } from '../reducers/settings.slice';


  export const signin = (user, navigate, setLoading) => async (dispatch) => {
    fb.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log('Signed In user is: ', user.email);
       dispatch(fetchUserData(user.uid, "sigin", navigate, setLoading));
    })
    .catch((error) => {
      setLoading(false);
      var errorCode = error.code;
      var errorMessage = error.message;
      notifyErrorFxn(errorMessage);
      console.log('Error Code is: ', errorCode, + ' Msg is: ', errorMessage);
      dispatch(loginFailed(errorMessage));
    });

};


export const signup = (user, navigate, setLoading) => async (dispatch) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today = new Date();

  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };

  const randomRegistrationId = generateRandomString(10); 

  fb.auth().createUserWithEmailAndPassword(
    user.email,
    user.password
  ).then((res) => {
    console.log("Good to go...");
    return db.collection('teachers').doc(res.user.uid).set({
      teacherId: res.user.uid,
      registrationId: randomRegistrationId, 
      email: user.email,
      sname: user.sname,
      fname: user.fname,
      lname: user.lname,
      phone: user.phone,
      password: user.password,
      accountCreated: today.toLocaleDateString("en-US", options),
    })
  }).then(() => {
    notifySuccessFxn('Registered Successfully✔');
    navigate('/login', { replace: true });
  }).catch((err) => {
    console.error("Error signing up: ", err);
    var errorMessage = err.message;
    notifyErrorFxn(errorMessage);
    dispatch(signupFailed({ errorMessage }));
    setLoading(false);
  });
};


export const uploadImage = (user, file, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(signup(user, file, navigate, setLoading, url));
        });
    }
  );
}


export const fetchUserData = (id, type, navigate, setLoading) => async (dispatch) => {
  var user = db.collection("teachers").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    // console.log("User Data:", doc.data());
    dispatch(storeUserData(doc.data()));
    if(type === "sigin"){
      notifySuccessFxn("Logged In😊");
      navigate('/dashboard/home', { replace: true });
    }
  } else {
      setLoading(false);
      notifyErrorFxn("Unauthorized❌")
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};


export const uploadProfileImage = (profileData, file, userID, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(updateProfile(profileData, userID, file, navigate, setLoading, url));
        });
    }
  );
}


export const updateProfile = (profileData, userID, file, navigate, setLoading, url) => async (dispatch) => {
  // return  
  db.collection('employees').doc(userID).update({
    paymentLink: profileData.paymentLink,
    imageUrl: url,
  }).then((res)=>{
       if(profileData?.password){
        //update password start
        const user = auth.currentUser;
        user.updatePassword(profileData.password)
          .then(() => {
            setLoading(false);
            console.log("Password updated successfully");
            notifySuccessFxn("Updated successfully");
            navigate('/dashboard/home', { replace: true });
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error updating password: ", error);
            notifyErrorFxn(error.message);
          });
       //update password end
       }else{
        setLoading(false);
        console.error("No Password to update");
        notifySuccessFxn("Updated successfully");
        navigate('/dashboard/home', { replace: true });
       }
     
  }).catch((err) => {
    setLoading(false);
    console.log("ERR-: ", err);
  })
}






export const uploadProfileSettings = (userPreferences, file, userID) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name-->: ', imageName);
  const uploadTask = storage.ref(`theme_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("theme_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(updateUserSettings(userPreferences, userID, url));
        });
    }
  );
}




export const updateUserSettings = (userPreferences, userID,url) => async (dispatch) => {
  // return  

  db.collection('admin').doc(userID).get().then((dac)=>{

  if(url){
    userPreferences = {...userPreferences,themeImageUnsaved:url}
  }

  console.log("STORED URL-->",url)


if(!userPreferences.themeImageUnsaved ||userPreferences.themeImageUnsaved[0] !== '#' )
{

  db.collection('admin').doc(userID).update({
    settings:{themeColor:userPreferences.themeColorUnsaved,
              themeImage: dac.data().settings.themeImage
            }
    }
    
   ).then((res)=>{
        if(userPreferences?.password){
         //update password start
         const user = auth.currentUser;
         user.updatePassword(userPreferences.password)
           .then(() => {
             //setLoading(false);
             console.log("our first update to the database went swimmingly");
            // notifySuccessFxn("Updated successfully");
            // navigate('/dashboard/home', { replace: true });
           })
           .catch((error) => {
             //setLoading(false);
             console.error("Error updating ,first update to db: ", error);
             notifyErrorFxn(error.message);
           });
        //update password end
        }else{
         //setLoading(false);
         console.error("No Password to update");
         notifySuccessFxn("Updated successfully");
         //navigate('/dashboard/home', { replace: true });
        }
      
   }).catch((err) => {
     //setLoading(false);
     console.log("ERR-: ", err);
   })


}


  else{
  db.collection('admin').doc(userID).update({
    settings:{themeColor:userPreferences.themeColorUnsaved,
      themeImage: userPreferences.themeImageUnsaved,
    }
   
  }).then((res)=>{
       if(userPreferences?.password){
        //update password start
        const user = auth.currentUser;
        user.updatePassword(userPreferences.password)
          .then(() => {
            //setLoading(false);
            console.log("our first update to the database went swimmingly");
           
           // navigate('/dashboard/home', { replace: true });
          })
          .catch((error) => {
            //setLoading(false);
            console.error("Error updating ,first update to db: ", error);
            notifyErrorFxn(error.message);
          });
       //update password end
       }else{
        //setLoading(false);
        console.error("No Password to update");
        notifySuccessFxn("Updated successfully");
        //navigate('/dashboard/home', { replace: true });
       }
     
  }).catch((err) => {
    //setLoading(false);
    console.log("ERR-: ", err);
  })

}


  }) //END OF INITIAL GET OF ADMIN DATA


  db.collection('admin').doc(userID).get().then((doc)=>{

    dispatch(saveThemeImage(doc.data().settings.themeImage))
    dispatch(saveThemeColor(doc.data().settings.themeColor))

  }).then(()=>{
    notifySuccessFxn("Updated successfully");
  })


}


export const logout = (navigate) => async (dispatch) => {
  fb.auth().signOut().then(() => {
    dispatch(logoutFxn());
    dispatch(clearUser());
    dispatch(clearGroup());
  navigate('/login'/*, { replace: true }*/);
  notifySuccessFxn("Logged out!")
    console.log('logout successful!');
  }).catch((error) => {
    // An error happened.
    console.log('logout failed response: ', error.message);
  });
  
}