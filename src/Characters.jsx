import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Header from "./components/Header"
import axios from "axios"
import ReactPaginate from "react-paginate"


export default function Characters() {
   const [characters, setCharacters] = useState([]);
   const [status, setStatus] = useState("");
   const [name, setName] = useState("");
   const [pageCount, setPageCount] = useState(0);
   const [currentPage, setCurrentPage] = useState(0);


   useEffect(() => {
      void getCharacters(currentPage + 1);
   }, [currentPage]);

   const getCharacters = async (page) => {
      try {
         const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
         setCharacters(response.data.results);
         setPageCount(response.data.info.pages);
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   };

   const handlePageClick = (event) => {
      setCurrentPage(event.selected);
   };


   useEffect(() => {

      axios.get(`https://rickandmortyapi.com/api/character/?page=2&name=${name}&status=${status}`)
         .then(response => {
            setCharacters(response.data.results);
         })
   }, [status, name])
   return (
      <>

         <Header />
         <label className=".label" htmlFor="characters">Characters</label>
         <input placeholder="search for characters" className="inputs" type="text" id="characters"
            value={name} onChange={(e) => setName(e.target.value)} />
         <button className="search-button" onClick={() => setCurrentPage(0)}>Search</button>

         <div className="main-div">
            <div className="filter"><h3>Filters</h3>

               <button className="filter-button" onClick={(e) => (setStatus(""))}>All</button>
               <button className="filter-button" onClick={(e) => (setStatus("Alive"))}>Alive</button>
               <button className="filter-button" onClick={(e) => (setStatus("Dead"))}>Dead</button>
               <button className="filter-button" onClick={(e) => (setStatus("unknown"))}>Unknown</button>

            </div>


            <div className="resultFilter"><div className="filtered-characters">

               {characters.map(n => (
                  <div className="filtered-character" key={n.id}>

                     <img className="image" src={n.image} alt="img" />
                     <div style={{ background: n.status === 'Dead' ? 'red' : n.status === 'Alive' ? "green" : "gray" }} className="status">{n.status}</div>
                     <div className="about-characters">
                        <p className="character-name">{n.name}</p>
                        <p className="location-description">Last Location</p>
                        <p className="location">{n.location.name}</p>
                        <Link to={'/selectedCharacters/' + n.id}><button className="get-info">Get info</button></Link>

                     </div>
                  </div>
               ))}
            </div>
            </div>
         </div>
         <footer className="footer">

            <ReactPaginate
               previousLabel={'previous'}
               nextLabel={'next'}
               breakLabel={'...'}
               breakClassName={'break-me'}
               pageCount={pageCount}
               marginPagesDisplayed={2}
               pageRangeDisplayed={3}
               onPageChange={handlePageClick}
               containerClassName={'pagination'}
               activeClassName={'active'}
            />

         </footer>
      </>
   )
}