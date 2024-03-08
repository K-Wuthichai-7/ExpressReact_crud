import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "@mui/material";

export default function Users() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    UserGet();
  }, []);

  const UserGet = () => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((result) => {
        const itemsWithUUID = result.map((item) => ({
          ...item,
          uuid: uuidv4(),
        }));
        setUser(itemsWithUUID);
      });
  };

  //update user
  const EditUser = (id) => {
    window.location = "/update/" + id;
  };

  //delete user
  const DeleteUser = (id) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch("http://localhost:3000/user/" + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result['message']);
        if (result['status'] === 'success') {
          UserGet();
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>CRUD USERS</Typography>
      <Box sx={{ margin: "10px 0", textAlign: "left" }}>
        <Link href="/create">
          <Button variant="contained" color="success">Add new users</Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">id</TableCell>
              <TableCell align="center">Avtar</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((row, index) => (
              <TableRow key={row.uuid}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  <Avatar alt={row.name} src={row.img} />
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" color="error" onClick={() => DeleteUser(row.id)}>
                    <DeleteIcon />
                  </Button>
                  <Button variant="outlined" onClick={() => EditUser(row.id)}>
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
