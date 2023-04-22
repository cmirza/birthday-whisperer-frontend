import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import ContactsList from "./components/ContactsList";
import AddContactForm from "./components/AddContactForm";
import { login, register } from "./api/auth";
import { getContacts, addContact, updateContact, deleteContact, ContactData } from "./api/contacts";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [contacts, setContacts] = useState<ContactData[]>([]);

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

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login({ email, password });
      localStorage.setItem("token", response.token);
      console.log("Login success: ", response);
      setLoggedIn(true);
    } catch (error) {
      console.log("Login error: ", error);
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    phone: string
  ) => {
    try {
      const response = await register({ email, password, phone });
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
      setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== contactId));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="App">
      <h1>Login / Register</h1>
      <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
      {loggedIn && (
        <>
          <hr />
          <AddContactForm onAdd={handleAddContact} />
          <hr />
          <ContactsList onUpdate={handleUpdateContact} onDelete={handleDeleteContact} contacts={contacts} />
        </>
      )}
    </div>
  );
}

export default App;
