import { useState } from "react";
import { ContactData } from "../api/contacts";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  TextField,
  Button,
} from "@mui/material";

interface Props {
  contact: ContactData;
  open: boolean;
  onUpdate: (contactId: string, data: ContactData) => void;
  onCancel: () => void;
}

const EditContactForm: React.FC<Props> = ({ contact, open, onUpdate, onCancel }) => {
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
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent>
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
          <DialogActions>
            <Button onClick={onCancel} color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditContactForm;
