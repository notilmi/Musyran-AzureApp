import { ErrorOutline } from "@mui/icons-material";
import { Typography, Snackbar, LinearProgress, Button, Stack } from "@mui/joy";

function ErrorSnackbar({
  errorOpen,
  setErrorOpen,
  errorStatement,
  setErrorStatement,
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="soft"
      color="warning"
      size="lg"
      invertedColors
      open={errorOpen}
      autoHideDuration={5000}
      onClose={() => {
        setErrorOpen(false);
        setErrorStatement(null);
      }}
      sx={(theme) => ({
        background: `linear-gradient(45deg, ${theme.palette.primary[600]} 30%, ${theme.palette.primary[500]} 90%})`,
        maxWidth: 360,
        marginBottom: "75px"
      })}
      startDecorator={<ErrorOutline sx={{ fontSize: 50 }} />}
    >
      <div sx={{ marginLeft: "25px" }}>
        <Typography level="title-lg">Mohon Maaf</Typography>
        <Typography sx={{ mt: 1, mb: 2 }}>{errorStatement}</Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="solid"
            color="primary"
            onClick={() => setErrorOpen(false)}
          >
            Okay Siap
          </Button>
          <LinearProgress
            variant="solid"
            color="warning"
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
  );
}

export default ErrorSnackbar;
