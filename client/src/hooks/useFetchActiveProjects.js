import { useEffect } from "react";

const useFetchActiveProjects = (user) => {
  useEffect(() => {
    console.log("user updated", user);
  }, [user]);

  if (!user)
    return {
      user: undefined,
      status: false,
    };

  //   console.log("usefetchActiveProejcts triggered");
};

export default useFetchActiveProjects;
