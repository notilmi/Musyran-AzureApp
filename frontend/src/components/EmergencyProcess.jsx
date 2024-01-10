import axios from "axios";

function EmergencyProcess({
  authCode,
  setErrorOpen,
  setErrorStatement,
  setSuccessOpen,
  setSuccessStatement,
}) {
  if (!authCode) {
    console.log("lah null");
    setErrorOpen(true);
    setErrorStatement(
      "Silahkan masukkan kode terlebih dahulu sebelum menekan tombol submit."
    );
  } else {
    axios
      .post(
        `api/auth`,
        { authCode: authCode },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response)
          setSuccessOpen(true);
          setSuccessStatement(
            "QR terdeteksi! Kamu akan diarahkan ke halaman voting...~"
          );
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 404) {
          setErrorOpen(true);
          setErrorStatement(
            "QR kamu tidak valid dan tidak ada di server kami. Hubungi operator untuk informasi lebih lanjut"
          );
        }

        if (error.response.status === 406) {
          setErrorOpen(true);
          setErrorStatement(
            "Kamu telah menggunakan QR ini sebelumnya. Jika anda merasa ini bukan kesalahan anda, silahkan hubungi operator."
          );
        }

        if (error.response.status === 500) {
          setErrorOpen(true)
          setErrorStatement("Mohon maaf, terjadi kesalahan ketika hendak menghubungi server kami. Silahkan coba lagi. Jika merasa masih terjadi kesalahan, silahkan hubungi operator.")
      }
      });
  }
}

export default EmergencyProcess;
