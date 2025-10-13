var admin = require("firebase-admin");

// Correct path to your service account key JSON file
var serviceAccount = require("./prepmate-6eb9d-firebase-adminsdk-fbsvc-dbd9469e01.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Set trial start (call after registration)
async function setTrialClaim(uid) {
  const now = Date.now();
  await admin.auth().setCustomUserClaims(uid, { trialStart: now });
  console.log('Trial claim set for', uid);
}

// Set subscription (call after payment)
async function setSubscriptionClaim(uid) {
  const now = Date.now();
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  await admin.auth().setCustomUserClaims(uid, {
    subscriptionStart: now,
    subscriptionEnd: now + thirtyDays
  });
  console.log('Subscription claim set for', uid);
}

// Set admin role claim
async function setAdminRoleClaim(email) {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { role: 'admin' });
    console.log(`Admin role set for user: ${email} (UID: ${user.uid})`);
  } catch (error) {
    console.error(`Error setting admin role for ${email}:`, error);
  }
}

// Example usage:
const uid = 'xidw2H21KQU6ln4ITGbvNZV8WFw1';
const adminEmail = 'hello.wdservices@gmail.com';

// Uncomment one of the following lines as needed:
// setTrialClaim(uid);
// setSubscriptionClaim(uid);
setAdminRoleClaim(adminEmail);