import { BrowserRouter } from "react-router-dom";
import MainRoute from "./MainRoute/MainRoute";
import { Provider } from "react-redux";
import store from "./Strore/Store";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./Components/NavBar";
import "./App.css";
// export const url = "http://localhost:4500";
export const url = "https://taskmaster-server-86uu.onrender.com";

function App() {
  return (
    <>
      <ChakraProvider>
        <Provider store={store}>
          <BrowserRouter>
            <NavBar />
            <MainRoute />
          </BrowserRouter>
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default App;
