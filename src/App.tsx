import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import LoginForm from "./components/LoginForm";
import ContactsList from "./components/ContactsList";
import AddContactForm from "./components/AddContactForm";
import { requestOTP, verifyOTPLogin, verifyOTPRegister } from "./api/auth";
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
  ContactData,
} from "./api/contacts";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (loggedIn) {
        try {
          const response = await getContacts();
          setContacts(response);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      }
    })();
  }, [loggedIn]);

  const handleRequestOTP = async (phone: string) => {
    try {
      const response = await requestOTP({ phone });
      console.log("OTP requested: ", response);
      setIsNewUser(response.isNewUser);
    } catch (error) {
      console.log("Request OTP error: ", error);
    }
  };

  const handleLogin = async (phone: string, otp: string) => {
    try {
      const response = await verifyOTPLogin({ phone, otp });
      localStorage.setItem("token", response.token);
      console.log("Login success: ", response);
      setLoggedIn(true);
    } catch (error) {
      console.log("Login error: ", error);
    }
  };

  const handleRegister = async (phone: string, otp: string) => {
    try {
      const response = await verifyOTPRegister({ phone, otp });
      localStorage.setItem("token", response.token);
      console.log("Register response:", response);
      setLoggedIn(true);
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  const handleAddContact = async (data: ContactData) => {
    try {
      await addContact(data);
      console.log("New contact added:", data);

      const response = await getContacts();
      setContacts(response);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleUpdateContact = async (contactId: string, data: ContactData) => {
    try {
      await updateContact(contactId, data);
      console.log("Updated contact:", data);

      const response = await getContacts();
      setContacts(response);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    try {
      await deleteContact(contactId);
      console.log("Deleted contact:", contactId);
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== contactId)
      );
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <Container maxWidth="md">
      <Box pt={4}>
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "center" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <CakeIcon sx={{ mr: 2, mb: .7, fontSize: "2rem" }} />
              <Box component="span" sx={{ mt: 1 }}>
                Birthday Whisperer
              </Box>
            </Typography>
          </Toolbar>
        </AppBar>
        {!loggedIn && (
          <LoginForm
            onLogin={handleLogin}
            onRegister={handleRegister}
            onRequestOTP={handleRequestOTP}
            isNewUser={isNewUser}
          />
        )}
        {loggedIn && (
          <>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <AddContactForm onAdd={handleAddContact} />
              </Grid>
              <Grid item xs={12}>
                <ContactsList
                  onUpdate={handleUpdateContact}
                  onDelete={handleDeleteContact}
                  contacts={contacts}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
}

export default App;
