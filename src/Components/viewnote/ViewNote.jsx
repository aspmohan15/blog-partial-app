import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewNote.css";
import swal from "sweetalert";
import { useReactToPrint } from "react-to-print";

const ViewNote = ({ appBlogs, setBlogs, getData }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const navigate = useNavigate();
  const [categories, setCategories] = useState("-- Select Categories --");
  const [filteredData, setFilteredData] = useState(appBlogs ? appBlogs : []);

  useEffect(() => {
    getData();
  }, []);

  const [lock, setLock] = useState(false);
  useEffect(() => {
    const data = appBlogs.filter((blog) => blog.category === categories);
    if (categories === "-- Select Categories --") setFilteredData(appBlogs);
    else setFilteredData(data);
  }, [appBlogs, categories]);

  // editData
  const editHandler = (dataId) => {
    console.log(dataId);
    navigate(`/edit/${dataId}`);
  };
  // deleteData
  const deleteHandler = (dataId) => {
    axios.delete(`/api/items/${dataId}`);
    setBlogs(appBlogs.filter((blog) => blog._id !== dataId));
    swal("Good job!", `Deleted Successfully`, "success");
  };

  const togleLock = () => {
    setLock(!lock);
  };

  const unLock = () => {
    window.location.href = "https://otptask.herokuapp.com/";
    setLock(!lock);
  };

  return (
    <div>
      <h1 className="text-center">Blogs</h1>
      <select
        className="category-form form-control d-block m-auto"
        onChange={(e) => setCategories(e.target.value)}
      >
        <option>-- Select Categories --</option>
        <option>Education</option>
        <option>Health</option>
        <option>Art</option>
        <option>Music</option>
        <option>Travel</option>
        <option>Fashion</option>
        <option>Food</option>
      </select>
      <div
        style={{
          padding: "50px",
          display: "flex",
          color: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button onClick={handlePrint}>Export Blog</button>
      </div>
      <div className="bloggy-view" ref={componentRef}>
        {filteredData.length !== 0 ? (
          filteredData.map((blog) => {
            return (
              <div className="card blog-card" key={blog._id}>
                
                <div className="card-body">
                  {lock ? (
                    ""
                  ) : (
                    <>
                      <span className="d-flex justify-content-between">
                        <i
                          class="fas fa-edit"
                          onClick={() => editHandler(blog._id)}
                        ></i>
                        <i
                          class="fas fa-trash-alt"
                          onClick={() => deleteHandler(blog._id)}
                        ></i>
                      </span>
                    </>
                  )}

                  <div className="mt-3">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{blog.content}</p>
                    <span className="badge badge-info">{blog.category}</span>
                    <button
                      className={
                        lock ? "btn btn-sm btn-success ml-5" : "btn btn-sm btn-danger ml-5"
                      }
                      onClick={lock ? unLock : togleLock}
                    >
                      {lock ? "Unlock" : "Lock note"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h3 className="no-data d=block m-auto pt-5">
            No blogs on this Category
          </h3>
        )}
      </div>
    </div>
  );
};

export default ViewNote;
