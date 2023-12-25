import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingOverlay = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <ClipLoader size={50} color={"#f11946"} loading={true} />
        <p style={{ marginTop: 10 }}>Please wait...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;