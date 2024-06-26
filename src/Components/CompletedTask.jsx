import { useDispatch, useSelector } from "react-redux";
import { undoTask } from "../Strore/actions";
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { url } from "../App";
function TaskCard({ task }) {
  const toast = useToast();
  const token = useSelector((state) => state.token);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`${url}/tasks/${task._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: "EDIT_TASK",
        title,
        description,
        completed: false,
      }),
    });
    const data = await res.json();
    if (data.msg == "Task Edited") {
      dispatch({
        type: "TASK_EDIT",
        payload: { ...task, title, description },
      });
      toast({
        title: "Task Updated",
        status: "success",
        duration: 1000,
        position: "top-right",
        isClosable: true,
      });
      onClose();
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await fetch(`${url}/tasks/${task._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log(data);
    if (data.msg == "Task Deleted") {
      dispatch({
        type: "DELETE_TASK",
        payload: task,
      });

      toast({
        title: "Task Deleted",
        status: "warning",
        duration: 1000,
        isClosable: true,
      });

      onClose();
    }
  };
  function handleCompletedTask(task) {
    onOpen();
  }
  return (
    <>
      {/* <p>{JSON.stringify(task)}</p>; */}
      {/* <div key={task.id}>
        <input
          type="checkbox"
          id={`task${task.id}`}
          onChange={() => handleCheckboxChange(task)}
        />
        <label htmlFor={`task${task.id}`}>{task.title}</label>
        <Text textDecoration={"line-through"}>{task.description}</Text>
      </div> */}
      <Box>
        <Button
          onClick={onOpen}
          className="px-10"
          // onClick={() => handleCompletedTask(task)}
          textDecoration={"line-through"}
        >
          {task.title}
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="m-auto">Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl className="  flex flex-col gap-5">
              <Input
                type="text"
                placeholder="Enter task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                type="text"
                placeholder="Enter Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Box className="flex justify-around">
                <Button
                  className="w-1/3 mb-5"
                  colorScheme="green"
                  onClick={(e) => handleUpdate(e)}
                >
                  Update
                </Button>
                <Button
                  className="w-1/3 mb-5"
                  colorScheme="red"
                  onClick={(e) => handleDelete(e)}
                >
                  Delete
                </Button>
              </Box>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TaskCard;
