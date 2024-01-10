import { CheckCircle } from "@mui/icons-material";
import { Typography, Snackbar, LinearProgress } from "@mui/joy";

function SuccessSnackbar({
  successOpen,
  setSuccessOpen,
  successStatement,
  setSuccessStatement,
  redirect,
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="soft"
      color="success"
      open={successOpen}
      autoHideDuration={3000}
      onClose={() => {
        setSuccessOpen(false);
        setSuccessStatement(null);
        window.location.assign(redirect);
      }}
      sx={{ marginBottom: "80px" }}
      startDecorator={<CheckCircle sx={{ fontSize: 50 }} />}
    >
      <div sx={{marginLeft: "25px"}}>
        <Typography level="title-lg">Sukses!</Typography>
        <Typography sx={{ mt: 1, mb: 2 }}>{successStatement}</Typography>
        <LinearProgress
          variant="solid"
          color="success"
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

export default SuccessSnackbar;
