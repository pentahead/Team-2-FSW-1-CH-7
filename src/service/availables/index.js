export const getAvailables = async (availableName) => {
  const token = localStorage.getItem("token");
  let params;
  if (availableName) {
    params.available_status = availableName;
  }
  let url =
    `${import.meta.env.VITE_API_URL}/availables` + new URLSearchParams(params);

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};

export const getDetailAvailable = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/availables/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};

export const createAvailable = async (request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("available_status", request.availableStatus);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/availables`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  });

  // get the data if fetching succeed!
  const result = await response.json();
  return result;
};

export const updateAvailable = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("available_status", request.availableStatus);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/availables/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: formData,
    }
  );

  // get the data if fetching succeed!
  const result = await response.json();
  return result;
};

export const deleteAvailable = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/availables/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  // get data
  const result = await response.json();
  return result;
};
