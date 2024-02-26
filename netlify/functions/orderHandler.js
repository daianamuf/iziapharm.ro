const {google} = require('googleapis');

const secrets =require('../../secrets.json');


const {GoogleAuth} = require('google-auth-library');
const auth = new GoogleAuth({
  credentials: JSON.parse(secrets),
  scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/spreadsheets'],
});
  
exports.handler = async (event) => {
    // Message for FE. 
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  } 

  const data = JSON.parse(event.body);
  console.log(data)
  const authClient = await auth.getClient();
  const driveService = google.drive({version: 'v3', auth: authClient});
  const sheetsService = google.sheets({version: 'v4', auth: authClient});
 
};
