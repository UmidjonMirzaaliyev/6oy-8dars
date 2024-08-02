import React, { useRef } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  function validate(username, password) {
    if (username.current.value.length < 3) {
      alert("Username yaroqli emas!!");
      username.current.focus();
      username.current.style.outlineColor = "red";
      return false;
    }

    if (password.current.value.length < 3) {
      alert("Password yaroqli emas!!");
      password.current.focus();
      password.current.style.outlineColor = "red";
      return false;
    }
  }
  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if(data.message == "User Not found."){
          alert(data.message)
          return
        }

        if(data.message == "Invalid Password!"){
          alert(data.message)
          return
        }

        if(data.accessToken){
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("token", JSON.stringify(data.accessToken))
          navigate('/')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <form className={styles.form}>
        <input ref={usernameRef} type="text" placeholder="Enter username..." />
        <input ref={passwordRef} type="password" placeholder="Password" />

        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
}

export default Login;
