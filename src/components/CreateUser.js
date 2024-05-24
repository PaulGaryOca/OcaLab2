import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [title, setTitle] = useState();
  const [artist, setArtist] = useState();
  const [album, setAlbum] = useState();
  const [year, setYear] = useState();
  const [genre, setGenre] = useState();
  const [songLink, setLink] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/upload_song', { title, artist, album, year, genre, songLink })
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-E4FBFF justify-content-center align-items-center">
      <div className="w-50 bg-B8B5FF rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="">Song Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="">Artist Name</label>
            <input
              type="text"
              placeholder="Enter Artist Name"
              className="form-control"
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="">Album Name</label>
            <input
              type="text"
              placeholder="Enter Album Name"
              className="form-control"
              onChange={(e) => setAlbum(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="">Date</label>
            <input
              type="Number"
              placeholder="Enter Date"
              className="form-control"
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="">Genre</label>
            <input
              type="text"
              placeholder="Enter Genre"
              className="form-control"
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="">Song Link</label>
            <input
              type="text"
              placeholder="Enter Song Link"
              className="form-control"
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <button className="btn btn-success">Upload Song</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
