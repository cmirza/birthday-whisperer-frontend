import { useState } from "react";
import { ContactData } from "../api/contacts";
import { Box, Button, FormControl, TextField } from "@mui/material";

interface Props {
  contact: ContactData;
  onUpdate: (contactId: string, data: ContactData) => void;
  onCancel: () => void;
}

const EditContactForm: React.FC<Props> = ({ contact, onUpdate, onCancel }) => {
  const [name, setName] = useState(contact.name);
  const [birthdate, setBirthdate] = useState(
    new Date(contact.birthdate).toISOString().slice(0, 10)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contact._id) {
      onUpdate(contact._id, { name, birthdate });
      onCancel();
    }
  };

  return (
    <Box component="div">
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: "100%" }}
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
            sx={{ width: "100%" }}
          />
        </FormControl>
        <Box
          component="div"
          display="flex"
          justifyContent="center"
          marginTop="16px"
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginRight: "8px" }}
          >
            Update
          </Button>
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditContactForm;
