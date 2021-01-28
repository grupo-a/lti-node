
const n = require('nonce')();


const checkDefaultProperty = (launchData, property, defaultValue) => {
  if (!launchData[property]) {
    launchData[property] = defaultValue;
  }
  return launchData;
};

const formatLaunchData = (launchData) => {
  let launchDataFormat = launchData;

  launchDataFormat = checkDefaultProperty(launchData, 'lti_version', 'LTI-1p0');
  launchDataFormat = checkDefaultProperty(launchData, 'lti_message_type', 'basic-lti-launch-request');
  launchDataFormat = checkDefaultProperty(launchData, 'oauth_callback', 'about:blank');
  launchDataFormat = checkDefaultProperty(launchData, 'oauth_version', '1.0');
  launchDataFormat = checkDefaultProperty(launchData, 'oauth_nonce', n());
  launchDataFormat = checkDefaultProperty(launchData, 'oauth_signature_method', 'HMAC-SHA1');
  launchDataFormat = checkDefaultProperty(launchData, 'oauth_timestamp', Math.round(Date.now() / 1000));
  return launchDataFormat;
};


module.exports = {
  formatLaunchData,
  checkDefaultProperty
};