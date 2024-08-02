import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  // VideoCameraOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
// import "antd/dist/antd.css";

const { Header } = Layout;

const Navbar: React.FC = () => {
  const menuItems = [
    {
      key: "home",
      label: <Link to="/">Home</Link>,
      icon: <HomeOutlined />,
      path: "/",
    },
    {
      key: "users",
      label: <Link to="/users">Users</Link>,
      icon: <UserOutlined />,
      path: "/users",
    },
    // {
    //   key: "movies",
    //   label: <Link to="/movies">Movies</Link>,
    //   icon: <VideoCameraOutlined />,
    //   path: "/movies",
    // },
    {
      key: "products",
      label: <Link to="/products">Products</Link>,
      icon: <ShoppingOutlined />,
      path: "/products",
    },
  ];

  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" items={menuItems} />
      </Header>
    </Layout>
  );
};

export default Navbar;
