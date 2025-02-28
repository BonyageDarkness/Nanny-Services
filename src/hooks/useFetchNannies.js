import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Убедись, что путь правильный

export const useFetchNannies = () => {
  const [nannies, setNannies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNannies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "nannies"));
        const nanniesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNannies(nanniesList);
      } catch (error) {
        console.error("Error fetching nannies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNannies();
  }, []);

  return { nannies, loading };
};
