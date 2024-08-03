import "./App.css";
import Login from "./Login";

import Content from "./Content";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DeployContractButton from "./DeployContractButton.jsx";
import ReadContract from "./ReadContract.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<Content />} />
          <Route path="/deploycontract" element={<DeployContractButton />} />
          <Route path="/readcontract" element={<ReadContract />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
