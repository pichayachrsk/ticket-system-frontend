import { Priority, SortOrder, Status, TicketFilter } from "@/types/ticket-interface";
import {
  TextField,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

type Props = {
  filter: TicketFilter;
  onChange: (params: TicketFilter) => void;
};

export default function TicketsFilters({ filter, onChange }: Props) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      alignItems="center"
    >
      <TextField
        size="small"
        placeholder="Search tickets"
        value={filter.search || ""}
        onChange={(e) =>
          onChange({
            ...filter,
            search: e.target.value,
            page: 1,
          })
        }
        sx={{ minWidth: 220 }}
      />

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          value={filter.status || ""}
          onChange={(e) =>
            onChange({
              ...filter,
              status: (e.target.value as Status) || undefined,
              page: 1,
            })
          }
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value={Status.OPEN}>Open</MenuItem>
          <MenuItem value={Status.IN_PROGRESS}>In progress</MenuItem>
          <MenuItem value={Status.RESOLVED}>RESOLVED</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          label="Priority"
          value={filter.priority || ""}
          onChange={(e) =>
            onChange({
              ...filter,
              priority: (e.target.value as Priority) || undefined,
              page: 1,
            })
          }
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value={Priority.LOW}>Low</MenuItem>
          <MenuItem value={Priority.MEDIUM}>Medium</MenuItem>
          <MenuItem value={Priority.HIGH}>High</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Sort</InputLabel>
        <Select
          label="Sort"
          value={filter.sortOrder || "desc"}
          onChange={(e) =>
            onChange({
              ...filter,
              sortOrder: e.target.value as SortOrder,
              page: 1,
            })
          }
        >
          <MenuItem value="desc">Newest</MenuItem>
          <MenuItem value="asc">Oldest</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
