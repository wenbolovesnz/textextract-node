const AWS = require("aws-sdk");

AWS.config.apiVersions = {
  textract: "2018-06-27",
};

AWS.config.region = "ap-southeast-2";

const textract = new AWS.Textract();

var params = {
  DocumentLocation: {
    S3Object: {
      Bucket: "textextract-dev",
      Name: "Architectural Plan - Block B.pdf",
    },
  },
  FeatureTypes: ["TABLES", "FORMS"],
};

// textract.startDocumentAnalysis(params, function (err, data) {
//   if (err) console.log(err, err.stack);
//   // an error occurred
//   else console.log(data); // successful response
// });

textract.getDocumentAnalysis(
  {
    JobId: "b178887f259bc4652ddd0b051022f5bdc3961b80315e7ddaffb27424d88d232e",
  },
  (err, data) => {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      console.log(data.DocumentMetadata, data.NextToken);
      const page4 = data.Blocks.filter((a) => a.Page == 2)
        .filter((a) => !!a.Text)
        .filter((d) => {
          return d.Text.indexOf("WIND ZONE") > -1;
        });
      console.log(JSON.stringify(page4));
    }
  }
);
