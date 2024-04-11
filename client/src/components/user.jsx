import { useState, useEffect } from "react";
import axios from "axios";

const User = ({ id }) => {
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
  return (
    <>
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-8">
            <img
              className="w-16 h-16 rounded-full mr-4"
              src="https://via.placeholder.com/64"
              alt="Profile Picture"
            />
            <div>
              <h2 className="text-2xl font-bold">{user && user.username}</h2>
              <p className="text-gray-600">{user && user.name}</p>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">About</h3>
            <p>Year of Study: {user && user.yearOfStudy}</p>
            <p>Tech Stacks:</p>
            <ul className="list-disc list-inside"></ul>
            <p>Projects:</p>
            <ul className="list-disc list-inside">
              <li v-for="project in projects">{user && user.project}</li>
            </ul>
            <p>Joined: {user && user.joinedAt}</p>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-2">Qualifications</h3>
            <p>
              Resume:{" "}
              <a
                href="qualifications.resume.url"
                target="_blank"
                className="text-blue-500 hover:underline"
              ></a>
            </p>
            <p>
              CV:{" "}
              <a
                href="qualifications.cv.url"
                target="_blank"
                className="text-blue-500 hover:underline"
              ></a>
            </p>
            <p>
              Portfolio:{" "}
              <a
                href="qualifications.portfolio"
                target="_blank"
                className="text-blue-500 hover:underline"
              ></a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Contact</h3>
            <p>
              LinkedIn:{" "}
              <a
                href="contact.linkedin"
                target="_blank"
                className="text-blue-500 hover:underline"
              ></a>
            </p>
            <p>
              GitHub:{" "}
              <a
                href="contact.github"
                target="_blank"
                className="text-blue-500 hover:underline"
              ></a>
            </p>
            <p>
              Email:{" "}
              <a
                href="'mailto:' + contact.email"
                className="text-blue-500 hover:underline"
              ></a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
