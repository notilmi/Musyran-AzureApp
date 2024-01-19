import { Typography, Snackbar, LinearProgress } from "@mui/joy";
import { HourglassEmpty } from "@mui/icons-material";

function ProgressSnackbar({
  progressOpen,
  setProgressOpen
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="soft"
      color="neutral"
      open={progressOpen}
      onClose={() => {
        setProgressOpen(false);
      }}
      sx={{ marginBottom: "80px" }}
      startDecorator={<HourglassEmpty sx={{ fontSize: 50 }} />}
    >
      <div sx={{marginLeft: "25px"}}>
        <Typography level="title-lg">Memproses...</Typography>
        <Typography sx={{ mt: 1, mb: 2 }}>Kami sedang memproses tindakan anda. Silahkan tunggu beberapa saat!</Typography>
        <LinearProgress
          variant="solid"
          color="neutral"
          value={40}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
          }}
        />
      </div>
    </Snackbar>
  );
}

export default ProgressSnackbar;
