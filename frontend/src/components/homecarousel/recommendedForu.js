import React, { useState, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import "../homecarousel/Homecarousal.css";
import { Link } from "react-router-dom"; // Import Link
import Home from "./img/homeIcon.png";

const RecommandedForYou = () => {
  return (
    <div className="container my-5">
      <div className="py-5">
        <h2 className="sectionHeading">Topics recommended for you</h2>
        <div className="sectionHeadingLine"></div>
      </div>
      <div className="row">
        <div className="col-sm-2">
          <div className="LogBtn mb-4">Analytics</div>
        </div>
        <div className="col-sm-2">
          <div className="LogBtn mb-4">Webify</div>
        </div>
        <div className="col-sm-2">
          <div className="LogBtn mb-4">Intelligence</div>
        </div>
        <div className="col-sm-2">
          <div className="LogBtn mb-4">FullStack</div>
        </div>
        <div className="col-sm-2">
          <div className="LogBtn mb-4">CyberSafe</div>
        </div>
        <div className="col-sm-2">
          <div className="LogBtn mb-4">Prototyper</div>
        </div>
        <div className="col-sm-2">
          <div className="LogBtn mb-4">GameCraft</div>
        </div>
        <div className="col-sm-2">
          <div className="LogBtn mb-4">Cloudify</div>
        </div>
        <div className="col-sm-2">
          <div className="LogBtn mb-4">Digitize</div>
        </div>
        <div className="col-sm-2">
          <div className="LogBtn mb-4">iOSify</div>
        </div>
      </div>
    </div>
  );
};

export default RecommandedForYou;
