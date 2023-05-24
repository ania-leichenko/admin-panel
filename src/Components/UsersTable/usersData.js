import db from "../../firebaseConfig";

export const fetchUsers = () => {
  return db
    .collection("users")
    .get()
    .then((querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        usersData.push({ ...data, id: doc.id });
      });
      return usersData;
    })
    .catch((error) => {
      console.error("Error while getting data:", error);
      return [];
    });
};
