import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";

import AppWrapper from "../AppWrapper/AppWrapper";

import './app.scss';


function App() {
  const signInButtonStyles = {
    display: 'block',
    margin: '0 auto',
  };
  const appStyles = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center'
  }
  const [user, setUser] = useState({});
  function handleCallbackResponse(response) {
    const userObject = jwt_decode(response.credential);
    setUser(userObject);
    console.log(userObject.picture);
  }
  useEffect(() => {
    // global google
    google.accounts.id.initialize({ // eslint-disable-line
      client_id: "73960924910-ph4uk8o8l0at2al1ovi8ehgd2hegppi5.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton( // eslint-disable-line
        document.getElementById('signInDiv'),
        { theme: "outline", size: "large" }
    )
  }, []);

  return (
      <div className="app" style={Object.keys(user).length === 0 ? appStyles : null}>
        <div id='signInDiv' style={Object.keys(user).length === 0 ? signInButtonStyles : {display: "none"}}></div>
        {
            Object.keys(user).length !== 0
            &&
            <>
              <AppWrapper
                  logInPersonImg={user.picture}
                  logInPersonName={user.name}
              />
            </>
        }
      </div>
  );
}

export default App;
