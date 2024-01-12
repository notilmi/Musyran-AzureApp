import * as React from "react";
import { Link } from "react-router-dom";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import { HowToVote, DoorFront } from "@mui/icons-material";
import EmergencyProcess from "../components/EmergencyProcess";
import SuccessSnackbar from "../components/SuccessSnackbar";
import ErrorSnackbar from "../components/ErrorSnackbar";
import Snackbar from "@mui/joy/Snackbar";
import { LinearProgress } from "@mui/joy";
import { HourglassEmpty } from "@mui/icons-material";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="neutral" disabled />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...other}
      onClick={(event) => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
        onClick?.(event);
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function Home() {
  const [authCode, setAuthCode] = React.useState(String);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [open, processOpen] = React.useState(false);

  const [successStatement, setSuccessStatement] = React.useState(null);
  const [errorStatement, setErrorStatement] = React.useState(null);

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "50vw", // must be `vw` only
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "left",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton
                variant="soft"
                color="primary"
                size="sm"
                aria-label="Open in new tab"
                component={Link}
                to="/"
              >
                <HowToVote />
              </IconButton>
              <Typography level="title-lg">Musyawarah Ranting XVII</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography level="h1">
                  Sistem Informasi Musyawarah Pemilihan Berbasis E-Voting
                </Typography>
                <Typography level="body-lg">
                  Silahkan Masukkan Kode Pemilihan Berdasarkan Nama Anda Pada
                  List Di Bilik Pemilihan
                </Typography>
              </Stack>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                  "--Divider-lineColor": {
                    xs: "#FFF",
                    md: "var(--joy-palette-divider)",
                  },
                },
              })}
            >
              Masukan Isi Kode Pemilihan
            </Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <Input
                onChange={(event) => {
                  setAuthCode(event.target.value);
                }}
                placeholder="Masukan Kode Pemilihan"
                variant="outlined"
                fullWidth
              />
              <Button
                onClick={() => {
                  EmergencyProcess({
                    authCode: authCode,
                    setErrorOpen: setErrorOpen,
                    setErrorStatement: setErrorStatement,
                    setSuccessOpen: setSuccessOpen,
                    setSuccessStatement: setSuccessStatement,
                  }),
                    processOpen(true);
                }}
                color="primary"
                fullWidth
                startDecorator={<DoorFront></DoorFront>}
              >
                Mulai Memilih
              </Button>
              <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="soft"
                color="success"
                open={successOpen}
                autoHideDuration={3000}
                onClose={() => {
                  processOpen(false);
                }}
                startDecorator={<HourglassEmpty sx={{ fontSize: 50 }} />}
              >
                \
                <div sx={{ marginLeft: "25px" }}>
                  <Typography level="title-lg">Memproses Kode!</Typography>
                  <Typography sx={{ mt: 1, mb: 2 }}>
                    Sedang Memproses Kode Yang Barusan Anda Masukkan Silahkan Tunggu Sebentar...
                  </Typography>
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
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © DevCommunity SMK Muhammadiyah 1 Palembang{" "}
              {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <SuccessSnackbar
        successOpen={successOpen}
        setSuccessOpen={setSuccessOpen}
        successStatement={successStatement}
        setSuccessStatement={setSuccessStatement}
        redirect={`/vote?authCode=${authCode}`}
      />
      <ErrorSnackbar
        errorOpen={errorOpen}
        setErrorOpen={setErrorOpen}
        errorStatement={errorStatement}
        setErrorStatement={setErrorStatement}
      />
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://musyranrga236.blob.core.windows.net/avatar-container/ipm.jpeg)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://musyranrga236.blob.core.windows.net/avatar-container/ipm-hw.jpeg)",
          },
        })}
      />
    </CssVarsProvider>
  );
}
