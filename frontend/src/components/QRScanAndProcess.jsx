import React from "react";
import axios from "axios";
import { QrScanner } from "@yudiel/react-qr-scanner";
import ErrorSnackbar from "./ErrorSnackbar";
import SuccessSnackbar from "./SuccessSnackbar";

function QRScan({
  setAuthCode,
  setErrorOpen,
  setErrorStatement,
  setSuccessOpen,
  setSuccessStatement,
}) {
  const [scanning, setScanning] = React.useState(true);

  async function handleScan(data) {
    if (data) {
      setScanning(false);
      axios
        .post(
          `api/auth`,
          {
            authCode: data.text,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setAuthCode(data.text);
            setSuccessOpen(true);
            setSuccessStatement(
              "QR terdeteksi! Kamu akan diarahkan ke halaman voting..."
            );
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setScanning(true);
            setErrorOpen(true);
            setErrorStatement(
              "QR kamu tidak valid dan tidak ada di server kami. Panggil panitia terdekat untuk meminta bantuan"
            );
          }

          if (error.response.status === 406) {
            setScanning(true);
            setErrorOpen(true);
            setErrorStatement(
              "Kamu telah menggunakan QR ini sebelumnya. Jika anda merasa ini bukan kesalahan anda, silahkan hubungi operator."
            );
          }

          if (error.response.status === 500) {
            setErrorOpen(true);
            setErrorStatement(
              "Mohon maaf, terjadi kesalahan ketika hendak menghubungi server kami. Silahkan coba lagi. Jika merasa masih terjadi kesalahan, silahkan hubungi operator."
            );
          }
        });
    }
  }

  function handleError(err) {
    console.error(err);
  }

  return (
    <div style={{ display: "none" }}>
      {scanning && (
        <QrScanner
        deviceId="5c44fd932b2551137e70982631c32a892abe5fe6036f6a3f19d9e64bbf3dfba2"
          scanDelay={300}
          onError={handleError}
          onResult={handleScan}
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
}

export default QRScan;
