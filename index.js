const express = require("express");
const qrCodeRepository = require("./repositories/qr-code-repository");
const campaignRollsRepository = require("./repositories/campaign-rolls-repository");
const campaignRepository = require("./repositories/campaign-repository");
const app = express();
const port = 4000;

app.get("/scan/:codeId", async (req, res) => {
  try {
    const codeId = req.params.codeId;
    
    // Fetch Qr Code using codeId
    const qrCode = await qrCodeRepository.getCodeById(codeId);
    if (!qrCode) {
      return res.status(404).send("QR Code not found.");
    } else if(!qrCode.roll_id) {
      return res.status(404).send("Missing roll id.");
    }

    // Fetch Campaign Id using roll Id
    const campaignId = await campaignRollsRepository.getCampaignIdByRollId(qrCode.roll_id);

    if (!campaignId) {
      return res.status(404).send("Campaign not found.");
    }

    // Fetch Campaign using the retrieved campaignId
    const campaign = await campaignRepository.getCampaignById(campaignId);

    if (campaign && campaign.status === "running") {
      res.redirect(campaign.redirect_url);
    } else {
      res.redirect(campaign.default_url);
    }

  } catch (error) {
    console.error("Error scanning QR Code:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
