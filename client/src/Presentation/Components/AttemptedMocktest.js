import "../Styles/AvailableMocktests.css";
import { useDispatch } from "react-redux";
import { startTime, resetTime } from "../../Application/StateManagement/slices/TimerSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const AttemptedMocktests = () => {
  const navigate = useNavigate();
  const id_data = useSelector((state) => state.user.id);
//   const dispatch = useDispatch();
  
  // Start test function
  

  // State to hold the tests data
  const [tests, setTests] = useState([]);

  // Fetch mocktests data from the server
  useEffect(() => {
    async function fetchData() {
        console.log(id_data);
      try {
        const response = await axios.post("http://localhost:8000/mock/attemptedmocks",
            {userId : id_data}
        );
        const data = await response.data;
        console.log(data);
        if(data.error!=true){
            setTests(data); // Make sure to access 'data' key in the response
        }
    } catch (error) {
        console.error("Error fetching mock tests:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="mocktestmaincontainer">
      <h1 className="mocktestHeading">{tests.length === 0 ? "No tests available" : "Available Mocktests"}</h1>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="showtests">
          {tests.map((test, index) => {
              return (
                <div key={index} className="testContainer">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    <h2 className="testName">{test.title}</h2> {/* Using 'test.title' */}
                    <div className="test-tag-cont">
                      <p id="test-tag" className="tag">3 hours</p>
                      <p id="test-tag" className="tag">Score : {test.scoredMarks}</p>
                      <p id="test-tag2" className="startbtn">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          onClick={() => {
                           
                          }}
                        >
                          Analysis
                        </a>
                      </p>
                    </div>
                  </div>
                  <p className="noofques">
                    No of Questions: 75 | Maths: 25 | Physics: 25 | Chemistry: 25
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AttemptedMocktests;
