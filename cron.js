const campaignRepository = require("./repositories/campaign-repository");
const appsRepository = require("./repositories/apps-repository");

/**
 * An app is live if it's linked to a campaigns that is live,
 * OR
 * if it's linked to another live app (i.e. appears on the other app links).
 *
 * This function calculates for each app if it's live or not,
 * and sets the is_live property accordingly.
 *
 * if the is_live status calculated from this function is different than what is currently saved in the database, the new status needs to be saved in the db by using the repository function:
 * appsRepository.saveApp(app)
 *
 *
 * @param sites
 */
async function calculateIsLive() {
  try {
    // Fetch campaigns and apps (assuming they are async operations)
    const campaigns = await campaignRepository.getAllCampaigns();
    const apps =  appsRepository.getAllApps();

    // Extract live campaign URLs
    const liveCampaignUrls = new Set(
      campaigns
        .filter(campaign => campaign.status === 'running')
        .map(campaign => campaign.redirect_url)
    );

    // Define a function to extract live URLs based on a given condition
    const extractLiveUrls =(apps, condition)=>{
      return new Set(
        apps
          .filter(app => condition(app))
          .flatMap(app => [app.url, ...app.links])
      );
    }

    // Extract live app URLs
    const liveAppsUrls = extractLiveUrls(apps, app => liveCampaignUrls.has(app.url) || app.links.some(link => liveCampaignUrls.has(link)));
    
    // Extract inherited live app URLs
    const iliveAppsUrls = extractLiveUrls(apps, app => liveAppsUrls.has(app.url) || app.links.some(link => liveAppsUrls.has(link)));

    // Update apps with is_live property
    for (let app of apps) {
      const isLiveNow = iliveAppsUrls.has(app.url);
      if (app.is_live !== isLiveNow) {
        app.is_live = isLiveNow;
        appsRepository.saveApp(app);
      }
    }
  
  } catch (error) {
    console.error('Error calculating is_live:', error);
  }
}


calculateIsLive();
