import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "./../components/BackButton";
import Spinner from "./../components/Spinner";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(false);
    axios
      .delete(`http://localhost:27017/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: "SUCCESS" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error occured, please check console");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-blue-300 rounded-xl w-[600px] p-4 mx-auto">
        <h3 className="text-2xl">
          Are you sure ou want to delete this book ???
        </h3>
        <button
          className="w-full text-white bg-red-700 m-8"
          onClick={handleDeleteBook}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
