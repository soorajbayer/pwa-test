import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";

const { Item } = Form;

interface AddUserProps {
  onUserAdded: () => void;
  onClose: () => void;
}

const AddUser: React.FC<AddUserProps> = ({ onUserAdded, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log("in here");
    const handleSyncComplete = (event: MessageEvent) => {
      if (event.data && event.data.type === "SYNC_COMPLETE") {
        console.log("Sync complete, refreshing user data...");
        onUserAdded();
      }
    };

    navigator.serviceWorker.addEventListener("message", handleSyncComplete);
    return () => {
      navigator.serviceWorker.removeEventListener(
        "message",
        handleSyncComplete
      );
    };
  }, [onUserAdded]);

  const handleSubmit = async () => {
    const newUser = { name, phone, email };

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setName("");
      setPhone("");
      setEmail("");
      onUserAdded();
      onClose(); // Close the modal after user is added
    } catch (error) {
      if (!navigator.onLine) {
        message.info("Currently Offline. Item will be added when back online");
        setName("");
        setPhone("");
        setEmail("");
        onClose();
      } else {
        console.error("Error adding user:", error);
      }
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Item label="Name">
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Item>
      <Item label="Phone">
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </Item>
      <Item label="Email">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </Item>

      <Item>
        <Button type="primary" htmlType="submit">
          Add User
        </Button>
      </Item>
    </Form>
  );
};

export default AddUser;
