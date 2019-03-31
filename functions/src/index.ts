import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const jiraOAuth= functions.https.onRequest((request, response) => {
  response.send("This will connect JIRA using oauth.");
});
