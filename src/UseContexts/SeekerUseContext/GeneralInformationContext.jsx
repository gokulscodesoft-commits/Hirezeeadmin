import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GeneralInformationContext = createContext();

export const GeneralInformationProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfiles = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin-user-details`
      );

      if (
        response.data.status === "success" &&
        response.data.users.length > 0
      ) {
        const simplifiedUsers = response.data.users.map((user) => ({
          id: user.user_id,
          user: user.profile?.name || "",
          phoneNo: user.profile?.phone || "",
          mail: user.profile?.email || "",
          specialization: user.course?.specialization || "",
          highestQualification: user.course?.highest_qualification_level || "",
          teachingQualification: user.course?.teaching_qualification || "",
          profile_img: user.profile?.profile_img || null,
          resume: user.profile?.resume_path || null,
        }));

        setUsers(simplifiedUsers);
      } else {
        console.error("Failed to fetch users:", response.data.message);
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <GeneralInformationContext.Provider
      value={{ users, loading, fetchProfiles }}
    >
      {children}
    </GeneralInformationContext.Provider>
  );
};

export default GeneralInformationProvider;
