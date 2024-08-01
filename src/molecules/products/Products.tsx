import React, { useState, useEffect, useCallback } from "react";
import { Card, Col, Row, Modal } from "antd";
import Rating from "./Rating"; // Import the Rating component
import "./products.scss";
import Navbar from "../../atoms/navbar/Navbar";

const { Meta } = Card;

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    const handleOnline = () => {
      console.log("App is online. Fetching products...");
      fetchProducts();
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, [fetchProducts]);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <Navbar />
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {products.map((product) => (
            <Col xs={24} sm={18} md={12} lg={6} key={product.id}>
              <div className="products-card-outside">
                <Card
                  hoverable
                  className="movie-card"
                  cover={
                    <div className="card-image">
                      <img alt={product.title} src={product.image} />
                    </div>
                  }
                  onClick={() => openModal(product)} // Open modal on card click
                >
                  <Meta
                    title={product.title}
                    description={
                      <>
                        <Rating rating={product.rating.rate} />{" "}
                        {/* Use Rating component */}
                        <br />
                        <span>${product.price.toFixed(2)}</span>
                      </>
                    }
                  />
                </Card>
              </div>
            </Col>
          ))}
        </Row>

        {/* Modal for displaying detailed product information */}
        <Modal
          title={selectedProduct ? selectedProduct.title : ""}
          open={modalVisible}
          onCancel={closeModal}
          footer={null}
        >
          {selectedProduct && (
            <div>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                style={{ marginBottom: "16px", maxWidth: "100%" }}
              />
              <p>{selectedProduct.description}</p>
              <p>Category: {selectedProduct.category}</p>
              <Rating rating={selectedProduct.rating.rate} />{" "}
              {/* Display rating */}
              <p>Price: ${selectedProduct.price.toFixed(2)}</p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Products;
