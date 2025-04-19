import { useEffect, useState } from "react";
import { GITHUB_API } from "./constants";

function useAbout() {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    fetchUserData();
  }, []);

  async function fetchUserData() {
    const response = await fetch(GITHUB_API);
    const data = await response.json();
    setUserInfo(data);
  }

  return userInfo;
}

export default useAbout;
