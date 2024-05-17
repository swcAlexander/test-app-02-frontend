import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import './events.scss';
import { fetchEvents } from '../../redux/operations';

function Events() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [showSubscribers, setShowSubscribers] = useState(false);

  const [visibleSubscribers, setVisibleSubscribers] = useState({});
  const usersPerPage = 6;

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

const toggleSubscribers = (index) => {
  setVisibleSubscribers((prevVisibleSubscribers) => ({
    ...prevVisibleSubscribers,
    [index]: !prevVisibleSubscribers[index],
  }));
};

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
      <li key={index} className='evens-section_item'>
        <h2 className='evens-section_title'>{event.title}</h2>
        <p className='evens-section_par'>{event.description}</p>
        <p className='evens-section_par'>{formatDate(event.eventDate)}</p>
        <p className='evens-section_par'>{event.organizer}</p>

        {event.subscribers.length > 0 && (
          <div className='button-block'>
            <button type='button' className='onClick-button'>Register</button>
            <button className='onClick-button' onClick={() => toggleSubscribers(index)}>Toggle Subscribers</button>
            {visibleSubscribers[index]  && (
              <div className='backdrop'>
                <div className='modal'>
                <button type="button" class="button-close" onClick={() => toggleSubscribers(index)}>
                  <svg class="button-close__image" width="18" height="18">
                    <use href="./src/assets/images/icons.svg#icon-close-black"></use>
                  </svg>
                </button>
                {event.subscribers.map((subscriber, index) => (
                  <div key={index}>
                    <p className='subsctibers-section_par'>{subscriber.name}</p>
                    <p className='subsctibers-section_par'>{subscriber.email}</p>

                  </div>
                  
                ))}
              </div>
              </div>
                    )}
              
          </div>)}
      </li>
    ));

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="events-section">
      <div className='evens-section_list'>
        {displayData}
      </div>
      <div className="pagination-container">
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
