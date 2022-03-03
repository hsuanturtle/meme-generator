import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import useDraggable from "./useDraggable";
import exportAsImage from "./useExportImage";
import html2canvas from "html2canvas";

const DraggableItem = ({ children }) => {
  const itemRef = useRef(null);
  useDraggable(itemRef);

  return (
    <div className="item" ref={itemRef}>
      {children}
    </div>
  );
};
const Memegenerator = () => {
  const [inputText, setInputText] = useState({
    topText: "",
    bottomText: "",
  });

  const [allImage, setAllImage] = useState([]);
  const [randomImage, setRandomImage] = useState(
    "https://i.imgflip.com/26am.jpg"
  );
  const downloadImage = () => {
    html2canvas(document.querySelector("#image-section")).then((canvas) => {
      document.body.appendChild(canvas);
    });
  };
  //function to fetch data
  const fetchImage = async (url) => {
    try {
      const res = await axios.get(url);
      const images = res.data;
      setAllImage(images.data.memes);
      console.log(allImage);
    } catch (error) {
      console.log(error);
    }
  };

  //function to change the value of input fields
  const handleChange = (e) => {
    setInputText({ ...inputText, [e.target.name]: e.target.value });
  };
  //function to submit from and create meme
  const submitHandler = (e) => {
    e.preventDefault();
    const random = allImage[Math.floor(Math.random() * allImage.length)].url;
    setRandomImage(random);
  };
  useEffect(() => {
    fetchImage("https://api.imgflip.com/get_memes");
  }, []);

  return (
    <Wrapper>
      <form className="input-section" onSubmit={submitHandler}>
        <input
          type="text"
          name="topText"
          placeholder="Enter the top text"
          value={inputText.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Enter the bottom text"
          value={inputText.bottomText}
          onChange={handleChange}
        />
        <button>Generate</button>
      </form>
      <div className="image-section" id="image-section">
        <img className="image" src={randomImage} alt="meme" />

        <DraggableItem className="item">
          <h2 className="top-text text">{inputText.topText}</h2>
        </DraggableItem>
        <DraggableItem className="item">
          <h2 className="bottom-text text">{inputText.bottomText}</h2>
        </DraggableItem>
      </div>
      <button onClick={() => downloadImage()}>Download</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  .input-section {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
    height: 10rem;
    margin-top: 3rem;
  }
  input,
  button {
    font-family: inherit;
    font-size: 2rem;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    border: 1px solid #000;
  }
  button {
    cursor: pointer;
    background-color: #000;
    color: #fff;
    transition: all linear 0.3s;
  }
  button:hover {
    background-color: #fff;
    color: #000;
  }
  .image-section {
    height: 25rem;
    width: 50rem;
    position: relative;
  }
  .image {
    height: 25rem;
    width: 40rem;
  }

  .text {
    color: #fff;
    text-align: center;
    font-family: "impact", sans-serif;
    font-weight: lighter;
    letter-spacing: 2px;
    font-size: 3rem;
    text-transform: uppercase;
    text-shadow: 1px 1px 5px #000;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }
  .top-text {
    position: absolute;
    top: 0;
  }
  .bottom-text {
    position: absolute;
    bottom: 0;
  }
  .item {
    resize: horizontal;
    cursor: grab;
  }
  @media only screen and (max-width: 992px) {
    input,
    button {
      font-family: 1rem;
      padding: 0.2rem 0.4rem;
    }
    .input-section {
      flex-direction: column;
      margin-top: 12rem;
    }
    .image-section {
      height: 20rem;
      width: 20rem;
      margin-bottom: 2rem;
    }
    .image {
      height: 20rem;
      width: 20rem;
    }
  }
`;

export default Memegenerator;
