import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const Updateuser = () => {
  const { id } = useParams();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://localhost:3000/update/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result["status"] === "success") setName(result["user"][0]["name"]);
        setEmail(result["user"][0]["email"]);
        setPassword(result["user"][0]["password"]);
        setAvatar(result["user"][0]["img"]);
      })
      .catch((error) => console.error(error));
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSumbit = (event) => {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: name,
      email: email,
      password: password,
      img: avatar,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3000/update/"+id, requestOptions)
      .then((response) => response.json())
      .then(result => {
        alert(result['message']);
        if (result["status"] === 'success') {
            // Provide a new URL for redirection
            window.location.href = "/"; // Replace with your desired URL
        }
    })
    .catch(error => console.log('error', error));
  };
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Update Users
        </Typography>
        <form onSubmit={handleSumbit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="img"
                label="Avatar"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setAvatar(e.target.value)}
                value={avatar}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};
