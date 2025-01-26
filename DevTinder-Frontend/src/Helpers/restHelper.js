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

//Implement method to update user profile
export const updateProfile = async (profile) => {
  return await fetch(`${baseUrl}/profile/edit`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
    credentials: "include",
  });
};

//Implement metod to fetch user connections
export const getConnections = async () => {
  return await fetch(`${baseUrl}/user/connections`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

//Implement method to send connection requests received
export const receivedConnectionRequests = async () => {
  return await fetch(`${baseUrl}/user/requests/received`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

//Implement method to review connection requests sent
export const reviewRequestsReceived = async (status, requestId) => {
  return await fetch(`${baseUrl}/request/review/${status}/${requestId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};
