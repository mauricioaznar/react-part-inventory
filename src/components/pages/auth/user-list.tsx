import * as React from "react";

import AddIcon from "@mui/icons-material/Add";
import {useHistory} from "react-router-dom";
import {Box, Fab, IconButton, Typography} from "@mui/material";
import {GetUsersQuery, useGetUsersQuery} from "../../../services/schema";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import {useTypedSelector} from "../../../hooks/redux-hooks/use-typed-selector";

export default function UserList() {
  const history = useHistory();
  const { data, loading } = useGetUsersQuery();

  if (loading) {
    return null;
  }

  function handleCreateClick() {
    history.push("/signInForm");
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container alignItems={"center"} mb={2}>
        <Grid item xs>
          {<Typography variant={"h4"}>Users</Typography>}
        </Grid>
        <Grid item>
          <Fab
            size={"small"}
            color="primary"
            aria-label="add"
            onClick={handleCreateClick}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell width={"10%"}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.users.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

function UserRow({ user }: { user: GetUsersQuery["users"][number] }) {
  const { currentUser } = useTypedSelector((state) => state.auth);

  const history = useHistory();

  //
  // const history = useHistory()
  //
  function handleEditClick() {
    history.push("/SignInForm", { user });
  }
  //
  //
  // async function onDelete(User: GetUsersQuery["users"][number]) {
  //     setDisabled(true)
  // }

  const isUserCurrent = currentUser?.id === user?.id;

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{user.username}</TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          {isUserCurrent ? (
            <IconButton
              size={"small"}
              onClick={() => {
                handleEditClick();
              }}
            >
              <CreateIcon fontSize={"small"} />
            </IconButton>
          ) : null}
          {isUserCurrent ? (
            <IconButton
              size={"small"}
              onClick={async () => {
                // await handleDeleteClick(todo)
              }}
            >
              <DeleteIcon fontSize={"small"} />
            </IconButton>
          ) : null}
        </Box>
      </TableCell>
    </TableRow>
  );
}
