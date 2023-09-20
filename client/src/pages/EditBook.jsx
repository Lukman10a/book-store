import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "./../components/BackButton";
import Spinner from "./../components/Spinner";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:27017/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error occured, kindly check your console");
        console.log(error);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:27017/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book edited successfully", { variant: "SUCCESS" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error occured. Please check console");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-blue-300 rounded-xl w-[600px] p-4 mx-auto">
        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500"> Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 px-4 py-2 w-full border-gray-500"
          />
        </div>
        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500"> Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 px-4 py-2 w-full border-gray-500"
          />
        </div>
        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500"> Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 px-4 py-2 w-full border-gray-500"
          />
        </div>
        <button className="bg-blue-300 m-8 p-2" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
