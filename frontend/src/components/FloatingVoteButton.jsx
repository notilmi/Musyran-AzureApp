import React from "react";
import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { Send } from "@mui/icons-material";
import { Button, Box } from "@mui/joy";

function FAB({ sendVote }) {
  return (
    <Box
      sx={{ position: "fixed", bottom: "20px", right: "20px", zIndex: "100" }}
    >
      <Button
        onClick={() => sendVote()}
        endDecorator={<Send sx={{ fontSize: "30px" }} />}
        size="lg"
        variant="soft"
        sx={{
          maxWidth: "auto",
          maxHeight: "auto",
          fontSize: "25px",
          fontWeight: "570",
          borderRadius: "20px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
        }}
      >
        Kirim Vote
      </Button>
    </Box>
  );
}

export default FAB;
