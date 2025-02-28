import { realtimeDB } from "./firebase.js"; // ✅ Импортируем Realtime Database
import { ref, set } from "firebase/database";
import fs from "fs";

const babysitters = JSON.parse(fs.readFileSync("babysitters.json", "utf8")); // ✅ Читаем JSON-файл

const uploadNanniesToRealtimeDB = async () => {
  try {
    const nanniesRef = ref(realtimeDB, "nannies"); // ✅ Используем `realtimeDB`

    await set(nanniesRef, babysitters);
    console.log("✅ All nannies have been uploaded to Realtime Database!");
  } catch (error) {
    console.error("❌ Error uploading nannies:", error);
  }
};

uploadNanniesToRealtimeDB();
