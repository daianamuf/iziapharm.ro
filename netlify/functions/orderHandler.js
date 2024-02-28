const { google } = require("googleapis");
const { Readable } = require("stream");

const credential = JSON.parse(
  Buffer.from(
    process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS,
    "base64"
  ).toString()
);

const { GoogleAuth } = require("google-auth-library");
const auth = new GoogleAuth({
  credentials: credential,
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

async function uploadImageToDrive(authClient, imageData, data) {
  const driveService = google.drive({ version: "v3", auth: authClient });

  const fileMetadata = {
    mimeType: "image/jpg",
    name: `${data.firstName} ${data.lastName}`,
    parents: ["1AmX95jiT2wtUBme5N0LiYMTxHARW_j20"],
  };

  // Convert the base64 string to a Buffer
  const buffer = Buffer.from(
    imageData.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  // Convert the Buffer into a Readable Stream
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null); // EOF

  const media = {
    mimeType: "image/jpg",
    body: stream,
  };

  const file = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id, webViewLink",
  });

  return `https://drive.google.com/uc?id=${file.data.id}`;
}

async function updateGoogleSheet(authClient, data) {
  const sheetsService = google.sheets({ version: "v4", auth: authClient });
  const values = [
    // Structure your data here, including the image URL
    [
      data.firstName,
      data.lastName,
      data.fileUpload,
      data.email,
      data.phoneNumber,
      data.role,
      data.orderDescription,
      data.medic,
      data.orderedProducts.join(", "),
      data.totalCartPrice,
      data.petName,
      data.species,
      data.gender,
      data.age,
      data.weight,
    ], // Example row
  ];
  await sheetsService.spreadsheets.values.append({
    spreadsheetId: "1DlB9OeqRObamgGciZ71YcwKmJD5A0PXDcBMNee19ZBQ",
    range: "Foaie1", // Adjust as needed
    valueInputOption: "RAW",
    requestBody: { values },
  });
}

exports.handler = async (event) => {
  try {
    const formData = event.body;
    const parsedData = JSON.parse(formData);

    const authClient = await auth.getClient();

    const imageUrl = await uploadImageToDrive(
      authClient,
      parsedData.fileUpload,
      parsedData
    );
    //Remove the image from data to prevent trying to add it as a separate field in the sheet
    parsedData.fileUpload = imageUrl;

    await updateGoogleSheet(authClient, parsedData);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Comanda a fost trimisă cu succes!" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
