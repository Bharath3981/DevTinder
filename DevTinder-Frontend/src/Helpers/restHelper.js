const baseUrl = "http://localhost:3000";

export const login = async (emailId, password) => {
  return await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ emailId, password }),
    credentials: "include",
  });
};

export const getProfile = async () => {
  return await fetch(`${baseUrl}/profile/view`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

export const logout = async () => {
  const response = await fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response;
};

//Implement method to fetch user feed
export const getFeed = async () => {
  return await fetch(`${baseUrl}/user/feed`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};
