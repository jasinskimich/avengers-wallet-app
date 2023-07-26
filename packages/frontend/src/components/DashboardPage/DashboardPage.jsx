// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import css from "./DashboardPage.module.css"

const DashboardPage = () => {

    // const [data, setData] = useState([]);
    // const { owner } = useParams();

    // useEffect(() => {
    //     fetch(
    //         `http://localhost:5000/api/getFinances/${owner}`,
    //     {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application-json",
    //     }})
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data, "financesData");
    //         setData(data);
    //     });
    // }, [owner]);
    
    return (
        <table className={css.financesHistory}>
        <thead>
            <div>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Comment</th>
                    <th>Sum</th>
                </tr>      
                </div>                
            </thead>
        {/* {data.map((transaction, index) => (
            <div key={index}>
                {transaction.transactions.map((info, index) => (
                    <tr key={index}>
                        <td>{info.date}</td>
                        <td>{info.type}</td>
                        <td>{info.category}</td>
                        <td>{info.comment}</td>
                        <td>{info.sum}</td>                        
                        </tr>
                ))}
                <hr />    
            </div> 
        ))} */}
    </table>
    )}

export default DashboardPage;
