import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import './table.css'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
];

export default function TableComponents({ myDonorReq }) {

  console.log(myDonorReq);
  return (
    <TableContainer className="overFlow" component={Paper}>
      <Table sx={{ minWidth: "50vw" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Recipient Name</TableCell>
            {/* <TableCell className="hidden" align="right">Recipient Location</TableCell> */}
            <TableCell align="right">Donation Date & time</TableCell>
            <TableCell align="right">Donation Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myDonorReq?.map((row, i) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="right">{row.recipientName}</TableCell>
              {/* <TableCell align="right">{row.upuzlia} <br /> {row.districts}</TableCell> */}
              <TableCell align="right">
                {row.donateDate} <br />
                {row.donateTime}

              </TableCell>
              <TableCell align="right">{row.donationStatus}</TableCell>
            </TableRow>
          ))}


        </TableBody>
      </Table>
    </TableContainer>
  );
}
