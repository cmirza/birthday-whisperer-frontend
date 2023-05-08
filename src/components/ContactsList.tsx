import { useState, useEffect, Fragment } from "react";
import { ContactData } from "../api/contacts";
import EditContactForm from "./EditContactForm";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  contacts: ContactData[];
  onUpdate: (contactId: string, data: ContactData) => void;
  onDelete: (contactId: string) => void;
}

const ContactsList: React.FC<Props> = ({ contacts, onUpdate, onDelete }) => {
  const [editingContact, setEditingContact] = useState<string | null>(null);
  const [addSnackbarOpen, setAddSnackbarOpen] = useState(true);
  const [editSnackbarOpen, setEditSnackbarOpen] = useState(true);

  const handleEdit = (contactId: string) => {
    setEditingContact(contactId);
  };

  const handleCancel = () => {
    setEditingContact(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
    const adjustedDate = new Date(date.getTime() + timezoneOffset);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(adjustedDate);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAddSnackbarOpen(false);
    }, 15000); // 15 seconds
  
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setEditSnackbarOpen(false);
    }, 15000); // 15 seconds
  
    return () => {
      clearTimeout(timer);
    };
  }, []);
  

  return (
    <div>
      <List>
        {contacts.map((contact) => (
          <Fragment key={contact._id}>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ListItemText
                primary={contact.name}
                secondary={formatDate(contact.birthdate)}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => contact._id && handleEdit(contact._id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => contact._id && onDelete(contact._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <EditContactForm
              contact={contact}
              open={editingContact === contact._id}
              onUpdate={onUpdate}
              onCancel={handleCancel}
            />
          </Fragment>
        ))}
      </List>
      <Snackbar
      open={addSnackbarOpen}
      autoHideDuration={15000}
      onClose={() => setAddSnackbarOpen(false)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ marginTop: "4rem" }}
    >
      <Alert onClose={() => setAddSnackbarOpen(false)} severity="info">
        To add contacts, click the "+" button in the bottom right corner.<br />
        To access settings, click the gear icon in the top right corner.
      </Alert>
    </Snackbar>
    <Snackbar
      open={editSnackbarOpen}
      autoHideDuration={15000}
      onClose={() => setEditSnackbarOpen(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={() => setEditSnackbarOpen(false)} severity="info">
        To edit contacts, click the pencil icon next to the contact.<br />
        To delete a contact, click the trash can icon next to the contact.
      </Alert>
    </Snackbar>
    </div>
    
  );
};

export default ContactsList;
