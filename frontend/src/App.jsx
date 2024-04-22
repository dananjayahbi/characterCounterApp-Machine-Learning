import React, { useState } from "react";
import { Input, Button, Typography } from "antd";

const { TextArea } = Input;
const { Text } = Typography;

const App = () => {
  const [count, setCount] = useState(0);
  const [lettersCount, setLettersCount] = useState(0);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    const text = e.target.value;
    setCount(text.length);
  };

  const countLetters = () => {
    const text = document.getElementById("textInput").value;

    setLoading(true); // Set loading state to true

    fetch("http://localhost:8080/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLettersCount(data.lettersCount);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after the request is completed
      });
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <div
          style={{
            width: "800px",
            boxShadow:
              "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
            paddingBottom: "30px",
          }}
        >
          <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <Typography.Title
              style={{
                textAlign: "center",
                marginBottom: "50px",
                fontSize: "30px",
                color: "#525252",
              }}
            >
              Count Letters Without Spaces and Special Characters
            </Typography.Title>
            <TextArea
              id="textInput"
              placeholder="Enter text here..."
              // rows={4}
              onChange={(e) => {
                handleChange(e);
                setLettersCount(0);
              }}
              autoSize={{
                minRows: 3,
              }}
              style={{ marginBottom: "20px" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Text style={{ color: "#525252" }} strong>
                Number of characters: {count}
              </Text>
              <Button style={{paddingBottom: "5px"}} type="primary" onClick={countLetters} loading={loading}>
                {" "}
                Calculate
              </Button>
            </div>
            <div>
              {lettersCount === 0 ? (
                <Text style={{ color: "#525252" }} strong>
                  Send the request to calculate the letters without spaces and
                  special characters!
                </Text>
              ) : (
                <Text style={{ color: "#525252" }} strong>
                  Number of characters (excluding spaces and special
                  characters): {lettersCount}
                </Text>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
