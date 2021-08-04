const n = require('nonce')();

const generateReadResultResponse = (status, resultScore) => {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <imsx_POXEnvelopeResponse xmlns="http://www.imsglobal.org/services/ltiv1p1/xsd/imsoms_v1p0">
    <imsx_POXHeader>
      <imsx_POXResponseHeaderInfo>
        <imsx_version>V1.0</imsx_version>
        <imsx_messageIdentifier>${n()}</imsx_messageIdentifier>
        <imsx_statusInfo>
          <imsx_codeMajor>${status}</imsx_codeMajor>
          <imsx_severity>status</imsx_severity>
          <imsx_description>Result read</imsx_description>
          <imsx_messageRefIdentifier>${n()}</imsx_messageRefIdentifier>
          <imsx_operationRefIdentifier>readResult</imsx_operationRefIdentifier>
        </imsx_statusInfo>
      </imsx_POXResponseHeaderInfo>
    </imsx_POXHeader>
    <imsx_POXBody>
      <readResultResponse>
        <result>
          <resultScore>
            <language>en</language>
            <textString>${resultScore}</textString>
          </resultScore>
        </result>
      </readResultResponse>
    </imsx_POXBody>
    </imsx_POXEnvelopeResponse>
  `;
};

const generateReplaceResultResponse = (status, message, resultScore) => {
  return `
      <?xml version="1.0" encoding="UTF-8"?>
      <imsx_POXEnvelopeResponse xmlns="http://www.imsglobal.org/services/ltiv1p1/xsd/imsoms_v1p0">
      <imsx_POXHeader>
        <imsx_POXResponseHeaderInfo>
          <imsx_version>V1.0</imsx_version>
          <imsx_messageIdentifier>${n()}</imsx_messageIdentifier>
          <imsx_statusInfo>
            <imsx_codeMajor>${status}</imsx_codeMajor>
            <imsx_severity>status</imsx_severity>
            <imsx_description>${status === 'success' ? resultScore : message}</imsx_description>
            <imsx_messageRefIdentifier>${n()}</imsx_messageRefIdentifier>
            <imsx_operationRefIdentifier>replaceResult</imsx_operationRefIdentifier>
          </imsx_statusInfo>
        </imsx_POXResponseHeaderInfo>
      </imsx_POXHeader>
      <imsx_POXBody>
        <replaceResultResponse />
      </imsx_POXBody>
      </imsx_POXEnvelopeResponse>
    `;
};

const generateDeleteResultResponse = (status) => {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <imsx_POXEnvelopeResponse xmlns = "http://www.imsglobal.org/services/ltiv1p1/xsd/imsoms_v1p0">
    <imsx_POXHeader>
      <imsx_POXResponseHeaderInfo>
        <imsx_version>V1.0</imsx_version>
        <imsx_messageIdentifier>${n()}</imsx_messageIdentifier>
        <imsx_statusInfo>
          <imsx_codeMajor>${status}</imsx_codeMajor>
          <imsx_severity>status</imsx_severity>
          <imsx_messageRefIdentifier>${n()}</imsx_messageRefIdentifier>
          <imsx_operationRefIdentifier>deleteResult</imsx_operationRefIdentifier>
        </imsx_statusInfo>
      </imsx_POXResponseHeaderInfo>
    </imsx_POXHeader>
    <imsx_POXBody>
      <deleteResultResponse />
    </imsx_POXBody>
    </imsx_POXEnvelopeResponse>
  `;
};

module.exports = { 
  generateReadResultResponse, 
  generateReplaceResultResponse, 
  generateDeleteResultResponse 
};
