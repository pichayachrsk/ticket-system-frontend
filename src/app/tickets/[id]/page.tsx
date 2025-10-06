"use client";
import { use, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { buildUrl, homePagePath } from "@/utils/urlUtil";
import { Priority, Ticket } from "@/types/ticket-interface";
import { Result } from "@/types/api-response-interface";

export default function TicketDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(Priority.MEDIUM);

  const [result, setResult] = useState<Result | null>(null);

  const fetchTicket = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = buildUrl({}, `${homePagePath}/${id}`);
      const response = await fetch(url);

      if (!response.ok) throw new Error("Not found");

      const json = await response.json();

      setTicket(json.data);
      setTitle(json.data.title);
      setDescription(json.data.description);
      setPriority(json.data.priority);
    } catch (err) {
      setError((err as Result)?.message || String(err));
      setTicket(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  const saveChanges = async () => {
    try {
      const url = buildUrl({}, `${homePagePath}/${id}`);
      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, priority }),
      });

      if (!response.ok) throw new Error("Failed to save");

      const json = await response.json();
      setTicket(json.ticket);
      setEditing(false);
      setResult({ ok: true, message: "Saved" });
      router.push(homePagePath);
    } catch (err) {
      setResult({ ok: false, message: (err as Result)?.message || String(err) });
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this ticket?")) return;
    try {
      const url = buildUrl({}, `${homePagePath}/${id}`);
      const response = await fetch(url, { method: "DELETE" });

      if (!response.ok) throw new Error("Failed to delete");

      router.push(homePagePath);
    } catch (err) {
      setResult({ ok: false, message: (err as Result)?.message || String(err) });
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Ticket details
      </Typography>

      {result && (
        <Alert severity={result.ok ? "success" : "error"} sx={{ mb: 2 }}>
          {result.message}
        </Alert>
      )}

      {loading && <div>Loading...</div>}
      {error && <Alert severity="error">{error}</Alert>}

      {ticket && (
        <Stack spacing={2} sx={{ maxWidth: 800 }}>
          {!editing ? (
            <Box>
              <Typography variant="h6">{ticket.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {ticket.description}
              </Typography>
              <Typography variant="caption">
                Priority: {ticket.priority} • Status: {ticket.status}
              </Typography>
            </Box>
          ) : (
            <>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
              />
              <TextField
                label="Priority"
                select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
              >
                <MenuItem value={Priority.LOW}>Low</MenuItem>
                <MenuItem value={Priority.MEDIUM}>Medium</MenuItem>
                <MenuItem value={Priority.HIGH}>High</MenuItem>
              </TextField>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={saveChanges}>
                  Save
                </Button>
                <Button variant="outlined" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </Stack>
            </>
          )}

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={() => setEditing((e) => !e)}>
              {editing ? "Edit" : "Edit"}
            </Button>
            <Button color="error" variant="outlined" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </Stack>
      )}
    </Container>
  );
}
