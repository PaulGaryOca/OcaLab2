import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UupdateSong() {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [artist, setArtist] = useState();
  const [album, setAlbum] = useState();
  const [year, setYear] = useState();
  const [genre, setGenre] = useState();
  const [songLink, setLink] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/get/" + id);
        console.log(response);
        setTitle(response.data.title);
        setArtist(response.data.artist);
        setAlbum(response.data.album);
        setYear(response.data.year);
        setGenre(response.data.genre);
        setLink(response.data.songLink);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/update_song/" + id, {
        title,
        artist,
        album,
        year,
        genre,
        songLink,
      })
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Update Song</h2>
          <div className="mb-2">
            <label htmlFor="">Update Title</label>
            <input
              type="text"
              placeholder="Enter New Title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="">Update Artist</label>
            <input
              type="text"
              placeholder="Enter New Artist"
              className="form-control"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Update Album</label>
            <input
              type="text"
              placeholder="Enter New Title Album"
              className="form-control"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Update Year</label>
            <input
              type="Number"
              placeholder="Enter New Year"
              className="form-control"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="">Update Genre</label>
            <input
              type="text"
              placeholder="Enter New Genre"
              className="form-control"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Update Link</label>
            <input
              type="String"
              placeholder="Enter New Link"
              className="form-control"
              value={songLink}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <button className="btn btn-success"> Update Song</button>
        </form>
      </div>
    </div>
  );
}

export default UupdateSong;
