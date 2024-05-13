import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import './events.scss';
import { fetchEvents } from '../../redux/operations';

function Events() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await fetchEvents();
        setData(eventsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(data.length / usersPerPage);

  const displayData = data
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((event, index) => (
      <li key={index}>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <p>{formatDate(event.eventDate)}</p>
        <p>{event.organizer}</p>

        {event.subscribers.map((subscriber) => (
          <div>
            <p>{subscriber.name}</p>
            <p>{subscriber.email}</p>
          </div>
        ))}

        <button>Register</button>
      </li>
    ));

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="customers-section">
      <div className="costumer-section__header">
        <div className="customers-section__container">
          <h2 className="customers-section__title">All Customers</h2>
          <span className="customers-section__span">Active Members</span>
        </div>
      </div>
      {displayData}
      <div className="pagination-container">
        <p className="customers-section__paragraph">
          Showing data 1 to 8 of 256K entries
        </p>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'pagination'}
          activeClassName={'active'}
          className="paginate"
        />
      </div>
    </div>
  );
}

export default Events;
