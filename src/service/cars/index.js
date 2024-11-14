export const getCars = async (carName) => {
  const token = localStorage.getItem("token");
  let params;
  if (carName) {
    params.car_name = carName;
  }
  let url =
    `${import.meta.env.VITE_API_URL}/cars` + new URLSearchParams(params);

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
export const findCars = async (filters) => {
  const token = localStorage.getItem("token");
  const url = new URL(`${import.meta.env.VITE_API_URL}/cars`);
  Object.keys(filters).forEach(key => url.searchParams.append(key, filters[key]));

  const response = await fetch(url, {
      headers: { authorization: `Bearer ${token}` },
      method: "GET",
  });

  return response.json();
};

export const getDetailCar = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/cars/${id}`;

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

export const createCar = async (request) => {
  const token = localStorage.getItem("token");

  const formattedAvailableAt = new Date(request.availableAt);
  const formattedDate = formattedAvailableAt.toISOString();

  const formData = new FormData();
  formData.append("plate", request.plate || "");
  formData.append(
    "rentPerDay",
    request.rentPerDay ? String(request.rentPerDay) : "0"
  );
  formData.append("description", request.description || "");
  formData.append("availableAt", formattedDate);
  formData.append("year", request.year ? String(request.year) : "");

  formData.append("availability_id", request.availableStatus || "Available");

  formData.append("model_id", request.modelId ? String(request.modelId) : "0");

  if (request.image) {
    formData.append("image", request.image);
  }

  console.log(request);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/cars`, {
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

export const updateCar = async (id, request) => {
  const token = localStorage.getItem("token");

  const formattedAvailableAt = new Date(request.availableAt);
  const formattedDate = formattedAvailableAt.toISOString();

  const formData = new FormData();
  formData.append("plate", request.plate || "");
  formData.append(
    "rentPerDay",
    request.rentPerDay ? String(request.rentPerDay) : "0"
  );
  formData.append("description", request.description || "");
  formData.append("availableAt", formattedDate);
  formData.append("year", request.year ? String(request.year) : "");

  formData.append("availability_id", request.availableStatus);

  formData.append("model_id", request.modelId);

  if (request.image) {
    formData.append("image", request.image);
  }

  console.log(request);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/cars/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: formData,
  });

  // Get the data if fetching succeed!
  const result = await response.json();
  return result;
};

export const deleteCar = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/cars/${id}`;

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
