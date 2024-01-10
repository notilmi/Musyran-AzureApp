import axios from "axios";

function sendVote({
  authCode,
  selectedCandidate,
  setErrorOpen,
  setErrorStatement,
  setSuccessOpen,
  setSuccessStatement
}) {
  if (selectedCandidate.length !== 10) {
    setErrorOpen(true);
    setErrorStatement(
      "Silahkan Pilih 10 Formatur, Tidak Boleh Lebih Atau Kurang"
    );
  } else {
    axios
      .post(
        `api/vote`,
        { authCode: authCode, option: selectedCandidate },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        if (response.status === 200) {
            setSuccessOpen(true)
            setSuccessStatement("Voting anda berhasil di rekam! Terimakasih atas komitmen dan kepercayaan anda.")
        }
      }).catch((error) => {
        if (error.response.status === 406) {
            setErrorOpen(true)
            setErrorStatement("Anda Sudah Menggunakan Kode Otentikasi / QR Ini Sebelumnya. Silahkan hubungi operator jika anda merasa ini bukan sebuah kesalahan.")
        }

        if (error.response.status === 500) {
            setErrorOpen(true)
            setErrorStatement("Mohon maaf, terjadi kesalahan ketika hendak menghubungi server kami. Silahkan coba lagi. Jika merasa masih terjadi kesalahan, silahkan hubungi operator.")
        }
      });
  }
}

export default sendVote;
