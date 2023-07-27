import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./DashboardPage.module.css"

const DashboardPage = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { owner } = useParams();

    useEffect(() => {
        fetch(
            `http://localhost:5000/api/getFinances/${owner}`,
        {
        method: "GET",
        headers: {
            "Content-Type": "application-json",
        }})
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "financesData");
            setData(data.data);
            setIsLoading(false);
        });
    }, [owner]);
    
        if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <table className={css.table}>
            <thead className={css.financesHistory}>
                    <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Comment</th>
                    <th>Sum</th>
                    </tr> 
            </thead>
            <tbody>
        {[data].flatMap((transaction, idx) => (
                transaction.transactions.map((info, index) => (
                        <tr key={`${idx}-${index}`}>
                         <td>{info.date}</td>
                         <td>{info.type}</td>
                         <td>{info.category}</td>
                         <td>{info.comment}</td>
                        <td>{info.sum}</td>  
                        </tr>
                ))
        ))}  
        </tbody>
    </table>
    )}

export default DashboardPage;
