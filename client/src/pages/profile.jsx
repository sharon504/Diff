import { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = ({ id }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/v1/user/${id}`)
      .then((response) => {
        const data = response.data;
        setUser(data);
      })
      .catch((error) => console.log(error.message));
  }, []);
  return <></>;
};

export default ProfilePage;
