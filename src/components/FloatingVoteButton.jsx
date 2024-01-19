import React from "react";
import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { HowToVote } from "@mui/icons-material";
import { Button, Box } from "@mui/joy";

function FAB({ sendVote }) {
  return (
    <Box
      sx={{ position: "fixed", bottom: "20px", right: "20px", zIndex: "100" }}
    >
      <Button
        onClick={() => sendVote()}
        endDecorator={<HowToVote sx={{ fontSize: "40px" }} />}
        size="lg"
        variant="solid"
        sx={{
          maxWidth: "auto",
          maxHeight: "auto",
          fontSize: "35px",
          fontWeight: "570",
          borderRadius: "20px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
        }}
      >
        Vote
      </Button>
    </Box>
  );
}

export default FAB;
