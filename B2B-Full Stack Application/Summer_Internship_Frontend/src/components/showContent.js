import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import InfiniteScroll from "react-infinite-scroll-component";
import "../App.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	table: {
		minWidth: 700
	},
	checked: {},
	root: {
		color: "white",
		"&$checked": {
			color: "blue"
		}
	}
});

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: "rgb(44,65,78)",
		color: "rgb(151,161,169)",
		fontSize: 16,		
	},
	body: {
		backgroundColor: "rgb(44,65,78)",
		color: "rgb(255,255,255)",
		fontSize: 14,
		borderBottom: "none"
	}
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-child(odd)": {
			backgroundColor: "rgb(40,58,100)"
		}
	}
}))(TableRow);

export default function CallApi() {
	const classes = useStyles();
	const [page, setPage] = useState(1);
	const [items, setItems] = useState([]);
	const [hasmore, setHasmore] = useState(false);
	const loadnewdata = () => {
		setPage((prev) => prev + 1);
		console.log("Page:", page);
	};
	
	useEffect(() => {
		if (page !== -1) {
			setHasmore(true);
		}
		axios
			.get(
				`http://localhost:8080/Summer_Internship_Backend/Infinite.do?pageCount=${page}&limit=15`
			)
			.then((res) => {
				console.log(res.data);
				setItems((prev) => {
					return [...prev, ...res.data];

				});
				console.log(items)
			})
			.catch((err) => {
				console.log(err);
			});
	}, [page]);
	return (
		<div>
			<InfiniteScroll
				dataLength={items.length}
				next={loadnewdata}
				hasMore={hasmore}
				loader={
					<div align="center">
						Loading...
					</div>
				}
			>
				<TableContainer>
					<Table>
						<TableHead>
							<StyledTableRow>
								<StyledTableCell> </StyledTableCell>
								<StyledTableCell>Customer Name</StyledTableCell>
								<StyledTableCell align="right">Customer #</StyledTableCell>
								<StyledTableCell align="right">Bill #</StyledTableCell>
								<StyledTableCell align="right">Bill Amount</StyledTableCell>
								<StyledTableCell align="right">Due Date</StyledTableCell>
								<StyledTableCell align="right">Predicted Delay</StyledTableCell>
								<StyledTableCell align="right">Aging Bucket</StyledTableCell>
								<StyledTableCell align="right">Notes</StyledTableCell>
							</StyledTableRow>
						</TableHead>
						<TableBody>
							{items.map((e, i) => {
								return (
									<StyledTableRow
										key={i}
										style={{ fontColor: "whitesmoke" }}
									>
										<StyledTableCell padding="checkbox">
										</StyledTableCell>
										<StyledTableCell align="left">
											{e.name_customer}
										</StyledTableCell>
										<StyledTableCell align="right">
											{e.cust_number}
										</StyledTableCell>
										<StyledTableCell align="right">
											{e.invoice_id}
										</StyledTableCell>
										<StyledTableCell align="right">
											{e.total_open_amount}
										</StyledTableCell>
										<StyledTableCell align="right">
											{e.due_in_date}
										</StyledTableCell>
										<StyledTableCell align="right"> - </StyledTableCell>
										<StyledTableCell align="right"> - </StyledTableCell>
										<StyledTableCell align="right">
											{e.notes}Lorem Ipsum
										</StyledTableCell>
									</StyledTableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</InfiniteScroll>
		</div>
	);
}