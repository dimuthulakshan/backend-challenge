var campaignRolls = require("../mock_db/campaign_rolls.json");

function getAllCampaignRolls() {
  return campaignRolls;
}

function getRollsByCampaignId(campaignId) {
  const campaignRolls = getAllCampaignRolls();
  return campaignRolls.find((x) => x.campaign_id === campaignId);
}

function getCampaignIdByRollId(rollId) {
  const campaignRolls = getAllCampaignRolls();
  const found = campaignRolls.find((x) => x.roll_id === rollId);
  if (found) {
    return found.campaign_id;
  } else {
    return null;
  }
}

module.exports = {
  getAllCampaignRolls,
  getRollsByCampaignId,
  getCampaignIdByRollId,
};
