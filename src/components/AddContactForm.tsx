import { useState } from "react";
import { ContactData } from "../api/contacts";
import { Box, Button, FormControl, TextField } from "@mui/material";
import "./AddContactForm.css";

interface Props {
  onAdd: (data: ContactData) => void;
}

const AddContactForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, birthdate });
    setName("");
    setBirthdate("");
  };

  return (
    <Box component="div">
      <h2>Add Contact</h2>
      <form onSubmit={handleAdd}>
        <FormControl fullWidth margin="normal">
          <TextField
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            id="birthdate"
            label="Birthdate"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: "1900-01-01",
              max: "2099-12-31",
            }}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </form>
    </Box>
  );
};

export default AddContactForm;
