const { app } = require("@azure/functions");
const { connectDb } = require("../lib/connection");
const { buildResponse } = require("../lib/utilities");

app.http("authVerify", {
    methods: ["POST"],
    route: "auth",
    authLevel: "anonymous",
    handler: async (request, context) => {
      try {
        const { authCode } = await request.json();
        context.log(authCode)
        const { AuthCode } = await connectDb();
  
        if (!authCode) {
          return buildResponse(400, "Kode Otentifikasi Kosong");
        }
  
        const existingAuthCode = await AuthCode.findOne({ code: authCode });
  
        if (!existingAuthCode) {
          return buildResponse(404, "Kode Otentifikasi Invalid", authCode);
        }

        if (existingAuthCode.used) {
          return buildResponse(406, "Kode Otentifikasi / QR Ini Sudah Dipakai Untuk Melakukan Voting");
        }
  
        await existingAuthCode.save();
  
        return buildResponse(200, "Otentikasi Berhasil!");
      } catch (error) {
        console.error('Error verifying authentication code:', error);
        return buildResponse(500, "Terjadi Kesalahan Saat Memproses Kode Otentifikasi");
      }
    },
  });
  