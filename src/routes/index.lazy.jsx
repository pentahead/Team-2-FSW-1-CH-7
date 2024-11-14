/* eslint-disable no-unused-vars */
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import {
  Button,
  Container,
  Carousel,
  Row,
  Col,
  ListGroup,
  Card,
  Accordion,
  DropdownButton,
} from "react-bootstrap";
import GuestLayout from "../layouts/GuestLayout";
export const Route = createLazyFileRoute("/")({
  component: Index,
});

const Hero = () => {
  return (
    <>
      <section id="hero" style={{ background: "#f1f3ff" }}>
        <Container className="hero">
          <Row className="pt-5 d-flex justify-content-center align-items-center flex-sm-column flex-lg-row">
            <Col lg={6} sm={12} className="text-center text-lg-start">
              <h1>Sewa & Rental Mobil Terbaik di kawasan Jambi</h1>
              <p className="col-11 mt-4 mb-3">
                Selamat datang di Binar Car Rental. Kami menyediakan mobil
                kualitas terbaik dengan harga terjangkau. Selalu siap melayani
                kebutuhanmu untuk sewa mobil selama 24 jam.
              </p>
              <Button
                as={Link}
                to="/findcars"
                variant="success"
                className="text-white"
              >
                Mulai Sewa Mobil
              </Button>
            </Col>

            <Col lg={6} sm={12} className="d-flex justify-content-end">
              <img src="img/img_car.png" alt="mobil" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

const OurService = () => {
  return (
    <>
      <section id="our-service">
        <Container className="my-5 py-5">
          <Row>
            <Col className="d-flex justify-content-center align-items-center mb-5 mb-lg-0">
              <img
                src="img/img_service.png"
                alt="Service"
                className="img-fluid"
              />
            </Col>
            <Col>
              <h1>Best Car Rental for any kind of trip in Jambi!</h1>
              <p>
                Sewa mobil di Jambi bersama Binar Car Rental jaminan harga lebih
                murah dibandingkan yang lain, kondisi mobil baru, serta kualitas
                pelayanan terbaik untuk perjalanan wisata, bisnis, wedding,
                meeting, dll.
              </p>
              <ListGroup className="m-0 p-0">
                <ListGroup.Item>
                  <div className="d-flex justify-content-start align-items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="12" fill="#CFD4ED" />
                      <path
                        d="M17.3333 8L9.99996 15.3333L6.66663 12"
                        stroke="#0D28A6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-3 ms-2">
                      Sewa Mobil Dengan Supir di Bali 12 Jam
                    </p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-start align-items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="12" fill="#CFD4ED" />
                      <path
                        d="M17.3333 8L9.99996 15.3333L6.66663 12"
                        stroke="#0D28A6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-3 ms-2">
                      Sewa Mobil Lepas Kunci di Bali 24 Jam
                    </p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-start align-items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="12" fill="#CFD4ED" />
                      <path
                        d="M17.3333 8L9.99996 15.3333L6.66663 12"
                        stroke="#0D28A6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-3 ms-2">
                      Sewa Mobil Jangka Panjang Bulanan
                    </p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-start align-items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="12" fill="#CFD4ED" />
                      <path
                        d="M17.3333 8L9.99996 15.3333L6.66663 12"
                        stroke="#0D28A6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-3 ms-2">
                      Gratis Antar - Jemput Mobil di Bandara
                    </p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-start align-items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="12" fill="#CFD4ED" />
                      <path
                        d="M17.3333 8L9.99996 15.3333L6.66663 12"
                        stroke="#0D28A6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-3 ms-2">
                      Layanan Airport Transfer / Drop In Out
                    </p>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

const WhyUs = () => {
  return (
    <>
      <section id="why-us">
        <Container className="why-us my-3 py-3">
          <Col>
            <Row className="text-center text-lg-start">
              <h1>Why Us?</h1>
              <p>Mengapa harus pilih Binar Car Rental?</p>
            </Row>
            <Row className="my-5">
              <ListGroup className="d-flex justify-content-center gap-3 flex-column flex-lg-row align-items-center">
                <ListGroup.Item className="border-0">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="16" cy="16" r="16" fill="#F9CC00" />
                        <path
                          d="M11.8333 24.3333H9.33329C8.89127 24.3333 8.46734 24.1577 8.15478 23.8452C7.84222 23.5326 7.66663 23.1087 7.66663 22.6667V16.8333C7.66663 16.3913 7.84222 15.9674 8.15478 15.6548C8.46734 15.3423 8.89127 15.1667 9.33329 15.1667H11.8333M17.6666 13.5V10.1667C17.6666 9.50362 17.4032 8.86774 16.9344 8.3989C16.4656 7.93006 15.8297 7.66666 15.1666 7.66666L11.8333 15.1667V24.3333H21.2333C21.6352 24.3379 22.0253 24.197 22.3315 23.9367C22.6378 23.6763 22.8397 23.3141 22.9 22.9167L24.05 15.4167C24.0862 15.1778 24.0701 14.9339 24.0027 14.7019C23.9354 14.4698 23.8184 14.2552 23.6598 14.0729C23.5013 13.8906 23.305 13.7449 23.0846 13.646C22.8642 13.5471 22.6249 13.4973 22.3833 13.5H17.6666Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <Card.Title className="my-3">Mobil Lengkap</Card.Title>
                      <Card.Text>
                        Tersedia banyak pilihan mobil, kondisi masih baru,
                        bersih dan terawat
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="16" cy="16" r="16" fill="#FA2C5A" />
                        <path
                          d="M23.1583 17.175L17.1833 23.15C17.0285 23.305 16.8447 23.4279 16.6424 23.5118C16.44 23.5956 16.2232 23.6388 16.0041 23.6388C15.7851 23.6388 15.5682 23.5956 15.3659 23.5118C15.1636 23.4279 14.9797 23.305 14.825 23.15L7.66663 16V7.66666H16L23.1583 14.825C23.4687 15.1373 23.6429 15.5597 23.6429 16C23.6429 16.4403 23.4687 16.8627 23.1583 17.175V17.175Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.8334 11.8333H11.8417"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <Card.Title className="my-3">Harga Murah</Card.Title>
                      <Card.Text>
                        Harga murah dan bersaing, bisa bandingkan harga kami
                        dengan rental mobil lain
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="16" cy="16" r="16" fill="#0D28A6" />
                        <path
                          d="M16 24.3333C20.6023 24.3333 24.3333 20.6024 24.3333 16C24.3333 11.3976 20.6023 7.66666 16 7.66666C11.3976 7.66666 7.66663 11.3976 7.66663 16C7.66663 20.6024 11.3976 24.3333 16 24.3333Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 11V16L19.3333 17.6667"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <Card.Title className="my-3">Layanan 24 Jam</Card.Title>
                      <Card.Text>
                        Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami
                        juga tersedia di akhir minggu
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
                <ListGroup.Item className="border-0">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="16" cy="16" r="16" fill="#5CB85F" />
                        <path
                          d="M16.0001 18.5C19.2217 18.5 21.8334 15.8883 21.8334 12.6667C21.8334 9.44501 19.2217 6.83334 16.0001 6.83334C12.7784 6.83334 10.1667 9.44501 10.1667 12.6667C10.1667 15.8883 12.7784 18.5 16.0001 18.5Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.8416 17.575L11.8333 25.1667L15.9999 22.6667L20.1666 25.1667L19.1583 17.5667"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <Card.Title className="my-3">
                        Sopir Professional
                      </Card.Title>
                      <Card.Text>
                        Sopir yang profesional, berpengalaman, jujur, ramah dan
                        selalu tepat waktu
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </ListGroup.Item>
              </ListGroup>
            </Row>
          </Col>
        </Container>
      </section>
    </>
  );
};

const Testimonial = () => {
  return (
    <>
      <section id="testimonial">
        <Container className="testimonial">
          <Row className="text-center">
            <h1>Testimonial</h1>
            <p>Berbagai review positif dari para pelanggan kami</p>
          </Row>

          <Row className="d-flex justify-content-center">
            <Carousel id="carouselExample" className="py-3">
              <Carousel.Item className="active">
                <Card>
                  <Card.Body>
                    <Row className="d-flex flex-column justify-content-center flex-lg-row">
                      <Col
                        lg={3}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <img src="img/img_photo.png" alt="" />
                      </Col>
                      <Col lg={9}>
                        <ListGroup className="d-flex flex-row justify-content-lg-start justify-content-center my-3 p-0 m-lg-0">
                          {[...Array(5)].map((_, index) => (
                            <ListGroup.Item key={index} className="border-0">
                              <svg
                                width="16"
                                height="15"
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                                  fill="#F9CC00"
                                />
                              </svg>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                        <p className="card-text">
                          “Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod lorem ipsum dolor sit amet,
                          consectetur adipiscing elit, sed do eiusmod lorem
                          ipsum dolor sit amet, consectetur adipiscing elit, sed
                          do eiusmod”
                        </p>
                        <h5 className="card-title">John Dee 32, Bromo</h5>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Carousel.Item>

              <Carousel.Item>
                <Card>
                  <Card.Body>
                    <Row className="d-flex flex-column justify-content-center flex-lg-row">
                      <Col
                        lg={3}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <img src="img/img_photo.png" alt="" />
                      </Col>
                      <Col lg={9}>
                        <ListGroup className="d-flex flex-row  justify-content-lg-start justify-content-center my-3 p-0 m-lg-0">
                          {[...Array(5)].map((_, index) => (
                            <ListGroup.Item key={index} className="border-0">
                              <svg
                                width="16"
                                height="15"
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                                  fill="#F9CC00"
                                />
                              </svg>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                        <p className="card-text">
                          “Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod lorem ipsum dolor sit amet,
                          consectetur adipiscing elit, sed do eiusmod lorem
                          ipsum dolor sit amet, consectetur adipiscing elit, sed
                          do eiusmod”
                        </p>
                        <h5 className="card-title">John Dee 32, Bromo</h5>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Carousel.Item>

              <Carousel.Item>
                <Card>
                  <Card.Body>
                    <Row className="d-flex flex-column justify-content-center flex-lg-row">
                      <Col
                        lg={3}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <img src="/assets/img/img_photo (1).png" alt="" />
                      </Col>
                      <Col lg={9}>
                        <ListGroup className="d-flex  flex-row justify-content-lg-start justify-content-center my-3 p-0 m-lg-0">
                          {[...Array(5)].map((_, index) => (
                            <ListGroup.Item key={index} className="border-0">
                              <svg
                                width="16"
                                height="15"
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                                  fill="#F9CC00"
                                />
                              </svg>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                        <p className="card-text">
                          “Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod lorem ipsum dolor sit amet,
                          consectetur adipiscing elit, sed do eiusmod lorem
                          ipsum dolor sit amet, consectetur adipiscing elit, sed
                          do eiusmod”
                        </p>
                        <h5 className="card-title">John Dee 32, Bromo</h5>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Carousel.Item>
            </Carousel>
          </Row>

          <Row>
            <Col className="d-flex justify-content-center gap-1">
              <button
                className="bg-transparent border-0"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="16"
                    cy="16"
                    r="15.5"
                    fill="white"
                    stroke="#C4C4C4"
                  />
                  <path
                    d="M18.5 21L13.5 16L18.5 11"
                    stroke="#222222"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                className="bg-transparent border-0"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16" cy="16" r="16" fill="#5CB85F" />
                  <rect
                    width="20"
                    height="20"
                    transform="translate(6 6)"
                    fill="#5CB85F"
                  />
                  <path
                    d="M13.5 21L18.5 16L13.5 11"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

const CtaBanner = () => {
  return (
    <>
      <section id="cta-banner">
        <Container className="py-5 my-5">
          <Row
            className="d-flex flex-column justify-content-center text-center text-white py-5 rounded-4"
            style={{ background: "#0d28a6" }}
          >
            <Col>
              <h1>Sewa Mobil di Jambi Sekarang</h1>
              <p className="mb-5 pb-2 mt-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Button
                as={Link}
                to="/findcars"
                className="btn btn-success text-white"
              >
                Mulai Sewa Mobil
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
const Faq = () => {
  return (
    <section id="faq" className="my-5">
      <Container>
        <Row>
          <Col md={6}>
            <h2 className="fw-bold">Frequently Asked Question</h2>
            <h6>
              Pertanyaan yang sering ditanyakan customer, cek pertanyaan Anda di
              sini!
            </h6>
          </Col>
          <Col md={6}>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Apa saja syarat yang dibutuhkan?
                </Accordion.Header>
                <Accordion.Body>
                  Syarat yang umumnya diperlukan untuk menyewa mobil adalah:
                  Kartu identitas resmi (KTP/SIM/Passport) SIM yang masih
                  berlaku (minimal SIM A untuk mobil) Deposit pembayaran atau
                  jaminan sesuai ketentuan penyedia jasa sewa Formulir atau
                  perjanjian sewa yang harus ditandatangani.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  Berapa hari sebelumnya sebaiknya booking sewa mobil?
                </Accordion.Header>
                <Accordion.Body>
                  Disarankan untuk melakukan booking minimal 2-3 hari
                  sebelumnya, terutama di musim liburan atau saat permintaan
                  tinggi, agar Anda mendapatkan mobil sesuai kebutuhan dan
                  pilihan yang lebih beragam.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  Apakah ada biaya antar-jemput?
                </Accordion.Header>
                <Accordion.Body>
                  Biaya antar-jemput mungkin dikenakan tergantung pada kebijakan
                  penyedia jasa sewa mobil. Ada beberapa yang menyediakan
                  layanan ini secara gratis dalam jarak tertentu, namun ada pula
                  yang mengenakan biaya tambahan berdasarkan jarak atau lokasi.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  Bagaimana jika terjadi kecelakaan?
                </Accordion.Header>
                <Accordion.Body>
                  Jika terjadi kecelakaan, segera hubungi pihak penyedia jasa
                  sewa untuk melaporkan kejadian tersebut. Pastikan Anda
                  memahami asuransi yang termasuk dalam paket sewa, karena
                  beberapa penyedia jasa sewa menawarkan asuransi yang mencakup
                  kerusakan kendaraan, tetapi ada juga yang meminta penyewa
                  bertanggung jawab atas kerusakan tertentu.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const Footer = () => {
  return (
    <>
      <footer>
        <Container className="py-1">
          <Row className="d-flex flex-column flex-lg-row">
            <Col>
              <p>Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
              <p>binarcarrental@gmail.com</p>
              <p>081-233-334-808</p>
            </Col>
            <Col className="fw-medium">
              <a className="nav-link active" href="#our-service">
                Our Service
              </a>
              <a className="nav-link text-black" href="#why-us">
                Why Us
              </a>
              <a className="nav-link text-black" href="#testimonial">
                Testimonial
              </a>
              <a className="nav-link text-black" href="#faq">
                FAQ
              </a>
            </Col>
            <Col>
              <div className="row">
                <p>Connect with us</p>
              </div>
              <div className="row">
                <ul className="d-flex gap-2">
                  <li className="list-group">
                    <a href="">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="16" cy="16" r="16" fill="#0D28A6" />
                        <path
                          d="M21 7.66663H18.5C17.395 7.66663 16.3352 8.10561 15.5538 8.88701C14.7724 9.66842 14.3334 10.7282 14.3334 11.8333V14.3333H11.8334V17.6666H14.3334V24.3333H17.6667V17.6666H20.1667L21 14.3333H17.6667V11.8333C17.6667 11.6123 17.7545 11.4003 17.9108 11.244C18.0671 11.0878 18.279 11 18.5 11H21V7.66663Z"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="list-group">
                    <a href="">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="16" cy="16" r="16" fill="#0D28A6" />
                        <path
                          d="M20.1666 7.66663H11.8333C9.53211 7.66663 7.66663 9.53211 7.66663 11.8333V20.1666C7.66663 22.4678 9.53211 24.3333 11.8333 24.3333H20.1666C22.4678 24.3333 24.3333 22.4678 24.3333 20.1666V11.8333C24.3333 9.53211 22.4678 7.66663 20.1666 7.66663Z"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.3334 15.475C19.4362 16.1685 19.3178 16.8769 18.9948 17.4992C18.6719 18.1215 18.161 18.6262 17.5347 18.9414C16.9085 19.2566 16.1987 19.3663 15.5065 19.2549C14.8143 19.1436 14.1748 18.8167 13.6791 18.321C13.1833 17.8252 12.8565 17.1857 12.7451 16.4935C12.6337 15.8013 12.7434 15.0916 13.0586 14.4653C13.3739 13.8391 13.8785 13.3281 14.5009 13.0052C15.1232 12.6823 15.8315 12.5638 16.525 12.6667C17.2325 12.7716 17.8874 13.1012 18.3931 13.6069C18.8988 14.1126 19.2285 14.7676 19.3334 15.475Z"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20.5834 11.4166H20.5917"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="list-group">
                    <a href="">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="16" cy="16" r="16" fill="#0D28A6" />
                        <path
                          d="M25.1667 8.49996C24.3687 9.06285 23.4851 9.49338 22.55 9.77496C22.0482 9.19788 21.3812 8.78887 20.6392 8.60323C19.8973 8.41759 19.1163 8.46429 18.4018 8.737C17.6873 9.00972 17.0737 9.49529 16.6442 10.1281C16.2146 10.7608 15.9898 11.5102 16 12.275V13.1083C14.5356 13.1463 13.0844 12.8215 11.7759 12.1628C10.4673 11.5042 9.34197 10.5322 8.50004 9.33329C8.50004 9.33329 5.16671 16.8333 12.6667 20.1666C10.9505 21.3316 8.906 21.9157 6.83337 21.8333C14.3334 26 23.5 21.8333 23.5 12.25C23.4993 12.0178 23.477 11.7863 23.4334 11.5583C24.2839 10.7195 24.8841 9.66055 25.1667 8.49996V8.49996Z"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="list-group">
                    <a href="">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="16" cy="16" r="16" fill="#0D28A6" />
                        <path
                          d="M9.33329 9.33337H22.6666C23.5833 9.33337 24.3333 10.0834 24.3333 11V21C24.3333 21.9167 23.5833 22.6667 22.6666 22.6667H9.33329C8.41663 22.6667 7.66663 21.9167 7.66663 21V11C7.66663 10.0834 8.41663 9.33337 9.33329 9.33337Z"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M24.3333 11L16 16.8333L7.66663 11"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="list-group">
                    <a href="">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="16" cy="16" r="16" fill="#0D28A6" />
                        <path
                          d="M19.3333 15.1666V11.8333M23.5 7.66663H8.5V21H12.6667V24.3333L16 21H20.1667L23.5 17.6666V7.66663ZM15.1667 15.1666V11.8333V15.1666Z"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col>
              <div className="row">
                <p>Copyright Binar 2022</p>
              </div>
              <div className="row container">
                <div
                  style={{
                    height: "36px",
                    width: "100px",
                    backgroundColor: "#0d28a6",
                  }}
                ></div>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};
function Index() {
  return (
    <>
      <GuestLayout >
      <Hero />
      <OurService />
      <WhyUs />
      <Testimonial />
      <CtaBanner />
      <Faq />
      </GuestLayout>
    </>
  );
}
