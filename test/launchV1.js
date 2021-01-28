const chai = require('chai');
const { launchV1 } = require('../src/index');

const launchData = {
  user_id                                : 'test',
  roles                                  : 'urn:lti:role:ims/lis/Instructor',
  context_label                          : 'Discipline Test',
  context_title                          : 'Discipline Test',
  context_id                             : '1',
  resource_link_id                       : '1',
  resource_link_title                    : 'Link Test',
  lis_person_name_full                   : 'ABC',
  lis_person_name_family                 : 'ABC',
  lis_person_name_given                  : 'ABC',
  lis_person_contact_email_primary       : 'abc@grupoa.com.br',
  lis_person_sourcedid                   : 'abc',
  tool_consumer_instance_guid            : 'grupoa.com.br',
  lti_version                            : 'LTI-1p0',
  lti_message_type                       : 'basic-lti-launch-request',
  oauth_callback                         : 'about:blank',
  oauth_version                          : '1.0',
  oauth_nonce                            : 'abc',
  oauth_timestamp                        : 123213032103,
  oauth_signature_method                 : 'HMAC-SHA1',
  tool_consumer_info_product_family_code : 'Plataforma'
};

const launchDataSimpleRandom = {
  user_id                                : 'test',
  roles                                  : 'urn:lti:role:ims/lis/Instructor',
  context_label                          : 'Discipline Test',
  context_title                          : 'Discipline Test',
  context_id                             : '1',
  resource_link_id                       : '1',
  resource_link_title                    : 'Link Test',
  lis_person_name_full                   : 'ABC',
  lis_person_name_family                 : 'ABC',
  lis_person_name_given                  : 'ABC',
  lis_person_contact_email_primary       : 'abc@grupoa.com.br',
  lis_person_sourcedid                   : 'abc',
  tool_consumer_instance_guid            : 'grupoa.com.br',
  tool_consumer_info_product_family_code : 'Plataforma'
};

describe('Launch LTI 1.1 Signature', () => {
  
  const url = 'https://grupoa.com.br/lti?param=1&param=2';
  const consumerKey = 'test';
  const secretKey = '@@123@@';
  
  const signature = launchV1.buildSignature(url, launchData, consumerKey, secretKey);

  it('Should return correct signature', () => {
    chai.assert.equal(signature, 'MvACSKEAEY6KRHMVuzpO/t0uktI=');
  });

  const launchFormData = launchV1.buildForm(url, launchData, consumerKey, secretKey);

  it('Should return correct signature in launch form data', () => {
    chai.assert.equal(launchFormData.properties.oauth_signature, 'MvACSKEAEY6KRHMVuzpO/t0uktI=');
  });

  it('Should return correct url in launch form data', () => {
    chai.assert.equal(launchFormData.action, url);
  });

  const launchFormaDataSimpleRandom = launchV1.buildForm(url, launchDataSimpleRandom, consumerKey, secretKey);
  it('Should return correct signature in form data simple random', () => {
    chai.assert.isNotNull(launchFormaDataSimpleRandom.properties.oauth_signature);
  });

  it('Should return correct oauth_nonce in form data simple random', () => {
    chai.assert.isNotNull(launchFormaDataSimpleRandom.properties.oauth_nonce);
  });

  it('Should return correct oauth_timestamp in form data simple random', () => {
    chai.assert.isNotNull(launchFormaDataSimpleRandom.properties.oauth_timestamp);
  });
});