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

  it('Authorization signature and generated signature hash should be equal', () => {
    chai.assert.isNotNull(replaceRequestSignature);
    chai.assert.isNotNull(readRequestSignature);
    chai.assert.isNotNull(deleteRequestSignature);
  });

  it('Should return score', () => {
    chai.assert.equal(replaceRequestSignature.resultScore, '10');
  });

  it('Should not return score', () => {
    chai.assert.isUndefined(readRequestSignature.resultScore);
    chai.assert.isUndefined(deleteRequestSignature.resultScore);
  });
  
  it('Should return sourcedId', () => {
    chai.assert.equal(replaceRequestSignature.sourcedId, 'abc');
    chai.assert.equal(readRequestSignature.sourcedId, 'abc');
    chai.assert.equal(deleteRequestSignature.sourcedId, 'abc');
  });
});