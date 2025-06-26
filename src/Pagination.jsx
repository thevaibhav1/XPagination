import { useEffect, useState } from "react";
import "./Pagination.css";
const Pagination = () => {
  const [userdata, setUserData] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setUserData(data);
      } catch {
        alert("failed to fetch data");
      }
    };
    fetchData();
  }, []);
  const pages = Math.ceil(userdata.length / 10);
  const indexOfLast = currentpage * 10;
  const indexOfFirst = indexOfLast - 10;
  const currentData = userdata.slice(indexOfFirst, indexOfLast);

  const handleNext = () => {
    if (currentpage < pages) {
      setCurrentPage(currentpage + 1);
    }
  };
  const handlePrevious = () => {
    if (currentpage > 1) {
      setCurrentPage(currentpage - 1);
    }
  };
  return (
    <>
      <h2>Employee Table Data</h2>
      <table className="table">
        <tr className="table-heading">
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        {currentData.map((ele) => {
          return (
            <tr key={ele.id} className="table-row">
              <td>{ele.id}</td>
              <td>{ele.name}</td>
              <td>{ele.email}</td>
              <td>{ele.role}</td>
            </tr>
          );
        })}
      </table>
      <div className="btn">
        <button onClick={handlePrevious}>Previous</button>
        <span>{currentpage}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </>
  );
};
export default Pagination;

// email: "aaron@mailinator.com";
// id: "1";
// name: "Aaron Miles";
// role: "member";
