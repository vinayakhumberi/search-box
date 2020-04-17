import React, { useState, useEffect } from 'react';
import "./table.css";

export default function(props) {
  const [data, setData] = useState(props.data);
  const [loopData, setLoopData] = useState({});
  const [finalData, setFinalData] = useState({});
  const handleNext = (event) => {
    const direction = event.currentTarget.getAttribute('data-direction');
    let page = data.page;
    if (direction == 'up') {
      if (data.page < data.nbPages) {
        page = data.page + 1
      }
    } else {
      if (data.page >= 0) {
        page = data.page - 1
      }
    }
    props.fetchService(data.params, page);
  }

  useEffect(() => {
    setData(props.data);
    let lpData = {};
    if(props.data) {
      for (let i = 0; i < props.data.hits.length; i++) {
        lpData[props.data.hits[i].author] = props.data.hits[i];
      }
      setLoopData(lpData);
    }
  }, [props.data]);
  useEffect(() => {
    const keys = Object.keys(loopData);
    if (loopData) {
      for(let i=0; i<keys.length; i++) {
        fetch(`https://hn.algolia.com/api/v1/users/${keys[i]}`)
          .then((response) => {
            return response.json();
          })
          .then((d) => {
            setFinalData(finalData => {
              return { ...finalData, [d.objectID]: d}
            })
          });
      }
    }
  }, [loopData]);
  const values = Object.values(loopData);
  const html = values.map((item) => {
    return (
      <tr>
        <td>
          <a href={item.url || item.story_url} target="_blank" >
          {item.title || item.story_title}
          </a>
            </td>
        <td>
          {finalData[item.author] ? finalData[item.author].submission_count : 'fetching..'}
      </td>
      </tr>
    );
  })
  return(
    <React.Fragment>
      <table className="table" CELLSPACING="0" CELLPADDING="5">
        <colgroup>
          <col span="2" />
          <col span="4" />
        </colgroup>
      <tbody className="table-body">
        <tr>
          <th>
            Title
          </th>
          <th>
            Author(Submission count)
          </th>
        </tr>
        {html}
        </tbody>
    </table>
    {data && 
    <div>
      <button
          onClick={handleNext}
          data-direction="down"
      >
        Back
        </button>
      {data.page} / {data.nbPages}
        <button
          onClick={handleNext}
          data-direction="up"
        >
          Next
        </button>
        </div>}
    </React.Fragment>
  );
}