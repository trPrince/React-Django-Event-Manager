import React, { useState, useEffect } from "react";
import Pagination from './Pagination';
import './App.css';
import axios from 'axios';
import CustomModal from "./components/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [events,setEvents] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activeId, setActiveId] = useState();
  const [needUpdate,setNeedUpdate] = useState(false);
  useEffect(
    () => {
      const dataFetcher = async () => {
        let result = await axios(`http://127.0.0.1:8000/api/events/?page[number]=${currentPage}&page[size]=${pageSize}`);
          return result.data;
      }
      dataFetcher().then(val => {
        setEvents(val.results);
        setTotalCount(val.count);
        setNeedUpdate(false);
      });
    },[currentPage, pageSize, needUpdate]
  );

  const toggle = () => {
    if(showModal) {
      setActiveId();
    }
    setShowModal(!showModal)
  };

  const edit = (id) => {
    setActiveId(id);
    toggle();
  }

  const create = () => {
    setActiveId();
    toggle();
  }

  async function deleteEvent(id) {
    setActiveId();
    await axios.delete(`http://127.0.0.1:8000/api/events/${id}`);
    setNeedUpdate(true);
  }

  const handleSubmit = item => {
    if (activeId) {
      axios
        .put(`http://127.0.0.1:8000/api/events/${activeId}/`, {...item, id: activeId})
      setNeedUpdate(true);
      return;  
    }
    axios
      .post("http://127.0.0.1:8000/api/events/", item)
      .then(response => setActiveId(response.data.id));
    setNeedUpdate(true);
  };

  return (
    <div className="App">
      <main>
        <h2 style={{"marginBottom":"0px"}}>Events</h2>
        <div style={{"display":"flex"}}>
          <h5 style={{"color":"grey", "marginTop": "5px"}}>List of Events -</h5>
          <button style={{"padding":"0px", "marginLeft":"10px"}} className="btn btn-link" onClick={create}>
            Create
          </button>
        </div>
        <hr/>
        <>
          Show <select style={{"width":"40px"}} value={pageSize} onChange={(event) => setPageSize(parseInt(event.target.value))}>
            <option value ='1'>1</option>
            <option value='2'>2</option>
            <option value='5'>5</option>
            <option value='8'>8</option>
            <option value='10'>10</option>
          </select> entries <br/>
        </>
        <table className="view-table">
          <thead className='view-thead'>
            <tr>
              <th>NAME</th>
              <th>LOCATION</th>
              <th>TIME</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {events.map(item => {
              return (
                <tr key = {item.id}>
                  <td>{item.name}</td>
                  <td>{item.location}</td>
                  <td>{item.date}</td>
                  <td>
                    <button className="btn btn-link" onClick={() => edit(item.id)}>
                      Edit
                    </button>
                    <button className="btn btn-link" onClick={() => deleteEvent(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={page => setCurrentPage(page)}
        />
        <CustomModal 
          show={showModal}
          toggle={toggle}
          onSave={handleSubmit}
          activeId={activeId}
        />
      </main>
    </div>
  );
}

export default App;
