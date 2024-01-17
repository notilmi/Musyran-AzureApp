import axios from "axios";

function InputProcess({
  authCode,
  setProgressOpen,
  setErrorOpen,
  setErrorStatement,
  setSuccessOpen,
  setSuccessStatement,
}) {
  if (!authCode) {
    console.log("Error 404: Authcode is not found.");
    setErrorOpen(true);
    setErrorStatement(
      "Silahkan masukkan kode terlebih dahulu sebelum menekan tombol submit."
    );
  } else {
    setProgressOpen(true)
    axios
      .post(
        `api/auth`,
        { authCode: authCode },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response)
          setProgressOpen(false)
          setSuccessOpen(true);
          setSuccessStatement(
            "Kode terdeteksi! Kamu akan diarahkan ke halaman voting...~"
          );
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 404) {
          setProgressOpen(false)
          setErrorOpen(true);
          setErrorStatement(
            "Kode kamu tidak valid dan tidak ada di server kami. Hubungi operator untuk informasi lebih lanjut"
          );
        }

        if (error.response.status === 406) {
          setProgressOpen(false)
          setErrorOpen(true);
          setErrorStatement(
            "Kamu telah menggunakan Kode ini sebelumnya. Jika anda merasa ini bukan kesalahan anda, silahkan hubungi operator."
          );
        }

        if (error.response.status === 500) {
          setProgressOpen(false)
          setErrorOpen(true)
          setErrorStatement("Mohon maaf, terjadi kesalahan ketika hendak menghubungi server kami. Silahkan coba lagi. Jika merasa masih terjadi kesalahan, silahkan hubungi operator.")
      }
      });
  }
}

export default InputProcess;
