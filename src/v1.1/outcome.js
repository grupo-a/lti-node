const oauth = require('oauth-sign');
const outcomeDataHelper = require('./helper/outcomeData');
const result = require('./helper/resultResponse');

const checkIsSignatureValid = (url, header, secretKey) => {
  const method = 'POST';
  const outcomeData = outcomeDataHelper.getOutcomeData(header);

  const signature = oauth.hmacsign(method, url, outcomeData.params, secretKey);

  return outcomeData.signature === signature ? true : false;
};

const buildResponse = ({ requestType, status, message = null, resultScore = null }) => {
  let response = '';
  switch (requestType) {
    case 'read':
      response = result.generateReadResultResponse(status, resultScore);
      break;
    case 'replace':
      response = result.generateReplaceResultResponse(status, message, resultScore);
      break;
    case 'delete':
      response = result.generateDeleteResultResponse(status);
      break;
  }

  return response;
};

module.exports  = {
  checkIsSignatureValid,
  buildResponse
};