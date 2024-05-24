import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchData = () => {
    axios.get(`http://localhost:3001?sortCriteria=${sortCriteria}&sortOrder=${sortOrder}`)
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, [sortCriteria, sortOrder]); 

  const navigate = useNavigate();

  const handleSort = (criteria) => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortCriteria(criteria);
    setSortOrder(newOrder);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete_song/${id}`)
      .then(res => {
        console.log(res);
        fetchData();
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container-style">
      <div className='container-content'>
        <Link to="/upload_song" className="btn btn btn-sm " style={{
          backgroundColor: "#176B87",
          marginLeft: "0px",
          fontWeight: "bold",
          marginBottom:"30px",
          borderRadius: "10px" 
          
        }}>
          Upload Song +
        </Link>

        <div className="sort-dropdown">
        <label htmlFor="sortCriteria" style={{ fontWeight: "Bold", color: "#000" }}>
  Sort By:
</label>

          <select
            id="sortCriteria"
            onChange={(e) => handleSort(e.target.value)}
            value={sortCriteria}
            style={{ marginLeft: "20px" , fontWeight: "medium", color: "#000"}}
          >
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="year">Year</option>
          </select>

          <label htmlFor="sortOrder" style={{ paddingLeft: "90px",fontWeight: "Bold", color: "#000" }}>Sort Order:</label>
          <select
  id="sortOrder"
  onChange={(e) => setSortOrder(e.target.value)}
  value={sortOrder}
  style={{ marginLeft: "20px",fontWeight: "medium", color: "#000" }}
>

            <option value="asc" >Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <table className="table" style={{ marginTop: "30px" }}>
          <thead>
            <tr>
              <th onClick={() => handleSort('title')}>Title</th>
              <th onClick={() => handleSort('artist')}>Artist</th>
              <th onClick={() => handleSort('album')}>Album</th>
              <th onClick={() => handleSort('year')}>Year</th>
              <th onClick={() => handleSort('genre')} style={{ paddingLeft: "40px" }}>Genre</th>

            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
             <td className="no-border" style={{ fontStyle: "italic", fontWeight: "bold", fontSize: "16px", color: "#333" }}>
  {user.title}
</td>
<td className="no-border" style={{ fontWeight: "medium", color: "#000"  }}>
  {user.artist}
</td>
<td className="no-border" style={{ fontWeight: "medium", color: "#000" }}>
  {user.album}
</td>
<td className="no-border" style={{fontWeight: "medium", color: "#000" }}>
  {user.year}
</td>
<td className="no-border" style={{ fontWeight: "medium", color: "#000", marginLeft: "40px" ,paddingLeft: "40px"}}>
  {user.genre}
</td>
<td className="no-border" style={{ color: "#FF0000" }}>
  {user.someOtherProperty}
</td>

                <td className="no-border">
                  <button onClick={() => window.open(user.songLink, "_blank")} className="btn btn-sm btn-success me-2 " style={{
                    backgroundColor: "#001C30",
                    marginLeft: "0px",
                    fontWeight: "bold",
                    borderRadius: "10px" ,
                    border: "none",
                    height: "38px",
                    width: "80px"
                  }}>
                    LISTEN
                  </button>
                </td>
                <td className="button">
                  <Link to={`update_song/${user._id}`} className="btn btn-sm btn me-2 text-center" style={{
                    backgroundColor: "#176B87",
                    marginLeft: "0px",
                    fontWeight: "bold",
                    marginTop: "1px",
                    borderRadius: "10px" ,
                    height: "35px",
                    width: "83px",
                    color: "white"
                  }}>
                    UPDATE
                  </Link>
                </td>
                <td className="button">
                  <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn" style={{
                    backgroundColor: "#D61355",
                    marginLeft: "0px",
                    marginTop: "1px",
                    fontWeight: "bold",
                    border: "none",
                    height: "35px",
                    width: "83px",
                    borderRadius: "10px" ,
                    marginLeft: "0px",
                    color: "white"
                  }}>DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
