import { useState } from "react";
import { ContactData } from "../api/contacts";
import { Typography, Box, Button, FormControl, TextField } from "@mui/material";
import "./AddContactForm.css";

interface Props {
  onAdd: (data: ContactData) => void;
}

const AddContactForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, birthdate });
    setName("");
    setBirthdate("");
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <Box component="div">
      {!showForm && (
        <Button onClick={handleClick} variant="contained" color="primary">
        <Typography variant="h3" component="div" sx={{ fontSize: '1.5rem' }}>+</Typography>
      </Button>
      )}
      {showForm && (
        <>
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
            <Box display="flex" justifyContent="center">
              <Box ml={1}>
                <Button type="submit" variant="contained" color="primary">
                  Add
                </Button>
              </Box>
              <Button onClick={handleCancel}>Cancel</Button>
            </Box>
          </form>
        </>
      )}
    </Box>
  );
};

export default AddContactForm;
