const { app } = require("@azure/functions");
const { connectDb } = require("../lib/connection");
const { buildResponse } = require("../lib/utilities");

app.http("voteById", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "vote/{nomorKandidat}",
  handler: async (request, context) => {
    const { Vote } = await connectDb();

    try {
      context.log(`Http function processed request for url "${request.url}"`);

      const voteData = await Vote.findOne({ nomorKandidat: request.params.nomorKandidat });

      if (!voteData) {
        return buildResponse(404, "Vote not found");
      }

      return buildResponse(200, "Query Vote Successfully", voteData);
    } catch (error) {
      context.log(error);
      return buildResponse(500, "Internal Server Error");
    }
  },
});

