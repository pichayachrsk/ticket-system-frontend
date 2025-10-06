import { Stack, Button, Typography } from "@mui/material";

export default function TicketsPagination({
  page,
  pageSize,
  total,
  onChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onChange: (p: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Button
        variant="outlined"
        size="small"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </Button>
      <Typography>
        Page {page} of {totalPages}
      </Typography>
      <Button
        variant="outlined"
        size="small"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </Button>
    </Stack>
  );
}
