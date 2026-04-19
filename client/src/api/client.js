const API_BASE_URL = "http://localhost:5000/api";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...options.headers
    },
    method: options.method || "GET",
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const registerUser = (payload) =>
  request("/auth/register", {
    method: "POST",
    body: payload
  });

export const loginUser = (payload) =>
  request("/auth/login", {
    method: "POST",
    body: payload
  });

export const getProfile = (token) =>
  request("/auth/me", {
    token
  });

export const getListings = (filters) => {
  const params = new URLSearchParams();

  if (filters.city) {
    params.set("city", filters.city);
  }

  if (filters.type && filters.type !== "all") {
    params.set("type", filters.type);
  }

  if (filters.verifiedOnly) {
    params.set("verified", "true");
  }

  const query = params.toString();
  return request(`/listings${query ? `?${query}` : ""}`);
};

export const getListingDetails = (listingId) => request(`/listings/${listingId}`);

export const createSubscription = (token, payload) =>
  request("/subscriptions", {
    method: "POST",
    token,
    body: payload
  });

export const getMySubscriptions = (token) =>
  request("/subscriptions/mine", {
    token
  });

export const createListing = (token, payload) =>
  request("/listings", {
    method: "POST",
    token,
    body: payload
  });

export const verifyListing = (token, listingId) =>
  request(`/listings/${listingId}/verify`, {
    method: "PATCH",
    token
  });

export const getAdminDashboard = (token) =>
  request("/admin/dashboard", {
    token
  });
