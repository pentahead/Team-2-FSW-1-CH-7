export const getTransmission = async (transmissionName) => {
  const token = localStorage.getItem("token");
  let params;
  if (transmissionName) {
    params.transmission_name = transmissionName;
  }
  let url =
    `${import.meta.env.VITE_API_URL}/transmissions` +
    new URLSearchParams(params);

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result?.data;
};

export const getDetailTransmission = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/transmissions/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result?.data;
};

export const createTransmission = async (request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("transmission_name", request.transmissionName);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/transmissions`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
    }
  );

  // get the data if fetching succeed!
  const result = await response.json();
  return result?.data;
};

export const updateTransmission = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("transmission_name", request.transmissionName);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/transmissions/${id}`,
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
  return result?.data;
};

export const deleteTransmission = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/transmissions/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  // get data
  const result = await response.json();
  return result?.data;
};
