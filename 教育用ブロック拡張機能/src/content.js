import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { firebaseConfig, ORG_ID } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const getDeviceId = () => {
  const key = "deviceId";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
};

const logAccess = async () => {
  const deviceId = getDeviceId();

  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const accessTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
　console.log("ORG_ID:", ORG_ID);
  const logRef = ref(db, `accessLogs/${ORG_ID}/${deviceId}`);
  await push(logRef, {
    url: location.href,
    accessTime
  });
};

logAccess();
