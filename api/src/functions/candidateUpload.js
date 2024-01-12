const { app } = require("@azure/functions");
const { connectDb } = require("../lib/connection");
const { buildResponse } = require("../lib/utilities");

app.http("candidateUpload", {
    methods: ["POST"],
    route: "candidate",
    authLevel: "anonymous",
    handler: async (request, context) => {
      try {
        const candidate = await request.json();
    
        console.log('Candidate:', candidate);
    
        const { Vote } = await connectDb();
    
        const { nomorKandidat, option, avataruri, visi, misi } = candidate;
    
        const newVote = new Vote({
          nomorKandidat,
          option,
          avataruri,
          visi,
          misi,
          count: 0,
        });
    
        console.log('New vote:', newVote);
    
        await newVote.save();
    
        console.log("Data Berhasil Dimasukkan Ke Database");
        return buildResponse(200, "Data Yang Anda Masukkan Berhasil Direkam Di Database", newVote);
      } catch (error) {
        console.error(error);
        return buildResponse(500, "Terjadi Kesalahan Saat Mengupload Data");
      }
    },
  });
  