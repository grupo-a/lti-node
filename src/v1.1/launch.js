const signatureHelper = require('./helper/signature');
const launchDataHelper = require('./helper/launchData');

const generateLaunchData = (url, launchData, oauthConsumerkey, secret) => {

  let launchDataFormat = launchData;
  
  delete launchDataFormat.oauth_signature;
  
  launchDataFormat = launchDataHelper.checkDefaultProperty(launchDataFormat, 'oauth_consumer_key', oauthConsumerkey);
  launchDataFormat = launchDataHelper.formatLaunchData(launchData);
    
  const oauth_signature = signatureHelper.build(url, launchDataFormat, secret);
  
  launchDataFormat.oauth_signature = oauth_signature;
  
  return launchDataFormat;
};


const buildForm = (url, launchData, oauthConsumerkey, secret) => {

  const launchDataFormat = generateLaunchData(url, launchData, oauthConsumerkey, secret);
  
  return {
    action     : url,
    properties : {
      ...launchDataFormat
    }
  };
};
  
const buildSignature = (url, launchData, oauthConsumerkey, secret) => {
    
  return generateLaunchData(url, launchData, oauthConsumerkey, secret).oauth_signature;
};

module.exports  = {
  buildForm,
  buildSignature
};