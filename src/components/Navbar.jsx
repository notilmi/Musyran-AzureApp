import * as React from "react";
import { Box, IconButton } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import HowToVote from "@mui/icons-material/HowToVote";
import ColorSchemeToggle from "./ColorSchemeToggle";
import Snackbar from "@mui/joy/Snackbar";
import Chip from "@mui/joy/Chip"
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import LinearProgress from "@mui/joy/LinearProgress";

export default function HeaderSection({ countCandidate }) {
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = React.useState("neutral")

  React.useEffect(() => {
    if (countCandidate < 10) { setTheme("neutral") }
    else if (countCandidate == 10) { setTheme("success") }
    else if (countCandidate > 10) { setTheme("danger") }
  })
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        top: 0,
        px: 1.5,
        py: 1,
        zIndex: 10000,
        backgroundColor: "background.body",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
        width: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <IconButton size="sm" variant="soft" onClick={() => setOpen(true)}>
          <HowToVote />
        </IconButton>
        <Snackbar
          autoHideDuration={5000}
          variant="soft"
          color="warning"
          size="lg"
          invertedColors
          open={open}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          sx={{
            marginTop: "45px",
          }}
        >
          <div>
            <Typography level="title-lg">Sebentar!!</Typography>
            <Typography sx={{ mt: 1, mb: 2 }}>
              Silahkan Pilih 9 Formatur Terlebih Dahulu Sebelum Ke Beranda
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="solid"
                color="primary"
                onClick={() => setOpen(false)}
              >
                Okay Siap
              </Button>
              <LinearProgress
                variant="solid"
                color="danger"
                value={40}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderRadius: 0,
                }}
              />
            </Stack>
          </div>
        </Snackbar>
        <Typography component="h1" fontWeight="xl">
          Musyawarah Ranting XVII
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
        <Box
          sx={{
            gap: 1,
            alignItems: "center",
            display: { xs: "none", sm: "flex" },
          }}
        >
          <Chip variant="solid" color={theme}>
            {countCandidate}/<strong>10</strong>
          </Chip>
        </Box>
        <ColorSchemeToggle sx={{ alignSelf: "center" }} />
      </Box>
    </Box>
  );
}
