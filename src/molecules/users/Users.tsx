import React, { useState, useEffect, useCallback } from "react";
import { Card, Col, Row, Button, Modal } from "antd";
import "./users.scss";
import Navbar from "../../atoms/navbar/Navbar";
import AddUser from "./AddUser";

const { Meta } = Card;

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  image: string;
  rating?: number; // Optional field
}

const Users: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  useEffect(() => {
    // Fetch users when the component mounts
    fetchUsers();

    // Define handleOnline function
    const handleOnline = () => {
      console.log("App is online. Fetching users...");
      fetchUsers();
    };

    // Add event listener for online status
    window.addEventListener("online", handleOnline);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, [fetchUsers]);

  const handleUserAdded = () => {
    fetchUsers();
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Navbar />
      <Button type="primary" onClick={openModal}>
        Add User
      </Button>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {data.map((user) => (
            <Col xs={24} sm={18} md={12} lg={6} key={user.id}>
              <div className="products-card-outside">
                <Card
                  hoverable
                  className="movie-card"
                  cover={
                    <div className="card-image">
                      <img alt={user.name} src={user?.image} />
                    </div>
                  }
                >
                  <Meta
                    title={user.name}
                    description={
                      <>
                        <span>{user.phone}</span>
                        <br />
                        <span>{user.email}</span>
                        {/* Use Rating component */}
                      </>
                    }
                  />
                </Card>
              </div>
            </Col>
          ))}
        </Row>

        <Modal
          title="Add New User"
          open={isModalVisible}
          onCancel={closeModal}
          footer={null}
        >
          <AddUser onUserAdded={handleUserAdded} onClose={closeModal} />
        </Modal>
      </div>
    </div>
  );
};

export default Users;
