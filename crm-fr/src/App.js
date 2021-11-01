import { useState, useEffect, useMemo, useRef } from 'react';
import axios from 'axios';
import { useSortBy, useTable } from 'react-table'

const PAGE_LIMIT = 25;

const  App = () => {
  
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
  const anchor = useRef(null);
  const [searchQuery, setSearchquery] = useState("");
  const [searchParam, setSearchParam] = useState("name");
  const [isActiveFilter, setIsActiveFilter] = useState(false); 
  const [ageMin, setAgeMin] = useState();
  const [ageMax, setAgeMax] = useState();

  const handleInputChange = (e) => {
   setSearchquery(e.target.value)
  };

  const handleSearchParamChange = (e) => {
    setSearchParam(e.target.value)
  }


  useEffect(()=> {
    const fetchData = async() => {
    
      const skipVal = page * PAGE_LIMIT;
      const limit = PAGE_LIMIT;
  
      setError(false);
      setIsLoading(true);
  
      let response;
      let params = {};

      if(searchQuery) {
        params[searchParam] = searchQuery;
      }

      try {
        response = await axios.get(`http://localhost:4000/users?skip=${skipVal}&limit=${limit}`, {params});
      } catch (error) {
         setError(true);
          return;
      }

      if(searchQuery) {
        if(response.data.length >= 1) setData(response.data)
        else setData([])
      } else {
        setData(pre => [...pre, ...response.data])
      }
      setIsLoading(false);
    }

    fetchData()

  }, [page, searchQuery, searchParam])

  

  useEffect(()=> {
    const observer = (items) => {
      const target = items[0];
      if(target.isIntersecting) {
        setPage(pre => pre + 1)
      }
    }
    const options = {
      root: null,
      rootMargin: "25px",
      treshold: 0
    };
    const watcher = new IntersectionObserver(observer, options)
    if(anchor.current) {
      watcher.observe(anchor.current)
    }
  }, [])

  const columns = useMemo(() => [
    {
      Header: 'Main Info',
      columns: [
        {
          Header: 'Full Name',
          accessor: "name",
        },
        {
          Header: "Gender",
          accessor: "gender"
        },
        {
          Header: "Age",
          accessor: "age"
        },
        {
          Header: "Balance",
          accessor: "balance"
        },
        {
          Header: "Status",
          accessor: d => { return d.isActive ? 'active' : 'not active' }
        },
        {
          Header: "Email",
          accessor: "email"
        },
        {
          Header: "Phone No",
          accessor: "phone"
        }
      ],
    },{
      Header: 'Additional Info',
      columns: [
        {
          Header: 'Eye color',
          accessor: 'eyeColor',
        },
        {
          Header: "Address",
          accessor: "address"
        },
        {
          Header: "Company",
          accessor: "company"
        },
      ],
    }

  ], []);



  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns,data }, useSortBy)
  
  return (
    <div className="container">
      <br/>
      <br/>
      <form>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label >enter search params</label>
              <input type="text" className="form-control" value={searchQuery} onChange={handleInputChange}/>
            </div>
            <div className="form-group col-md-4">
              <label>Search by</label>
              <select className="form-control" value={searchParam} onChange={handleSearchParamChange}>
                <option value="name">by name</option>
                <option value="company">by company</option>
                <option value="email">by email</option>
              </select>
            </div>
          </div>
          <br/>
      </form>
        <table {...getTableProps()} className="table table-striped">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (

                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(
              (row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                )}
            )}
          </tbody>
        </table>
        <div ref={anchor} />
    </div>
  );
}

export default App;