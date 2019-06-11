const docusign = require('docusign-esign'),
    path = require('path'),
    fs = require('fs'),
    process = require('process'),
    {
        promisify
    } = require('util') // http://2ality.com/2017/05/util-promisify.html
    ,
    basePath = 'https://demo.docusign.net/restapi',
    envir = process.env || {};

// baseUrl is the url of the application's web server. Eg http://localhost:3000
// In some cases, this example can determine the baseUrl automatically.
// See the baseUrl statements at the end of this example.
let baseUrl = envir.BASE_URL || '{BASE_URL}'

function openSigningCeremonyController(req) {
    return new Promise(async (resolve, reject) => {
        const qp = req.query || {};
        // Fill in these constants or use query parameters of ACCESS_TOKEN, ACCOUNT_ID, USER_FULLNAME, USER_EMAIL
        // or environment variables.
        console.log(envir, qp)
        // Obtain an OAuth token from https://developers.hqtest.tst/oauth-token-generator
        const accessToken = envir.ACCESS_TOKEN || qp.ACCESS_TOKEN || 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwAAHW8uHe7WSAgAAF2SPGDu1kgCAG7phjJnUbxFqkpzZm9m0JcVAAEAAAAYAAkAAAAFAAAAKwAAAC0AAAAvAAAAMQAAADIAAAA4AAAAMwAAADUAAAANACQAAABmMGYyN2YwZS04NTdkLTRhNzEtYTRkYS0zMmNlY2FlM2E5NzgSAAEAAAALAAAAaW50ZXJhY3RpdmUwAADwPS0d7tZINwA6GHLQoTqUSqJ9oQycQoqw.i1Lnzr2k1pdfmSKMlSBYGjJNYUh2xSdtXuwPdaRG6LwxIH3q5nmvJ-y1svbFZvctmMABeZSuMDcwsJDG9ntmMqSccZkJ4gv3jqFyQeB6k6SSczymCqfkfnyyajkqAmvmqO-3_peZENihhyCOO917d27pbRd66Z9ql_miIyggSiZdkZwNoiQAMnfXqFT-vNWIrzTSq55VCcDYcQ0__UHJRaBjIorfiAr3O92e2M9kgkziuNNIXmzvEm-47asmZRDLJToBhDQIdOjUBIHtBbb7HiGMgwf7w9iaqZzC8hEiXwntXZxT7-lZtZoR7AyC1P1Yv__oySsj7RGCuviPSsnSTQ';

        // Obtain your accountId from demo.docusign.com -- the account id is shown in the drop down on the
        // upper right corner of the screen by your picture or the default picture. 
        const accountId = envir.ACCOUNT_ID || qp.ACCOUNT_ID || '8502948';

        // Recipient Information:
        const signerName = envir.USER_FULLNAME || qp.USER_FULLNAME || 'John Doe';
        const signerEmail = envir.USER_EMAIL || qp.USER_EMAIL || 'johndoe@example.com';

        const clientUserId = '123' // Used to indicate that the signer will use an embedded
            // Signing Ceremony. Represents the signer's userId within
            // your application.
            ,
            authenticationMethod = 'None' // How is this application authenticating
        // the signer? See the `authenticationMethod' definition
        // https://developers.docusign.com/esign-rest-api/reference/Envelopes/EnvelopeViews/createRecipient

        // The document to be signed. Path is relative to the root directory of this repo.
        const fileName = 'demo_documents/petition.pdf';

        /**
         *  Step 1. The envelope definition is created.
         *          One signHere tab is added.
         *          The document path supplied is relative to the working directory
         */
        const envDef = new docusign.EnvelopeDefinition();
        //Set the Email Subject line and email message
        envDef.emailSubject = 'Please sign this document sent from the Node example';
        envDef.emailBlurb = 'Please sign this document sent from the Node example.'

        // Read the file from the document and convert it to a Base64String
        const pdfBytes = fs.readFileSync(path.resolve(__dirname, fileName)),
            pdfBase64 = pdfBytes.toString('base64');

        // Create the document request object
        const doc = docusign.Document.constructFromObject({
            documentBase64: pdfBase64,
            fileExtension: 'pdf', // You can send other types of documents too.
            name: 'Sample document',
            documentId: '1'
        });

        // Create a documents object array for the envelope definition and add the doc object
        envDef.documents = [doc];

        // Create the signer object with the previously provided name / email address
        const signer = docusign.Signer.constructFromObject({
            name: signerName,
            email: signerEmail,
            routingOrder: '1',
            recipientId: '1',
            clientUserId: clientUserId
        });

        // Create the signHere tab to be placed on the envelope
        const signHere = docusign.SignHere.constructFromObject({
            documentId: '1',
            pageNumber: '1',
            recipientId: '1',
            tabLabel: 'SignHereTab',
            xPosition: '450',
            yPosition: '670'
        });

        // Create the overall tabs object for the signer and add the signHere tabs array
        // Note that tabs are relative to receipients/signers.
        signer.tabs = docusign.Tabs.constructFromObject({
            signHereTabs: [signHere]
        });

        // Add the recipients object to the envelope definition.
        // It includes an array of the signer objects.
        envDef.recipients = docusign.Recipients.constructFromObject({
            signers: [signer]
        });
        // Set the Envelope status. For drafts, use 'created' To send the envelope right away, use 'sent'
        envDef.status = 'sent';
        /**
         *  Step 2. Create/send the envelope.
         *          We're using a promise version of the SDK's createEnvelope method.
         */
        const apiClient = new docusign.ApiClient();
        apiClient.setBasePath(basePath);
        apiClient.addDefaultHeader('Authorization', 'Bearer ' + accessToken);
        // Set the DocuSign SDK components to use the apiClient object
        docusign.Configuration.default.setDefaultApiClient(apiClient);
        let envelopesApi = new docusign.EnvelopesApi()
            // createEnvelopePromise returns a promise with the results:
            ,
            createEnvelopePromise = promisify(envelopesApi.createEnvelope).bind(envelopesApi),
            results;

        try {
            results = await createEnvelopePromise(accountId, {
                'envelopeDefinition': envDef
            })
            /**
             * Step 3. The envelope has been created.
             *         Request a Recipient View URL (the Signing Ceremony URL)
             */
            const envelopeId = results.envelopeId,
                recipientViewRequest = docusign.RecipientViewRequest.constructFromObject({
                    authenticationMethod: authenticationMethod,
                    clientUserId: clientUserId,
                    recipientId: '1',
                    returnUrl: 'http://10.0.0.85:3000/updateStatus',
                    userName: signerName,
                    email: signerEmail
                }),
                createRecipientViewPromise = promisify(envelopesApi.createRecipientView).bind(envelopesApi);

            results = await createRecipientViewPromise(accountId, envelopeId, {
                recipientViewRequest: recipientViewRequest
            });
            /**
             * Step 4. The Recipient View URL (the Signing Ceremony URL) has been received.
             *         Redirect the user's browser to it.
             */
            resolve(results.url)
        } catch (e) {
            // Handle exceptions
            let body = e.response && e.response.body;
            if (body) {
                // DocuSign API exception
                reject(`<html lang="en"><body>
                      <h3>API problem</h3><p>Status code ${e.response.status}</p>
                      <p>Error message:</p><p><pre><code>${JSON.stringify(body, null, 4)}</code></pre></p>`);
            } else {
                // Not a DocuSign exception
                throw e;
            }
        }
    })
}




var express = require('express');
var app = express();
app.get('/signIssue', (req, res) => {
    openSigningCeremonyController({}).then((d) => {
        console.log("Data  > ", d);
        res.redirect(d)
    }).catch((e) => {
        console.log("Error  > ", e)
    })
});
app.get('/updateStatus', (req, res) => {
    res.send('<body><h2>Your Petition was submitted successfully and saved.</h2><p>Press close to Exit</p></body')
});
app.listen(3000, () => {
    console.log("listening")
})
// app.get('/updateStatus', (req, res) => {
//     console.log(req.query, req.body, req.query);
// });