import { TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { Table } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { ReactComponent as EditPen } from "../../images/editPen.svg";
// import { useMediaQuery } from 'react-responsive'
import css from "./DashboardPage.module.css"

const DashboardPage = ({ transactions }) => {
  const reverseTransactions = [...transactions].reverse();
  // const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
  
  return (
    <div>
      <div>
        <TableContainer
          component={Paper}
          style={{
            width: "700px",
            backgroundColor: "transparent",
            boxShadow: "none",
            borderRadius: "0",
          }}
        >
          {/* {isMobile &&
            <TableContainer
          component={Paper}
          style={{
            width: "700px",
            backgroundColor: "white",
            boxShadow: "none",
            borderRadius: "0",
          }}
            >
             } */}
          
          <Table sx={{ minWidTableCell: 550 }} aria-label="simple table"
            style={{
              borderCollapse: "collapse",
              borderSpacing: "0",
              border: "none",
            }}>
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
                    borderRadius: "30px 0 0 30px",
                    borderBottom: "none",
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
                    fontWeight: "900",
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
              {reverseTransactions.flatMap((info, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child TableCell, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="left">{info.date}</TableCell>
                  <TableCell align="left">
                    {info.type}</TableCell>
                  <TableCell align="left">{info.category}</TableCell>
                  <TableCell align="left">{info.comment}</TableCell>
                  <TableCell align="left"
                    style={{
                      fontWeight: "900",
                      color: info.type === "-" ? "#FF6596" : "#24CCA7"
                    }}>
                    {info.sum}</TableCell>
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
