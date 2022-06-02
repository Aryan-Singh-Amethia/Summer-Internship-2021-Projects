// Main center table.
import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@material-ui/core";
import {  makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import { useSelector, useDispatch } from "react-redux";
import './scroller.css'
const Mytheme = createMuiTheme({
    overrides: {
      MuiTableCell: {
        root:{
          borderBottom:'0px'
        },
        body:{
          color: 'rgb(241 231 231 / 87%)',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          maxWidth: '30px'
        },
        head:{
          color:'#97A1A9'
        },
        stickyHeader:{
          color:'#97A1A9',
          backgroundColor:'#2A3E4C'
        }
      },
      MuiTableHead:{
        root:{
          borderBottom: '3px solid #283A46'
        }
      },
      MuiTableRow: {
        root:{
          '&:nth-of-type(even)':{
            backgroundColor:'#283A46'
          },
          '&:nth-of-type(odd)':{
            backgroundColor:'#273D49CC'
          }
        }
      },
    }
    });

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick,  numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <ThemeProvider theme={Mytheme}>
        <TableHead>
            <TableRow >
                <TableCell padding="checkbox" >
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        style={{color:"#97A1A9"}}
                        // color="primary"
                    />
                </TableCell>

                //Table Headers.
                                                <TableCell >
                                                    Name_customer
                                                </TableCell>
                                                <TableCell>Cust_number</TableCell>
                                                <TableCell>Bill_id</TableCell>
                                                <TableCell>Bill_Currency</TableCell>
                                                <TableCell>Due_in_date</TableCell>
                                                <TableCell>Aging Bucket</TableCell> 
                                                <TableCell>Predicted Date</TableCell>
                                               <TableCell>Notes</TableCell>
            </TableRow>
        </TableHead>
        </ThemeProvider>
    );
}
EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
};
const useStyles = makeStyles((theme) =>
 ({
    root: {
        width: '100%',
       // overflow: Hidden,
    },
    paper: {
        width: '100%',
        //marginBottom: theme.spacing(1),
        padding: theme.spacing(1),
        backgroundColor:'#273D49CC',
        marginLeft:10,
        marginTop: 10,
        marginRight:10,
        width: 1575,
        height: 591,
    },
    table: {
        minWidth: 790,
        backgroundColor:'#273D49CC',
        width: 1553,
    '&:nth-of-type(odd)': {
      backgroundColor: "#273D49CC",
      color:"#FFFFFF"
      },   
    },
    myDiv: {
        border:"none",
        background: "#283A46",
        "&:hover": {
          backgroundColor: "#476f85 ",  
        },
      },
      myButton: {
        border:"none",
        backgroundColor: "#273D49CC",
        "&:hover": {
          backgroundColor: "#476f85"
        },
},
}));
export default function TableScroll() {
    const classes = useStyles();
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    let [responseData, setResponseData] = React.useState([]);
    let [isNext, isNextFunc] = React.useState(false);
    let [pageCount, setCount] = React.useState(0);
    const Data = useSelector((state) => state.s);
    const Check =useSelector((state) => state.ch);
    const dispatch = useDispatch();
    React.useEffect(() => {
        getData();
        return () => {};
      }, []);
        const getData = () => {
            axios
              .get(
                `http://localhost:8080/Summer_Internship_Backend/scroll?pageCount=${pageCount}`
              )
              .then((response) => {
                setResponseData([...responseData, ...response.data]);
                isNextFunc(true);
                setCount(pageCount + 1);
              })
              .catch((error) => {
                console.log(error);
              });
          };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = responseData.map((n) => n.invoice_id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleChange=(e)=>{
        if(e.target.checked===true){
          console.log("checked");
          dispatch({
            type: "DATA_ADD",
            payload: e.target.value
          })
          console.log(Check.check_data);
        }
        else{
          console.log("unchecked");
          dispatch({
            type: "DATA_REMOVE",
            payload: e.target.value
          })
          console.log(Check.check_data);
        }
      };
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
            <ThemeProvider theme={Mytheme}>
                <InfiniteScroll
                   className="scroll"
                    height="30rem"
                    dataLength={responseData.length}
                    next={getData}
                    hasMore={isNext}
                    loader={
                        <div style={{ paddingLeft: '50%', overflow: 'hidden' }}>
                            <CircularProgress />
                        </div>
                    }
                    scrollableTarget="table"
                > 
                    <TableContainer>
                        <Table
                            stickyHeader
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                color="#FFFFFF"
                                backgroundColor= "#58687E"
                                numSelected={selected.length}
                                onSelectAllClick={handleSelectAllClick}
                                rowCount={responseData.length}
                            />
                            <TableBody>
                                {responseData
                                    .map((row, index) => {
                                        return (
                                            <TableRow
                    
                                                hover
                                                role="checkbox"
                                                className={index % 2 === 0 ? classes.myDiv : classes.myButton}
                                                key={index.toString()}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
            
                                                        style={{color:"#97A1A9"}} 
                                                        value={row.doc_id} onChange={handleChange}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.name_customer}
                                                </TableCell>
                                                <TableCell>{row.cust_number}</TableCell>
                                                <TableCell>{row.invoice_id}</TableCell>
                                                <TableCell>{row.total_open_amount}</TableCell>
                                                <TableCell>{row.due_in_date}</TableCell>
                                                <TableCell>-</TableCell>
                                                <TableCell>-</TableCell>
                                                <TableCell>{row.notes}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </InfiniteScroll>
</ThemeProvider>
            </Paper>
        </div>
    );
}
