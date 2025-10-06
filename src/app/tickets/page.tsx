"use client";
import { useState, useCallback, useEffect } from "react";
import { Container, Typography, Box, Stack, Button } from "@mui/material";
import TicketsFilters from "@/components/Tickets/TicketsFilters";
import TicketsPagination from "@/components/Tickets/TicketsPagination";
import { buildUrl, homePagePath } from "@/utils/urlUtil";
import TicketCard from "@/components/Tickets/TicketCard";
import { SortOrder, Ticket, TicketFilter } from "@/types/ticket-interface";

interface TicketResponse {
  data: {
    tickets: Ticket[];
    numberOfTickets: number;
  };
}

const defaultPageSize = 10;
const defaultPage = 1;

export default function TicketsPage() {
  const [ticketFilter, setTicketFilter] = useState<TicketFilter>({
    page: defaultPage,
    pageSize: defaultPageSize,
    search: "",
    sortOrder: SortOrder.DESC,
  });
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [numberOfTickets, setNumberOfTickets] = useState(0);
  const createTicketUrl = `${homePagePath}/create`;

  const fetchData = useCallback(async () => {
    try {
      const url = buildUrl(ticketFilter, homePagePath);
      const response = await fetch(url);

      if (!response.ok) throw new Error("Error during fetch tickets");

      const ticketResponse: TicketResponse = await response.json();
      setTickets(ticketResponse.data?.tickets || []);
      setNumberOfTickets(ticketResponse.data?.numberOfTickets || 0);
    } catch (err) {
      console.error(err);
    }
  }, [ticketFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tickets
      </Typography>

      <Stack spacing={2} direction="row" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <TicketsFilters
          filter={ticketFilter}
          onChange={(newFilter) => {
            setTicketFilter((prev) => ({ ...prev, ...newFilter, page: 1 }));
          }}
        />

        <Button variant="outlined" size="small" href={createTicketUrl}>
          Create New Ticket
        </Button>
      </Stack>

      <Box sx={{ mt: 2 }}>
        {tickets?.length > 0 && (
          <>
            <Stack spacing={2}>
              {tickets.map((t) => (
                <TicketCard key={t.id} {...t} />
              ))}
            </Stack>
            <Box sx={{ mt: 2 }}>
              <TicketsPagination
                page={ticketFilter.page ?? defaultPage}
                pageSize={ticketFilter.pageSize ?? defaultPageSize}
                total={numberOfTickets}
                onChange={(p) =>
                  setTicketFilter((prev) => ({ ...prev, page: p }))
                }
              />
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}
