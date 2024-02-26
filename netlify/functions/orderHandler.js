const {google} = require('googleapis');
const { Readable } = require('stream');

const credential = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS, "base64").toString()
);

const {GoogleAuth} = require('google-auth-library');
const auth = new GoogleAuth({
  credentials:  credential,
  scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/spreadsheets'],
});
  
async function uploadImageToDrive(authClient, imageData) {
    console.log(imageData);
    const driveService = google.drive({ version: 'v3', auth: authClient });
    console.log('m am auth')
    const fileMetadata = {
        name: 'image-name',
        parents: ['1AmX95jiT2wtUBme5N0LiYMTxHARW_j20'],
    };

    // Convert the base64 string to a Buffer
    const buffer = Buffer.from(imageData, 'base64');

    // Convert the Buffer into a Readable Stream
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // EOF

    const media = {
        mimeType: 'image/jpeg',
        body: stream, // Use the stream here
    };

    const file = await driveService.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, webViewLink',
    });

    return `https://drive.google.com/uc?id=${file.data.id}`;
}
  

  async function updateGoogleSheet(authClient, sheetId, data, imageUrl) {
    const sheetsService = google.sheets({ version: 'v4', auth: authClient });
    const values = [
      // Structure your data here, including the image URL
      [data.name, data.value, imageUrl], // Example row
    ];
    await sheetsService.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1', // Adjust as needed
      valueInputOption: 'RAW',
      requestBody: { values },
    });
  }

  exports.handler = async (event) => {
    // Message for FE. 
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  } 

  try {
    const formData = event.body
    const parsedData = JSON.parse(formData);

    const authClient = await auth.getClient();

    // Assuming `data.image` contains the base64-encoded image data
    const imageUrl = await uploadImageToDrive(authClient, parsedData.fileUpload);
    console.log(imageUrl);
    // // Remove the image from data to prevent trying to add it as a separate field in the sheet
    // delete data.image;

    // await updateGoogleSheet(authClient, 'your-sheet-id', data, imageUrl);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};