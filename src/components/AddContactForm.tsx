import { useState } from "react";
import { ContactData } from "../api/contacts";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  FormControl,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  onAdd: (data: ContactData) => void;
}

const AddContactForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [open, setOpen] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, birthdate });
    setName("");
    setBirthdate("");
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <IconButton onClick={handleOpen} color="primary">
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Contact</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAdd}>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <Box>
                <FormControl margin="normal">
                  <TextField
                    id="name"
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ width: "308.5px" }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl margin="normal">
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
                    sx={{ width: "308.5px" }}
                  />
                </FormControl>
              </Box>
            </Box>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddContactForm;
