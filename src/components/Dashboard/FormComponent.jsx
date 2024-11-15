import { Container, Col, Row, Button, Form, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { createCar, getDetailCar, updateCar } from "../../service/cars";
import { getModels } from "../../service/models";
import { getAvailables } from "../../service/availables";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const FormComponent = ({ setOpenForm, id, setId }) => {
  const [plate, setPlate] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [description, setDescription] = useState("");
  const [availableAt, setAvailableAt] = useState("");
  const [year, setYear] = useState("");
  const [availableStatus, setAvailableStatus] = useState("");
  const [image, setImage] = useState(null);
  const [modelId, setModelId] = useState(0);
  const [currentProfilePicture, setCurrentProfilePicture] = useState(null);
  const queryClient = useQueryClient();

  const { data: models = [] } = useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const result = await getModels();
      return result?.data || [];
    },
  });

  const { data: availableStatuses = [] } = useQuery({
    queryKey: ["availables"],
    queryFn: async () => {
      const result = await getAvailables();
      return result?.data || [];
    },
  });

  const { data: carDetail } = useQuery({
    queryKey: ["carDetail", id],
    queryFn: async () => {
      const result = await getDetailCar(id);
      return result;
    },
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      return id ? updateCar(id, data) : createCar(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["car"]);
      queryClient.invalidateQueries(["carDetail"]);
      setId(null);
      setOpenForm(false);
      toast.success("Data berhasil disimpan");
    },
    onError: (error) => {
      toast.error(`Terjadi kesalahan: ${error?.message || "Unknown error"}`);
    },
  });

  useEffect(() => {
    if (carDetail) {
      setPlate(carDetail?.plate || "");
      setRentPerDay(carDetail?.rentPerDay || "");
      setDescription(carDetail?.description || "");
      setAvailableAt(carDetail?.availableAt || "");
      setYear(carDetail?.year || "");
      setModelId(carDetail?.model_id || "");
      setAvailableStatus(carDetail?.availability_id || "");
      setImage(carDetail?.image || null);
      setCurrentProfilePicture(carDetail?.image || null);
    }
  }, [carDetail]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const rentPerDayNum = parseInt(rentPerDay, 10);
    const yearNum = parseInt(year, 10);
    const modelIdNum = parseInt(modelId, 10);

    if (!plate.trim()) {
      toast.error("Nomor plat tidak boleh kosong");
      return;
    }

    if (isNaN(rentPerDayNum) || rentPerDayNum <= 0) {
      toast.error("Harga sewa per hari harus berupa angka positif");
      return;
    }
    if (isNaN(modelIdNum) || modelIdNum <= 0) {
      toast.error("Silakan pilih model mobil");
      return;
    }
    if (!availableStatus) {
      toast.error("Silakan pilih status ketersediaan");
      return;
    }
    if (!availableAt) {
      toast.error("Silakan pilih tanggal ketersediaan");
      return;
    }

    const request = {
      plate,
      rentPerDay: rentPerDayNum,
      description,
      availableAt,
      year: yearNum,
      availableStatus,
      modelId: modelIdNum,
      image,
    };

    mutation.mutate(request);
  };

  return (
    <Row className="mt-5 bg-white border-2">
      <Col className="offset-md-12">
        <Container fluid className=" p-5">
          <Form onSubmit={onSubmit}>
            <Row className="gap-5">
              <Col xs={4}>
                <Form.Group as={Row} className="mb-3" controlId="image">
                  <div
                    className="mt-4 text-secondary   p-5 rounded-3 "
                    style={{
                      color: "#6c757d",
                      border: "1px dashed #6c757d",
                    }}
                  >
                    <Form.Group controlId="home_photo" className="text-sm">
                      <Container className="d-flex justify-content-center align-items-center text-center mb-3">
                        {currentProfilePicture ? (
                          <Image
                            src={currentProfilePicture}
                            alt="Uploaded Preview"
                            className="w-75 h-auto img-thumbnail"
                          />
                        ) : (
                          <>
                            <i
                              className="bi bi-image text-secondary"
                              style={{ fontSize: "3rem" }}
                            ></i>
                          </>
                        )}
                      </Container>
                      <Form.Label
                        className="d-flex align-items-center cursor-pointer"
                        style={{
                          backgroundColor: "white",
                          color: "#6366F1",
                          fontWeight: "bold",
                          borderRadius: "0.375rem",
                          padding: "0.5rem",
                          textAlign: "center",
                          border: "1px solid #6366F1",
                          transition: "color 0.2s ease",
                          cursor: "pointer",
                        }}
                      >
                        <span>Upload a file</span>
                        <Form.Control
                          type="file"
                          name="home_photo"
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                            setCurrentProfilePicture(
                              URL.createObjectURL(e.target.files[0])
                            );
                          }}
                          className="d-none"
                        />
                      </Form.Label>
                      <span className="d-inline pl-2">or drag and drop</span>
                    </Form.Group>

                    <Form.Text className="text-muted">
                      PNG, JPG, GIF up to 10MB
                    </Form.Text>
                  </div>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group as={Row} className="mb-3" controlId="plate">
                  <Form.Label column sm={3}>
                    Plate
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Plate"
                      required
                      value={plate}
                      onChange={(e) => setPlate(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="rentPerDay">
                  <Form.Label column sm={3}>
                    Rent per Day
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="number"
                      placeholder="Rent per Day"
                      required
                      value={rentPerDay}
                      onChange={(e) => setRentPerDay(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="description">
                  <Form.Label column sm={3}>
                    Description
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="availableAt">
                  <Form.Label column sm={3}>
                    Available At
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="datetime-local"
                      required
                      value={
                        availableAt
                          ? new Date(availableAt).toISOString().slice(0, 16) // format ke YYYY-MM-DDTHH:MM
                          : ""
                      }
                      onChange={(e) => setAvailableAt(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="year">
                  <Form.Label column sm={3}>
                    Year
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="number"
                      placeholder="Year"
                      required
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="availableStatus"
                >
                  <Form.Label column sm={3}>
                    Available Status
                  </Form.Label>
                  <Col sm="9">
                    <Form.Select
                      value={availableStatus} // nilai yang dipilih oleh pengguna
                      onChange={(e) => setAvailableStatus(e.target.value)} // memperbarui status
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      {availableStatuses.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.available_status}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="modelId">
                  <Form.Label column sm={3}>
                    Model
                  </Form.Label>
                  <Col sm="9">
                    <Form.Select
                      value={modelId}
                      onChange={(e) => setModelId(e.target.value)}
                    >
                      <option value={models} disabled>
                        Select Model
                      </option>
                      {models.map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.model_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <div className="d-flex justify-content-start gap-1 flex-row">
                  <Button type="submit" variant="primary">
                    {id ? "Edit Car" : "Create Car"}
                  </Button>

                  <Button
                    onClick={() => {
                      setOpenForm(false);
                      setId(null);
                    }}
                    // type="submit"
                    variant="danger"
                  >
                    Cancel
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default FormComponent;
