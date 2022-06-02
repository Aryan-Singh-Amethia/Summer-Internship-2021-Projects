import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import { SERVER_URL,ROLL_NUMBER } from '../utils/constants';
import InfiniteScroll from "react-infinite-scroll-component";
import formatter from '../utils/formatter';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import {
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    divs:{
        backgroundColor:"#39495E",
        color:"#FFFFFF",
        fontFamily:"Ubuntu"
    },

    view:{
        
        marginLeft:"30px",
        width: "237px",
        height: "45px",
        border: "1px solid #FFFFFF",
        borderRadius: "10px",
        background: "#273D49CC",
        textAlign: "center",
        fontSize: "18px",
        color: "#FFFFFF",
        textTransform:"none",
        }, 
      add:{
          color:"#14AFF1",
          marginTop:"30px",
          marginLeft:"638px",
          textAlign:"center",
          border:"1px solid #14AFF1",
          borderRadius:"10px",
          width:"99px",
          height:"45px",
          textTransform:"none",
          fontSize:"20px"
      },
  
      can:{
      color:"#14AFF1",
      marginTop:"30px",
      marginLeft:"350px",
      textAlign:"center",
      border:"1px solid #14AFF1",
      borderRadius:"10px",
      width:"120px",
      height:"45px"
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
      paper: { 
        minWidth: "900px",
      },
      grid:{
        width:"100%",
        margin:"0px",
        color:"#FFFFFF"
  
    },
      
     
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

 
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ViewBtn() {

  let [isNext, isNextFunc] = React.useState(false);
  let [pageCount, setCount] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  var rdata=[]
  let total_amt=0;
  const Check =useSelector((state) => state.ch);

  const classes= useStyles();

  const handleClickOpen = () => {
    console.log(Check.check_data.length)
    if(Check.check_data.length==1){
      axios
      .get(`http://localhost:8080/Summer_Internship_Backend/viewdata?pageCount=${pageCount}&doc_id=${Check.check_data[0]}`)
      .then((response) => {
        rdata= [...response.data]
        let col=0;
        let bodyEl = document.getElementById("getTable");
        console.log(rdata);
        rdata.forEach((item, index) => {
          
         if(col%2==0){
        let html = `
          <tr style="background-color:#2A3E4C" >
          <td>${item.doc_id}</font></td>
          <td>${item.doc_id}</font></td>
          <td>${item.document_create_date}</td>
          <td>${item.due_in_date}</td>
          <td>${item.invoice_currency}</td>
          <td>${item.total_open_amount}</td>
          </tr>
          `;
          
          bodyEl.innerHTML += html;
         }

         else{
          let html = `
          <tr>
          <td >${item.doc_id}</td>
          <td>${item.doc_id}</td>
          <td>${item.document_create_date}</td>
          <td>${item.due_in_date}</td>
          <td>${item.invoice_currency}</td>
          <td>${item.total_open_amount}</td>
          
          </tr>
          `;
         
          bodyEl.innerHTML += html;
         }

         
          
       
          col=col+1;
      });


      })
      .catch((error) => {
        console.log(error);
      });
      setOpen(true);

    }
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const columnTextStyle = {
    color: "#97A1A9",
     font:" normal normal normal Ubuntu",
     fontSize:"18px",
     borderBottom:"none"
  }
  const bodTextStyle = {
    color:"#FFFFFF",
     font:"normal normal normal Ubuntu",
     fontSize : "16px", 
     opacity:"1",
     borderBottom:"none"
  }

  return (
    <div>
      <Button className={classes.view} variant="outlined" onClick={handleClickOpen}>View Correspondence</Button>

      <Dialog classes={{ paper: classes.paper}} onClose={handleClose} aria-labelledby="form-dialog-title" open={open}>
        <DialogTitle className={classes.divs} id="customized-dialog-title" onClose={handleClose}>
         View Correspondence
        </DialogTitle>
        <DialogContent className={classes.divs} dividers>
       
        
          <Typography gutterBottom color="#FFFFFF">
           <font color="#C0C6CA"> Subject:</font> Invoice Details
           
          </Typography>
          
          
          <Typography gutterBottom color="#C0C6CA">
          <font color="#C0C6CA">   Dear Sir/Madam, </font>
          </Typography>
          
          <Typography gutterBottom>
          <font color="#C0C6CA"> 
          <p></p>   <p></p>        </font>
          </Typography>
          <Typography gutterBottom>
          <font color="#C0C6CA"> 
          <p></p>   <p></p>        </font>
          </Typography>
          <Typography gutterBottom>
          <font color="#C0C6CA">  Gentle reminder that you have one or more open invoices in your account. </font>
          </Typography>
          <Typography gutterBottom>
          <font color="#C0C6CA"> Please get back to us with an expected date of payment. If you have any specific issues with the invoice(s),
          please let us know so that we can address it at the earlist.
          
           </font>
          </Typography>
          <Typography gutterBottom>
          <font color="#C0C6CA"> 
          <p></p>   <p></p>        </font>
          </Typography>
          <Typography gutterBottom>
          <font color="#C0C6CA"> 
          Please find the details of invoice below.
           </font>
          </Typography>

          <div>
        
          <Table style={{border:"none"}}>
            <TableHead>
              <TableRow  style={{ height: "20px", width: "100%"}}>
                <TableCell style={columnTextStyle}>Invoice number</TableCell>
                <TableCell style={columnTextStyle}>PO number</TableCell>
                <TableCell style={columnTextStyle}>Invoice Date</TableCell>
                <TableCell style={columnTextStyle}>Due Date</TableCell>
                <TableCell style={columnTextStyle}>Currency</TableCell>
                <TableCell style={columnTextStyle}>Open Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody id="getTable" >
              {rdata.map((data1, index) => (
                <TableRow 
                 
                >
                </TableRow>
              ))}
            </TableBody>
          </Table>
        
      </div>
      <Typography gutterBottom>
          <font color="#C0C6CA"> 
          <p></p>   <p></p>        </font>
          </Typography>
          <Typography gutterBottom>
          <font color="#C0C6CA"> 
          Incase you have already made the payment for above items, please send us the details to ensure payment is posted.
           </font>
          </Typography>
          <Typography gutterBottom>
          <font color="#C0C6CA"> 
          Let us know if we can if we can be of any further assistance. Looking forward to hearing from you.           </font>
          </Typography>
          <Typography gutterBottom>
          <font color="#C0C6CA"> 
          <p></p>   <p></p>        </font>
          </Typography>
          <Typography gutterBottom>
          <font color="#C0C6CA"> 
          <p></p>   <p></p>        </font>
          </Typography>
          <Typography gutterBottom>
          <font color="#C0C6CA"> 
         Kind Regards    </font>
          </Typography>
          <Typography gutterBottom>
          <font color="#C0C6CA"> 
        HighRadius    </font>
          </Typography>
         
        </DialogContent>
        <DialogActions className={classes.divs}>
            <Button className={classes.can} onClick={handleClose} color="primary">
              Clear
            </Button>
            <Button className={classes.can} onClick={handleClose} color="primary">
              Download
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}