import React, { useRef } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate()
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const rePasswordRef = useRef("");

  function validate(username, email, password, rePassword) {
    if (username.current.value.length < 3) {
      alert("Username yaroqli emas!!");
      username.current.focus();
      username.current.style.outlineColor = "red";
      return false;
    }

    if (email.current.value.length < 3) {
      alert("Email yaroqli emas!!");
      email.current.focus();
      email.current.style.outlineColor = "red";
      return false;
    }

    if (password.current.value.length < 3) {
      alert("Password yaroqli emas!!");
      password.current.focus();
      password.current.style.outlineColor = "red";
      return false;
    }

    if (rePassword.current.value.length < 3) {
      alert("rePassword yaroqli emas!!");
      rePassword.current.focus();
      rePassword.current.style.outlineColor = "red";
      return false;
    }

    if (password.current.value !== rePassword.current.value) {
      alert("Password va rePassword bir xil bo'lishi shart!!");
      rePassword.current.value = "";
      rePassword.current.focus();
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const isValid = validate(usernameRef, emailRef, passwordRef, rePasswordRef);

    if (!isValid) {
      return;
    }

    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data =>{
      if(data.message == "User registered successfully!"){
        navigate('/login')
      }

      if(data.message == "Failed! Username is already in use!"){
        alert("Failed! Username is already in use!")
        usernameRef.current.value = ''
      }

      if(data.message == "Failed! Email is already in use!"){
        alert("Failed! Email is already in use!")
        emailRef.current.value = ''
      }
    })
    .catch(err =>{
      console.log(err);
    })
      
  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input ref={usernameRef} type="text" placeholder="Enter username..." />
        <input ref={emailRef} type="email" placeholder="Enter your email..." />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <input
          ref={rePasswordRef}
          type="password"
          placeholder="Re-enter password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
