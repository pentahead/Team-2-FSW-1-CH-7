/* eslint-disable react/prop-types */
import Sidebar from "../components/Sidebar";

export default function AuthenticatedLayout({
  openCars,
  setOpenCars,
  openTransmission,
  setOpenTransmission,
  openModel,
  setOpenModel,
  openManufacture,
  setOpenManufacture,
  openType,
  setOpenType,
  openAvailables, // konsisten dengan "openAvailables"
  setOpenAvailables, // konsisten dengan "setOpenAvailables"
  openSpec,
  setOpenSpec,
  openOptions,
  setOpenOptions,
  children,
}) {
  return (
    <>
      <Sidebar
          openCars={openCars}
          setOpenCars={setOpenCars}
          openTransmission={openTransmission}
          setOpenTransmission={setOpenTransmission}
          openModel={openModel}
          setOpenModel={setOpenModel}
          openManufacture={openManufacture}
          setOpenManufacture={setOpenManufacture}
          openType={openType}
          setOpenType={setOpenType}
          setOpenAvailables={setOpenAvailables} // Pastikan ini diteruskan ke layout
          setOpenSpec={setOpenSpec}
          setOpenOptions={setOpenOptions}
          openAvailables={openAvailables} // Pastikan ini diteruskan ke layout
          openSpec={openSpec}
          openOptions={openOptions}
      >
        {children}
      </Sidebar>
    </>
  );
}
