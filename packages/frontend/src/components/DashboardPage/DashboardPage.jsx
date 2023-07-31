import {
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { Table } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import ShowDeleteModal from "../TransactionDeleteModal/ShowDeleteModal";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import css from "./DashboardPage.module.css";
import ShowEditModal from "../TransactionEditModal/ShowEditModal";
import React, { useMemo } from "react";
import { compareAsc } from 'date-fns';


const DashboardPage = ({ transactions, updateBalance }) => {
  const [deletedTransactions, setDeletedTransactions] = useState([]);
  const { owner } = useParams();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/finances/sum/${owner}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch balance");
        }

        const data = await response.json();
        const newBalance = data.sum;
        updateBalance(newBalance);
      } catch (error) {
        console.error("An error occurred. Please try again later.");
      }
    };

    fetchBalance();
  }, [deletedTransactions, owner, updateBalance]);

  const updateDeleteTransactions = (deletedTransaction, newBalance) => {
    setDeletedTransactions((prevDeletedTransactions) =>
      prevDeletedTransactions.concat(deletedTransaction._id)
    );
    updateBalance(newBalance);
  };

  const [updatedTransactions, setUpdatedTransactions] = useState([]);
  const updateTransactions = (newTransaction) => {
    setUpdatedTransactions(newTransaction);
  };

  const filteredTransactions = useMemo(() => {
    const mergedTransactions = [
      ...transactions.filter(
        (transaction) => !deletedTransactions.includes(transaction._id)
      ),
      ...updatedTransactions,
    ];

    const uniqueTransactions = mergedTransactions.reduce((acc, transaction) => {
      const existingTransaction = acc.find((t) => t._id === transaction._id);
      if (!existingTransaction) {
        acc.push(transaction);
      } else if (
        existingTransaction &&
        updatedTransactions.includes(transaction)
      ) {
        Object.assign(existingTransaction, transaction);
      }
      return acc;
    }, []);

    const sortedTransactions = uniqueTransactions.sort((a, b) => {
      const dateA = new Date(
        Number(a.date.split('.')[2]),  
        Number(a.date.split('.')[1]) - 1, 
        Number(a.date.split('.')[0])  
      );
    
      const dateB = new Date(
        Number(b.date.split('.')[2]), 
        Number(b.date.split('.')[1]) - 1, 
        Number(b.date.split('.')[0])  
      );
    
      return compareAsc(dateB, dateA);
    });
    return sortedTransactions;
  }, [transactions, deletedTransactions, updatedTransactions]);



  return (
    <div>
      <div>
        <TableContainer
          component={Paper}
          className={css.tableContainer}
          style={{
            backgroundColor: "transparent",
            boxShadow: "none",
            borderRadius: "0",
          }}
        >
          <Table
            sx={{ minWidTableCell: 550 }}
            aria-label="simple table"
            style={{
              borderCollapse: "collapse",
              borderSpacing: "0",
              border: "none",
            }}
          >
            <TableHead className={css.tableHeader}>
              <TableRow>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "900",
                    borderRadius: "30px 0 0 30px",
                    borderBottom: "none",
                    // marginBottom: "10px",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "900",
                    borderBottom: "none",
                    paddingLeft: "2px",
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "900",
                    borderBottom: "none",
                  }}
                >
                  Category
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "900",
                    borderBottom: "none",
                  }}
                >
                  Comment
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    
                    fontWeight: "800",
                    borderBottom: "none",
                  }}
                >
                  Sum
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "900",
                    borderBottom: "none",
                  }}
                ></TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontWeight: "900",
                    borderRadius: "0 30px 30px 0",
                    borderBottom: "none",
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.flatMap((info, index) => (
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
                  <TableCell
                    align="left"
                    style={{
                      fontWeight: "700",
                      color: info.type === "-" ? "#FF6596" : "#24CCA7",
                    }}
                  >
                    {info && typeof info.sum === 'number' ? info.sum.toFixed(2) : ""}
                  </TableCell>
                  <TableCell align="left" className={css.editRow}>
                    <ShowEditModal
                      prevCategory={info.category}
                      prevType={info.type}
                      prevDate={info.date}
                      prevComment={info.comment}
                      prevSum={info.sum}
                      id={info._id}
                      updateBalance={updateBalance}
                      updateTransactions={updateTransactions}
                    />
                  </TableCell>
                  <TableCell align="left" className={css.deleteRow}>
                    <ShowDeleteModal
                      id={info._id}
                      updateDeleteTransactions={updateDeleteTransactions}
                    />
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
