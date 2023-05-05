import { useState, Fragment } from "react";
import { ContactData } from "../api/contacts";
import EditContactForm from "./EditContactForm";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
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

  const handleEdit = (contactId: string) => {
    setEditingContact(contactId);
  };

  const handleCancel = () => {
    setEditingContact(null);
  };

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
                secondary={new Date(contact.birthdate).toLocaleDateString()}
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
    </div>
  );
  
};

export default ContactsList;
