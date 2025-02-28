import { realtimeDB } from "./firebase.js";
import { ref, set } from "firebase/database";
import fs from "fs";

const babysitters = JSON.parse(fs.readFileSync("babysitters.json", "utf8"));

const uploadNanniesToRealtimeDB = async () => {
  try {
    const nanniesRef = ref(realtimeDB, "nannies");

    await set(nanniesRef, babysitters);
    console.log("✅ All nannies have been uploaded to Realtime Database!");
  } catch (error) {
    console.error("❌ Error uploading nannies:", error);
  }
};

uploadNanniesToRealtimeDB();
