import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { Thead, Tbody } from 'react-super-responsive-table';
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { border } from '@mui/system';
// import css from "./DashboardPage.module.css"

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
        <div>
        <div
        //     style={{
        //    visibility: 'hidden'
        // }}
        >
        <TableContainer component={Paper} style={{
            width: '700px',
            backgroundColor: 'transparent'
        }}>
            <Table sx={{ minWidTableCell: 550 }} aria-label="simple table">
                <TableHead style={{
                    backgroundColor: '#FFFFFF'
                    }}>
                    <TableRow >
                        <TableCell align="left" style={{
                        fontWeight: '900'
                    }}>Date</TableCell>
                        <TableCell align="left" style={{
                        fontWeight: '900'
                    }}>Type</TableCell>
                        <TableCell align="left" style={{
                        fontWeight: '900'
                    }}>Category</TableCell>
                        <TableCell align="left" style={{
                        fontWeight: '900'
                    }}>Comment</TableCell>
                        <TableCell align="left" style={{
                        fontWeight: '900'
                    }}>Sum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[data].flatMap((transaction, idx) => (
                        transaction.transactions.map((info, index) => (
                            <TableRow key={`${idx}-${index}`}
                                sx={{ '&:last-child TableCell, &:last-child th': { border: 0 } }}>
                                <TableCell align="left">{info.date}</TableCell>
                                <TableCell align="left">{info.type}</TableCell>
                                <TableCell align="left">{info.category}</TableCell>
                                <TableCell align="left">{info.comment}</TableCell>
                                <TableCell align="left">{info.sum}</TableCell>
                            </TableRow>
                        ))
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
        </div>
    );
}

export default DashboardPage;
