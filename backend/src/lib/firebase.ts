import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

// Re-initialize only if not already initialized
if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (projectId && clientEmail && privateKey) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId,
                    clientEmail,
                    privateKey: privateKey.replace(/\\n/g, '\n'),
                }),
            });
            console.log("✅ Firebase Admin initialized successfully");
        } catch (error) {
            console.error('❌ Firebase admin initialization error', error);
        }
    } else {
        console.warn("⚠️ Firebase Admin credentials missing. Admin functionality will be limited.");
    }
}

// Safely export auth and db
const adminAuth = admin.apps.length ? admin.auth() : null;
const adminDb = admin.apps.length ? admin.firestore() : null;

export { adminAuth, adminDb, admin };
