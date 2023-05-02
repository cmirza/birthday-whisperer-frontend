import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import moment from "moment-timezone";

interface UserSettingsProps {
  open: boolean;
  onClose: () => void;
}

const UserSettings: React.FC<UserSettingsProps> = ({ open, onClose }) => {
  const [timeZone, setTimeZone] = useState("");
  const [reminderTime, setReminderTime] = useState("");

  const handleTimeZoneChange = (event: SelectChangeEvent<string>) => {
    setTimeZone(event.target.value as string);
  };

  const handleReminderTimeChange = (event: SelectChangeEvent<string>) => {
    setReminderTime(event.target.value as string);
  };

  const timeZones = moment.tz.names();
  const hours = Array.from(Array(24).keys());

  const formatHour = (hour: number) => {
    const hour12 = hour % 12 || 12;
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${hour12}:00 ${ampm}`;
  };

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (open) {
      fetch(`${import.meta.env.VITE_API_URL}/api/settings`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTimeZone(data.timezone || "");
          setReminderTime(data.reminderTime.toString());
        })
        .catch((error) => console.error("Error fetching settings:", error));
    }
  }, [open, token]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <FormControl fullWidth variant="outlined" margin="dense">
          <InputLabel htmlFor="time-zone">Time Zone</InputLabel>
          <Select
            label="Time Zone"
            value={timeZone}
            onChange={handleTimeZoneChange}
            inputProps={{
              name: "time-zone",
              id: "time-zone",
            }}
          >
            {timeZones.map((tz) => (
              <MenuItem key={tz} value={tz}>
                {tz}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="dense">
          <InputLabel htmlFor="reminder-time">Reminder Time</InputLabel>
          <Select
            label="Reminder Time"
            value={reminderTime}
            onChange={handleReminderTimeChange}
            inputProps={{
              name: "reminder-time",
              id: "reminder-time",
            }}
          >
            {hours.map((hour) => (
              <MenuItem key={hour} value={hour}>
                {formatHour(hour)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserSettings;
