const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];



const credentials = {
  CLIENT_ID: process.env.CLIENT_ID,
  PROJECT_ID: process.env.PROJECT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  CALENDAR_ID: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://regazi.github.io/MeetUp"],
  javascript_origins: ["https://regazi.github.io", "http://localhost:3000", "*"],
};
const { CLIENT_SECRET, CLIENT_ID, redirect_uris, CALENDAR_ID } = credentials;
const oAuth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,

  redirect_uris[0]
);

module.exports.getAuthURL = async () => {


  const authUrl = oAuth2Client.generateAuthUrl({
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    access_type: "offline",
    scope: SCOPES,

  });

  return {

    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  const oAuth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    redirect_uris[0]
  );
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {

    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
    .then((token) => {
      // return token     
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(token),
      };
    })
    .catch((err) => {
      // Handle error
      console.error(err);
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(err),
      };
    });
}

module.exports.getCalendarEvents = event => {
  const oAuth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    redirect_uris[0]
  );
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {

    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  }).then((results) => {
    // return token     
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ events: results.data.items }),
    };
  })
    .catch((err) => {
      // Handle error
      console.error(err);
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(err),
      };
    })
}
