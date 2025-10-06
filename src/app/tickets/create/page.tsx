"use client";
import { FormEvent, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Stack,
  MenuItem,
  Alert,
  Typography,
} from "@mui/material";
import { buildUrl, homePagePath } from "@/utils/urlUtil";
import { Priority, Status, Ticket } from "@/types/ticket-interface";
import { useRouter } from "next/navigation";
import { Result } from "@/types/api-response-interface";

const defaultTicket: Ticket = {
  title: "",
  description: "",
  priority: Priority.MEDIUM,
  status: Status.OPEN,
};

export default function CreateTicketPage() {
  const [ticket, setTicket] = useState<Ticket>(defaultTicket);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!ticket.title.trim() || ticket.title.length < 5)
      errors["title"] = "Title is required or must be at least 5 characters";

    if (
      ![Priority.LOW, Priority.MEDIUM, Priority.HIGH].includes(ticket.priority)
    )
      errors["priority"] = "Priority must be LOW, MEDIUM or HIGH";

    if (ticket.description && ticket.description.length > 5000) {
      errors["description"] = "Description is too long";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();

    if (!validate()) return;

    setSubmitting(true);
    try {
      const url = buildUrl({}, homePagePath);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticket),
      });

      if (!response.ok) throw new Error("Failed to save");

      setResult({ message: "Ticket is created successfully", ok: true });
      setTicket(defaultTicket);
      setTimeout(() => router.push(homePagePath), 1000);
    } catch (err) {
      setResult({ message: "Error while creating ticket", ok: false });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create ticket
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={{ maxWidth: 640 }}>
          <h1>{result?.ok}</h1>
          {result && result.ok ? (
            <Alert severity="success">Ticket is created successfully</Alert>
          ) : result && !result.ok ? (
            <Alert severity="error">Error while creating ticket</Alert>
          ) : null}

          <TextField
            label="Title"
            value={ticket.title}
            onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
            error={!!errors.title}
            helperText="Title is required"
            required
          />

          <TextField
            label="Description"
            value={ticket.description}
            onChange={(e) =>
              setTicket({ ...ticket, description: e.target.value })
            }
            multiline
            rows={4}
          />

          <TextField
            label="Priority"
            select
            value={ticket.priority}
            onChange={(e) =>
              setTicket({ ...ticket, priority: e.target.value as Priority })
            }
            error={!!errors.priority}
            helperText={errors.priority}
          >
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </TextField>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" type="submit" disabled={submitting}>
              Create
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setTicket(defaultTicket);
                setErrors({});
                setResult(null);
              }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
