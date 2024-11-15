export const getManufacture = async (manufactureName) => {
  const token = localStorage.getItem("token");
  let params;
  if (manufactureName) {
    params.manufacture_name = manufactureName;
  }
  let url =
    `${import.meta.env.VITE_API_URL}/manufactures` +
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

export const getDetailManufacture = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/manufactures/${id}`;

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
export const createManufacture = async (request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("manufacture_name", request.manufactureName);
  formData.append("manufacture_region", request.manufactureRegion);
  formData.append("year_establish", request.year);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/manufactures`, {
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

export const updateManufacture = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("manufacture_name", request.manufactureName);
  formData.append("manufacture_region", request.manufactureRegion);
  formData.append("year_establish", request.year);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/manufactures/${id}`,
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

export const deleteManufacture = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/manufactures/${id}`;

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
