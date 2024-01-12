const { app } = require("@azure/functions");
const { connectDb } = require("../lib/connection");
const { buildResponse } = require("../lib/utilities");

app.http("voteUpload", {
    methods: ["POST"],
    route: "vote",
    authLevel: "anonymous",
    handler: async (request, context) => {
      const { Vote, AuthCode } = await connectDb();
      try {
          const { authCode, option } = await request.json();
          const voteData = {
            authCode,
            option,
          };
  
          context.log(request.json);
          const userAuthCode = voteData.authCode;
          const maxVotesPerUser = 10;
  
          const verifyAuthCode = await AuthCode.findOne({ code: userAuthCode });
          if (!verifyAuthCode) {
            return buildResponse(404, "AuthCode not found");
          }
          if (verifyAuthCode.used === true) {
            return buildResponse(
              406,
              "Maaf, Anda Sudah Menggunakan Kode Otentikasi / QR Ini Sebelumnya"
            );
          }
  
          if (voteData.option.length !== maxVotesPerUser) {
            return buildResponse(
              400,
              "Mohon Pilih 9 Formatur Tidak Boleh Lebih & Tidak Boleh Kurang"
            );
          }
  
          for (const option of voteData.option) {
            const updatedVote = await Vote.findOneAndUpdate(
              { option },
              { $inc: { count: 1 } },
              { new: true, upsert: true }
            );
            context.log(`Logging ${option}`);
            console.log(`Vote for ${option} recorded`, updatedVote);
          }
  
          await AuthCode.findOneAndUpdate({ code: userAuthCode }, { used: true });
          return buildResponse(200, "Voting Anda Sudah Berhasil Direkam");
        } catch (error) {
          console.error("Error processing votes:", error);
          return buildResponse(500, "Error Saat Memporses Voting Anda");
        }
    },
  });
  
