import { createLazyFileRoute } from "@tanstack/react-router";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import GuestLayout from "../layouts/GuestLayout";
import { useEffect, useState } from "react";
import { findCars, getCars } from "../service/cars";
import CarItem from "../components/Car";
import MyVerticallyCenteredModal from "../components/Modals";
import { MoonLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { getAvailables } from "../service/availables";
import { useSelector } from "react-redux";
import { getType } from "../service/type";
import Protected from "../components/Auth/Protected";

export const Route = createLazyFileRoute("/findcars")({
  component: () => (
    <Protected roles={[1, 2]}>
      <FindCars />
    </Protected>
  ),
});

const HeroSection = () => {
  return (
    <section id="hero" style={{ background: "#f1f3ff" }}>
      <Container className="hero">
        <Row className="pt-5 d-flex justify-content-center align-items-center flex-sm-column flex-lg-row">
          <Col lg={6} sm={6}>
            <h1>Sewa & Rental Mobil Terbaik di kawasan Jambi</h1>
            <p className="col-11 mt-4 mb-3">
              Selamat datang di Binar Car Rental. Kami menyediakan mobil
              kualitas terbaik dengan harga terjangkau. Selalu siap melayani
              kebutuhanmu untuk sewa mobil selama 24 jam.
            </p>
          </Col>

          <Col
            lg={6}
            sm={6}
            className="container-fluid d-flex justify-content-end"
          >
            <Image src="img/img_car.png" alt="mobil" fluid />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const SearchSection = ({ onSearch, isLoading, setIsLoading }) => {
  const [searchParams, setSearchParams] = useState({
    available_status: "",
    availableAt: "",
    type_name: "",
    capacity: "",
  });
  const [driverStatus, setDriverStatus] = useState([]);
  const [typeCar, setType] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const { data: availables, isSuccess } = useQuery({
    queryKey: ["available"],
    queryFn: () => getAvailables(),
    enabled: !!token,
    refetchOnWindowFocus: true,
  });
  const { data: type } = useQuery({
    queryKey: ["types"],
    queryFn: () => getType(),
    enabled: !!token,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setDriverStatus(availables);
      setType(type);
    }
  }, [isSuccess, availables, type]);

  const handleInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const { data: resultFind, isSuccess: successFind } = useQuery({
    queryKey: ["cars", searchParams],
    queryFn: () => findCars(searchParams),

    enabled: !!isSearchClicked,
    retry: false,
  });
  useEffect(() => {
    if (successFind) {
      onSearch(resultFind);
      setIsLoading(false);
      setIsSearchClicked(false);
      setSearchParams({
        available_status: "",
        availableAt: "",
        type_name: "",
        capacity: "",
      });
    }
  }, [successFind, resultFind, onSearch, setIsLoading]);

  const handleSearch = async () => {
    setIsLoading(true);
    setIsSearchClicked(true);
  };

  return (
    <section id="search">
      <Container className="search position-relative">
        <div className="container row cari mobil position-absolute top-0 start-50 translate-middle bg-white py-3 flex justify-content-center shadow-lg rounded-4">
          <Col className="text-light text-black">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="available_status">Tipe Driver</Form.Label>
              <Form.Select
                id="available_status"
                name="available_status"
                onChange={handleInputChange}
              >
                <option selected>Tipe Driver</option>
                {driverStatus.map((driver, index) => (
                  <option value={driver?.available_status} key={index}>
                    {driver?.available_status == "Available"
                      ? "Dengan Supir"
                      : driver?.available_status == "Not Available" &&
                        "Tidak ada Supir"}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col className="text-light text-black">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="availableAt">Tanggal</Form.Label>
              <Form.Control
                id="availableAt"
                name="availableAt"
                type="date"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col className="text-light text-black">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="type_name">Type Mobil</Form.Label>
              <Form.Select
                id="type_name"
                name="type_name"
                onChange={handleInputChange}
              >
                <option selected>Pilih Type Mobil</option>

                {typeCar?.map((type, index) => (
                  <option value={type?.type_name} key={index}>
                    {type?.type_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col className="text-light text-black">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="capacity">
                Jumlah Penumpang (opsional)
              </Form.Label>
              <Form.Control
                id="capacity"
                name="capacity"
                type="number"
                min="0"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col className="fw-light text-black">
            <div className="flex align-content-center w-100 h-100">
              <Button
                variant="success"
                className="text-white"
                id="btn-submit"
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Cari Mobil"}
              </Button>
            </div>
          </Col>
        </div>
      </Container>
    </section>
  );
};

const ResultSection = ({ cars, isLoading }) => {
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  if (isLoading) {
    return (
      <Row
        className="mt-4 d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <MoonLoader color="#1306ff" />
      </Row>
    );
  }
  return (
    <section id="result">
      <Container className="mt-5 py-5">
        <Row
          className="result container d-flex flex-wrap justify-content-center gap-5"
          id="result-card"
        >
          {console.log(cars)}
          {!cars || cars?.length === 0 ? (
            <p>Tidak ada mobil yang ditemukan.</p>
          ) : (
            cars.map((car) => (
              <Col xs={12} sm={6} md={4} lg={3} key={car?.id} className="mb-4">
                <CarItem
                  modalConfig={{
                    setModalShow,
                    modalShow,
                  }}
                  setId={setId}
                  car={car}
                />
              </Col>
            ))
          )}
        </Row>
      </Container>

      <MyVerticallyCenteredModal
        show={modalShow}
        setOpenForm={setOpenForm}
        id={id}
        onHide={() => {
          setModalShow(false);
        }}
      />
    </section>
  );
};

function FindCars() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <GuestLayout>
      <HeroSection />
      <SearchSection
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onSearch={setCars}
      />
      <ResultSection
        cars={cars}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </GuestLayout>
  );
}



