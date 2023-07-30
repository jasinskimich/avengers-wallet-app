import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ShowDeleteModal from "../TransactionDeleteModal/ShowDeleteModal";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import css from "./DashboardPage.module.css";
import ShowEditModal from "../TransactionEditModal/ShowEditModal";
import React, { useMemo } from "react";

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
    setUpdatedTransactions(newTransaction)  
  };
  

  const filteredTransactions = useMemo(() => {
    const mergedTransactions = [
      ...transactions.filter(
        (transaction) => !deletedTransactions.includes(transaction._id)
      ),
      ...updatedTransactions
    ];
  
    const uniqueTransactions = mergedTransactions.reduce((acc, transaction) => {
      const existingTransaction = acc.find((t) => t._id === transaction._id);
      if (!existingTransaction) {
        acc.push(transaction);
      } else if (existingTransaction && updatedTransactions.includes(transaction)) {
        
        Object.assign(existingTransaction, transaction);
      }
      return acc;
    }, []);
  
   
    return uniqueTransactions;
  }, [transactions, deletedTransactions, updatedTransactions]);
 
  const reverseTransactions = useMemo(() => {
    return [...filteredTransactions].reverse();
  }, [filteredTransactions]);

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
                    <ShowEditModal
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
