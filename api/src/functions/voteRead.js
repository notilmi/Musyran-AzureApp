const { app } = require("@azure/functions");
const { connectDb } = require("../lib/connection");
const { buildResponse } = require("../lib/utilities");

app.http("vote", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "vote",
  handler: async (request, context) => {
    const { Vote } = await connectDb();
    try {
      context.log(`Http function processed request for url "${request.url}"`);

      const voteData = await Vote.find({});
      return buildResponse(200, "Query Votes Successfully", voteData);
    } catch (error) {
      context.log(error);
      return buildResponse(500, "Internal Server Error");
    } 
  },
});

