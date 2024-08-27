
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
export default function Carousel() {
  return (
    <div className="carousel-container">
      <div className="fixed-background"></div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <form className="d-flex search-form">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success text-white bg-success"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>

          <div className="carousel-item active " id="coursel2">
            <img
              src="caorousel/rice1.jpg"
              className="d-block w-100"
              alt="Rice"
              style={{
                filter: "brightness(30%)",
                objectFit: "contain !important",
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="caorousel/millets.jpg"
              className="d-block w-100"
              alt="Millets"
              style={{ filter: "brightness(30%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="caorousel/finger millets.jpg"
              className="d-block w-100"
              alt="Finger Millets"
              style={{ filter: "brightness(30%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="caorousel/groundnuts.jpg"
              className="d-block w-100"
              id="ground-nuts"
              alt="Groundnuts"
              style={{ filter: "brightness(30%)" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
