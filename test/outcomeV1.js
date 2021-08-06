const chai = require('chai');
const { outcomeV1 } = require('../src/index');

describe('Check Outcome LTI 1.1 Signature', () => {
  const url = 'https://grupoa.com.br.outcome';
  const secretKey = 'secret';
  const validHeader = 'oauth_consumer_key=12345678, oauth_signature_method=HMAC-SHA1,oauth_timestamp=1627929009,oauth_nonce=d7d5d9a6278815d1c09f4e558b9a8272,oauth_version=1.0,oauth_signature=iHwxH4busDQpEAru0eWwwa2Mmdg%3D';
  const invalidHeader = 'oauth_consumer_key=000000, oauth_signature_method=HMAC-SHA1,oauth_timestamp=1627929009,oauth_nonce=d7d5d9a6278815d1c09f4e558b9a8272,oauth_version=1.0,oauth_signature=iHwxH4busDQpEAru0eWwwa2Mmdg%3D';

  const validSignature = outcomeV1.checkIsSignatureValid(url, validHeader, secretKey);
  const invalidSignature = outcomeV1.checkIsSignatureValid(url, invalidHeader, secretKey);

  const readResult = outcomeV1.buildResponse({
    requestType : 'read',
    status      : 'success',
    resultScore : '0.9'
  });

  const replaceResultError = outcomeV1.buildResponse({
    requestType : 'replace',
    status      : 'failure',
    message     : 'Result score must be in 0.0 - 1.0 range'
  });

  const replaceResultSuccess = outcomeV1.buildResponse({
    requestType : 'replace',
    status      : 'success',
    resultScore : '0.9'
  });

  const deleteResult = outcomeV1.buildResponse({
    requestType : 'delete',
    status      : 'success'
  });

  it('Authorization signature and generated signature hash should be equal', () => {
    chai.assert.isTrue(validSignature);
  });

  it('Authorization signature and generated signature hash should be different', () => {
    chai.assert.isFalse(invalidSignature);
  });

  it('Result responses should return XML', () => {
    chai.assert.isString(readResult);
    chai.assert.isString(replaceResultError);
    chai.assert.isString(replaceResultSuccess);
    chai.assert.isString(deleteResult);
  });
});