var campaigns = require("../mock_db/campaigns.json");

function getAllCampaigns() {
  return campaigns;
}

function getCampaignById(id) {
  const allTags = getAllCampaigns();
  return allTags.find((x) => x.campaign_id === id);
}

module.exports = {
  getAllCampaigns,
  getCampaignById,
};
