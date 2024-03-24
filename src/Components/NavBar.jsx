import { Box, useToast, Text, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const state = useSelector((state) => state);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    toast({
      title: "User Logged Out",
      status: "success",
      duration: 1000,
      isClosable: true,
    });
    // setTimeout(() => {
    //   navigate("/");
    // }, 1000);
  };
  return (
    <>
      <Box className="flex justify-around items-center py-5">
        <Text>
          <Link to="/">
            Task
            <Text as={"span"} color={"red"}>
              Master
            </Text>
          </Link>
        </Text>{" "}
        <Text>
          <Link to="/">DashBoard</Link>
        </Text>
        <Text>
          {state.username || (
            <Button
              onClick={() => navigate("/login")}
              className="w-fit m-auto"
              colorScheme="blue"
            >
              LOGIN
            </Button>
          )}
        </Text>
        {state.username && (
          <Button
            colorScheme="red"
            className="w-fit px-2"
            id="logoutButton"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Box>
    </>
  );
};

export default NavBar;
