import Navbar from "./Navbar";
const Base = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "70px" }}>{children}</main>
    </>
  );
};

export default Base;
