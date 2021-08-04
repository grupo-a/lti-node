const oauth = require('oauth-sign');
const outcomeDataHelper = require('./helper/outcomeData');
const result = require('./helper/resultResponse');

const checkSignature = (url, header, body, secretKey) => {
  const method = 'POST';
  const outcomeData = outcomeDataHelper.getOutcomeData(header, body);

  const signature = oauth.hmacsign(method, url, outcomeData.params, secretKey);

  if (outcomeData.signature === signature ) {
    return outcomeData.requestType === 'replace' 
      ? { requestType: outcomeData.requestType, resultScore: outcomeData.resultScore, sourcedId: outcomeData.sourcedId }
      : { requestType: outcomeData.requestType, sourcedId: outcomeData.sourcedId };
  } else {
    return null;
  }
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
  checkSignature,
  buildResponse
};