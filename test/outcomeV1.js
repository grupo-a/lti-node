const chai = require('chai');
const { outcomeV1 } = require('../src/index');

describe('Check Outcome LTI 1.1 Signature', () => {
  const url = 'https://grupoa.com.br.outcome';
  const secretKey = 'secret';
  const header = 'oauth_consumer_key=12345678, oauth_signature_method=HMAC-SHA1,oauth_timestamp=1627929009,oauth_nonce=d7d5d9a6278815d1c09f4e558b9a8272,oauth_version=1.0,oauth_signature=iHwxH4busDQpEAru0eWwwa2Mmdg%3D';
  const replaceRequestBody = '<?xml version = 1.0 encoding = UTF-8?>  <imsx_POXEnvelopeRequest xmlns = http://www.imsglobal.org/services/ltiv1p1/xsd/imsoms_v1p0>      <imsx_POXHeader>      <imsx_POXRequestHeaderInfo>        <imsx_version>V1.0</imsx_version>        <imsx_messageIdentifier>test</imsx_messageIdentifier>      </imsx_POXRequestHeaderInfo>    </imsx_POXHeader>    <imsx_POXBody>      <replaceResultRequest>        <resultRecord>          <sourcedGUID>            <sourcedId>abc</sourcedId>          </sourcedGUID>          <result>            <resultScore>                <language>en</language>                <textString>10</textString>            </resultScore>          </result>        </resultRecord>      </replaceResultRequest>    </imsx_POXBody>  </imsx_POXEnvelopeRequest>';
  const readRequestBody = '<?xml version = 1.0 encoding = UTF-8?>  <imsx_POXEnvelopeRequest xmlns = http://www.imsglobal.org/services/ltiv1p1/xsd/imsoms_v1p0>      <imsx_POXHeader>      <imsx_POXRequestHeaderInfo>        <imsx_version>V1.0</imsx_version>        <imsx_messageIdentifier>test</imsx_messageIdentifier>      </imsx_POXRequestHeaderInfo>    </imsx_POXHeader>    <imsx_POXBody>      <readResultRequest>        <resultRecord>          <sourcedGUID>            <sourcedId>abc</sourcedId>          </sourcedGUID>        </resultRecord>      </readResultRequest>    </imsx_POXBody>  </imsx_POXEnvelopeRequest>';
  const deleteRequestBody = '<?xml version = 1.0 encoding = UTF-8?>  <imsx_POXEnvelopeRequest xmlns = http://www.imsglobal.org/services/ltiv1p1/xsd/imsoms_v1p0>      <imsx_POXHeader>      <imsx_POXRequestHeaderInfo>        <imsx_version>V1.0</imsx_version>        <imsx_messageIdentifier>test</imsx_messageIdentifier>      </imsx_POXRequestHeaderInfo>    </imsx_POXHeader>    <imsx_POXBody>      <deleteResultRequest>        <resultRecord>          <sourcedGUID>            <sourcedId>abc</sourcedId>          </sourcedGUID>        </resultRecord>      </deleteResultRequest>    </imsx_POXBody>  </imsx_POXEnvelopeRequest>';
  
  const replaceRequestSignature = outcomeV1.checkSignature(url, header, replaceRequestBody, secretKey);
  const readRequestSignature = outcomeV1.checkSignature(url, header, readRequestBody, secretKey);
  const deleteRequestSignature = outcomeV1.checkSignature(url, header, deleteRequestBody, secretKey);

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
    chai.assert.isNotNull(replaceRequestSignature);
    chai.assert.isNotNull(readRequestSignature);
    chai.assert.isNotNull(deleteRequestSignature);
  });

  it('Replace request should return score', () => {
    chai.assert.equal(replaceRequestSignature.resultScore, '10');
  });

  it('Read and delete requests should not return score', () => {
    chai.assert.isUndefined(readRequestSignature.resultScore);
    chai.assert.isUndefined(deleteRequestSignature.resultScore);
  });
  
  it('Requests should return sourcedId', () => {
    chai.assert.equal(replaceRequestSignature.sourcedId, 'abc');
    chai.assert.equal(readRequestSignature.sourcedId, 'abc');
    chai.assert.equal(deleteRequestSignature.sourcedId, 'abc');
  });

  it('Result responses should return XML', () => {
    chai.assert.isString(readResult);
    chai.assert.isString(replaceResultError);
    chai.assert.isString(replaceResultSuccess);
    chai.assert.isString(deleteResult);
  });
});