import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSucess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSucess,
  deleteUserFailure,
  signOutUserStart,
  // signOutUserFailure,
  // signOutUserSucess,
} from "../redux/user/userSclice";
import { useDispatch } from "react-redux";
import { app } from "../firebase";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSucess, setUpdateSucess] = useState(false);
  const dispatch = useDispatch();

  // console.log(formData);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSucess(data));
      setUpdateSucess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  // const handleDeleteUser=async()=>{
  //   try{
  //       dispatch(deleteUserStart());
  //       const res = await fetch(`/api/user/delete/${currentUser._id}`,{
  //       method:"DELETE",
  //       });
  //       const data = await res.json();
  //       if(data.success === false){
  //         dispatch(deleteUserFailure(data.message));
  //         return;
  //       }
  //   dispatch(deleteUserSucess(data));
  //   }catch(error){
  //     dispatch(deleteUserFailure(error.message));
  //   }
  // }
  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSucess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  // const handleSignOut = async () => {
  //   try {
  //     dispatch(signOutUserStart());
  //     const res = await fetch(`/api/auth/signout`,{
  //       method: "GET",
  //       credentials: "include"
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(signOutUserFailure(data.message));
  //       return;
  //     }
  //     dispatch(signOutUserSucess(data));
  //   } catch (error) {
  //     dispatch(signOutUserFailure(error.message));
  //   }
  // };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout',{
        method:"GET",
        credentials:"include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSucess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7"> Profile </h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 my-3 rounded-lg"
          onChange={handleChange}
        ></input>
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          className="border p-3 my-3 rounded-lg"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          placeholder="password"
          id="password"
          className="border p-3 my-3 rounded-lg"
          onChange={handleChange}
        ></input>
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link className='bg-green-700 text-white mt-4 p-3 rounded-lg uppercase text-center hover:opacity-95'to={"/create-listing"}>Create Listing</Link>
      </form>
      <div className=" flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSucess ? "User Is Updated Successfully" : ""}
      </p>
    </div>
  );
}
