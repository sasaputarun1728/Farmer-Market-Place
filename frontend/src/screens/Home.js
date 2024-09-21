import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { FaArrowUp } from "react-icons/fa"; // Import the up arrow icon
import "./Home.css";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userName, setUserName] = useState("guest");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      response = await response.json();
      setFoodItem(response[0] || []);
      setFoodCat(response[1] || []);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    setUserName("guest");
  };

  const fetchUserName = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setUserName("guest");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/getUser/${email}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserName(data.name || "guest");
    } catch (error) {
      setUserName("guest");
      console.error("Error fetching user name:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    fetchUserName();
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const filteredItems = foodItem.filter(
    (item) =>
      (item.productName.toLowerCase().includes(search.toLowerCase()) ||
       item.category.toLowerCase().includes(search.toLowerCase())) && 
      (selectedCategories.length === 0 || selectedCategories.includes(item.category))
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />

      <div className="welcome-container">
        <div className="hello-message">
          {loading ? (
            <h2 className="text-primary">⏳ Loading...</h2>
          ) : (
            <>
              <h2 className="text-primary">👋 Hello, {userName}!</h2>
              <p>Welcome to Farmer's Market</p>
            </>
          )}
        </div>

        <div className="search-bar">
          <input
            className="form-control"
            type="search"
            placeholder="🔍 Search for products or categories..."
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="carousel-container">
        <div className="fixed-background"></div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-item active">
              <img
                src="/caorousel/rice1.jpg"
                className="d-block w-100"
                alt="Rice"
                style={{
                  filter: "brightness(40%)",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="/caorousel/millets.jpg"
                className="d-block w-100"
                alt="Millets"
                style={{ filter: "brightness(40%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="/caorousel/finger millets.jpg"
                className="d-block w-100"
                alt="Finger Millets"
                style={{ filter: "brightness(40%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="/caorousel/groundnuts.jpg"
                className="d-block w-100"
                alt="Groundnuts"
                style={{ filter: "brightness(40%)" }}
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

      <div className="container1">
        <div className="mb-4">
          {foodCat.length > 0 && (
            <div className="d-flex flex-wrap justify-content-center mb-3 category-buttons">
              <button
                className={`btn me-2 mb-2 ${
                  selectedCategories.length === 0 ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => setSelectedCategories([])}
              >
                All Categories
              </button>
              {foodCat.map((data) => (
                <button
                  key={data._id}
                  className={`btn me-2 mb-2 ${
                    selectedCategories.includes(data.category)
                      ? "btn-success"
                      : "btn-outline-success"
                  }`}
                  onClick={() => toggleCategory(data.category)}
                >
                  {data.category}
                </button>
              ))}
            </div>
          )}
        </div>

        {filteredItems.length > 0 ? (
          <div className="row">
            {filteredItems.map((filteredItem) => (
              <div
                key={filteredItem._id}
                className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch"
              >
                <ProductCard product={filteredItem} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '40px', color: 'red', fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>
            No Products Found 😞 
          </div>
        )}
      </div>

      <div className="thankyou-message">
        <h1>THANK YOU </h1>
        <h2>FOR VISITING OUR </h2>
        <h1>MARKETPLACE</h1>
      </div>

      <div className="footer">
        <Footer />
      </div>

      <button
        className="scroll-to-top"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FaArrowUp size={30} />
      </button>
    </div>
  );
}
