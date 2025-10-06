import { Card, CardContent, Stack, Typography, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Priority, Status, Ticket } from "@/types/ticket-interface";
import { homePagePath } from "@/utils/urlUtil";

export default function TicketCard({
  id,
  title,
  description,
  status,
  priority,
  createdAt,
}: Ticket) {
  const statusColor =
    status === Status.OPEN
      ? "primary"
      : status === Status.IN_PROGRESS
      ? "warning"
      : "default";
  const priorityColor =
    priority === Priority.MEDIUM
      ? "primary"
      : priority === Priority.HIGH
      ? "error"
      : "default";
  const editUrl = `${homePagePath}/${id}`;
  return (
    <Card variant="outlined" sx={{ height: "80px" }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <div>
            <Typography variant="subtitle1" fontWeight={600}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </div>
          <div style={{ textAlign: "right" }}>
            <Chip
              label={priority}
              size="small"
              sx={{ mr: 1 }}
              color={priorityColor}
            />
            <Chip label={status} color={statusColor} size="small" />
            <IconButton aria-label="edit" href={editUrl}>
              <EditIcon />
            </IconButton>
            <Typography variant="caption" display="block">
              Created date: {createdAt?.slice(0, 10)}
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
