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
  const response = await fetch(`${baseUrl}/auth/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};
export const logout = async () => {
  const response = await fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};
