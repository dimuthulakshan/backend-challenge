var qrCodes = require("../mock_db/qr_codes.json");

function getAllCodes() {
  return qrCodes;
}

function getCodeById(id) {
  const qrCodes = getAllCodes();
  return qrCodes.find((x) => x._id === id);
}

module.exports = {
  getAllCodes,
  getCodeById,
};
