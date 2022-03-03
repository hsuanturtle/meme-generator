import "./index.css";
import styled from "styled-components";

import Memegenerator from "./components/Memegenerator";

function App() {
  return (
    <Wrapper>
      <div className="title">
        <h1>MEME GENERATOR</h1>
      </div>
      <Memegenerator />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .title {
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    height: 5rem;
    background-color: #000;
    text-align: center;
  }
  .title h1 {
    color: #fff;
  }
`;
export default App;
