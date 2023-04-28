import { useState } from "react";
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
          <ListItem
            key={contact._id}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {editingContact === contact._id ? (
              <EditContactForm
                contact={contact}
                onUpdate={onUpdate}
                onCancel={handleCancel}
              />
            ) : (
              <>
                <ListItemText
                  primary={contact.name}
                  secondary={contact.birthdate}
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
              </>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ContactsList;
