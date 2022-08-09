const express = require("express");
const qrCodeRepository = require("./repositories/qr-code-repository");
const campaignRollsRepository = require("./repositories/campaign-rolls-repository");
const campaignRepository = require("./repositories/campaign-repository");
const app = express();
const port = 4000;

app.get("/scan/:codeId", (req, res) => {
  const codeId = req.params.codeId;

  // WRITE YOUR CODE HERE

  // your redirect URL goes here
  res.redirect("<your_redirect_URL>");
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
