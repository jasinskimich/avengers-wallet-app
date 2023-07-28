import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { Thead, Tbody } from 'react-super-responsive-table';
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { ReactComponent as EditPen } from "../../images/editPen.svg";

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { border } from '@mui/system';
import css from "./DashboardPage.module.css"

const DashboardPage = ({ transactions }) => {
  const reverseTransactions = [...transactions].reverse();

  return (
    <div>
      <div>
        <TableContainer
          component={Paper}
          style={{
            width: "700px",
            backgroundColor: "transparent",
          }}
        >
          <Table sx={{ minWidTableCell: 550 }} aria-label="simple table">
            <TableHead
              style={{
                backgroundColor: "#FFFFFF",
              }}
            >
              <TableRow>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "900",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "900",
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "900",
                  }}
                >
                  Category
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "900",
                  }}
                >
                  Comment
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "900",
                  }}
                >
                  Sum
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "900",
                  }}
                ></TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "900",
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reverseTransactions.flatMap((info, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child TableCell, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="left">{info.date}</TableCell>
                  <TableCell align="left">{info.type}</TableCell>
                  <TableCell align="left">{info.category}</TableCell>
                  <TableCell align="left">{info.comment}</TableCell>
                  <TableCell align="left">{info.sum}</TableCell>
                  <TableCell align="left" className={css.editRow}>
                    <button className={css.editButton}>
                      <EditPen className={css.editIcon} />
                    </button>
                  </TableCell>
                  <TableCell align="left" className={css.deleteRow}>
                    <button className={css.deleteButton}>Delete</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
