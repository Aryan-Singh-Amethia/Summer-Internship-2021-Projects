// Add buuton functionality.
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
import './addModel.css'
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { Label } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MaterialUIPickers from "./datePicker"
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
    divs:{
      backgroundColor:"#2A3E4C",
        color:"#FFFFFF",
        fontFamily:" normal normal normal Ubuntu"
    },
    paper: { 
          minWidth: "900px",
        },
    view:{  
        width: "237px",
        border: "1px solid #FFFFFF",
        borderRadius: "10px",
        backgroundColor:"#2A3E4C",
        textAlign: "center",
        fontSize: "18px",
        color: "#FFFFFF",
        textTransform:"none",
        }, 
        addbt:{
            color:"#FFFFFF",
           marginLeft:"100px",
            textAlign:"center",
            border:"1px solid #14AFF1",
            borderRadius:"10px",
            width:"85px",
            height:"45px",
            fontSize:"20px",
            margin: theme.spacing(1),
        },
        add:{
           marginLeft:"638px",
           textAlign:"center",
           border:"1px solid #14AFF1",
           borderRadius:"10px",
           width:"120px",
           height:"45px",
           color:"#FFFFFF",
           backgroundColor:"#14AFF1",
       },
       can:{
        color:"#14AFF1",
        marginRight:"580px",
        textAlign:"center",
        borderRadius:"10px",
        width:"120px",
        height:"45px",
        border:"#14AFF1",
        
       },
       clear:{
        color:"#14AFF1",
        marginLeft:"600px",
        marginRight:"15px",
        textAlign:"center",
        borderRadius:"10px",
        width:"120px",
        height:"45px",
        border:"1px solid #14AFF1",
       
       },
       /* divs:{
    backgroundColor:"#273D49CC"
},*/
    rootmain: {
      backgroundColor:"#2A3E4C",
      color:"#FFFFFF",
      display: 'flex',
      flexWrap: 'wrap',
    },
    label1:{
      margin: theme.spacing(1),
      color:"#97A1A9",
    },
    text1:{
      opacity: "1",
      backgroundColor:"#283A46",
      borderRadius: "10px",
      borderColor:"#356680",
      border: "1px solid #356680"

    },
    root1: {
      width: '100%',
      flexGrow: 1,
   
    },
    grid:{
      margin:"0px",
      color:"#FFFFFF",
      width:"100%",
 
  },
}));
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {  //Close Button
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

//Title for pop up box
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


//Content part of dialog bix styling.
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

//
const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
export default function View() {
  let [name_customer, editName] = React.useState("");
  let [due_in_date, editDate] = React.useState("2021-03-22"
);
  let [cust_number, editCustnumber] = React.useState(0);
  let [notes, editNotes] = React.useState("");
  let [doc_id, editId] = React.useState(0);
  let [total_open_amount, editAmount] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleNameChange =(event) =>{
    editName( event.target.value);
  }
  const handleDateChange = (event) =>{
    editDate(event.target.value);
    console.log(due_in_date);
  }
  const handleCustNumberChange =(event) =>{
    editCustnumber(event.target.value);
    console.log(cust_number);
  }
  const handleNotesChange =(event) =>{
    editNotes( event.target.value);
  }
  const handleInvNumberChange =(event) =>{
    editId( event.target.value);
  }
  const handleAmountChange =(event) =>{
    editAmount( event.target.value);
  }
  const handleFinalAdd = () =>{
    axios
    .get(`http://localhost:8080/Summer_Internship_Backend/add?customer_name=${name_customer}&customer_number=${cust_number}&due_in_date=${due_in_date}&notes=${notes}&invoice_id=${doc_id}&invoice_amount=${total_open_amount}`)
    setOpen(false);
  }
  const classes= useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button className={classes.addbt} variant="outlined" onClick={handleClickOpen} startIcon={<AddIcon />} >Add</Button>
      <Dialog classes={{ paper: classes.paper}} onClose={handleClose} aria-labelledby="form-dialog-title" open={open}>
        <DialogTitle className={classes.divs} id="form-dialog-title" onClose={handleClose}>
         Add Invoice
        </DialogTitle>
        <DialogContent className={classes.divs} dividers>
        <form className={classes.rootmain} noValidate autoComplete="off">
          <Grid container spacing={1} className={classes.grid}>
            <Grid item md={6}>
              <label className={classes.label1}>Customer Name<font color="red">*</font></label>
              <TextField  InputProps={{
                    className: classes.text1
                    }} id="cust_name" variant="outlined" marginLeft="70px" name="custName" onChange={handleNameChange}/>
          </Grid>
          <Grid item md={6}>
            <label className={classes.label1}>Due Date<font color="red">*</font></label>
            <TextField   id="date" type="date" defaultValue="2021-03-22" className={classes.text1}
            InputLabelProps={{
                  color:"white",
            }} onChange ={handleDateChange}
            />
          </Grid>
          <Grid item md={7}>
          <label className={classes.label1}>Customer Number<font color="red">*</font></label>
              <TextField InputProps={{
                    className: classes.text1
                    }} id="cust_num" variant="outlined" marginLeft="70px" name="custnum" onChange={handleCustNumberChange}/>
          </Grid>
          <Grid item md={5}>
          <label className={classes.label1}>Note<font color="red">*</font></label>
              <TextField InputProps={{
                    className: classes.text1
                    }} multiline rows={3} id="note" variant="outlined" marginLeft="70px" name="note" onChange={handleNotesChange}/>
          </Grid>
          <Grid item md={7}>
          <label className={classes.label1}>Invoice Number<font color="red">*</font></label>
              <TextField InputProps={{
                    className: classes.text1
                    }} id="inv_num" variant="outlined" marginLeft="70px" name="inv_no" onChange={handleInvNumberChange} />
          </Grid>
          <Grid item md={7}>
          <label className={classes.label1}>Invoice Amount<font color="red">*</font></label>
              <TextField InputProps={{
                    className: classes.text1
                    }} id="inv_amnt" variant="outlined" marginLeft="70px" name="inv_amt" onChange={handleAmountChange}/>
          </Grid>
        </Grid>
        </form>    
        </DialogContent>
        <DialogActions className={classes.divs}>
                <Button style={{color:"#14AFF1"}} className={classes.can} id="addcancel" onClick={handleClose}>
                  Cancel
                </Button>
                <Button style={{color:"#FFFFFF",
                    borderBlockColor:"#14AFF1",
                    borderColor:"#14AFF1"}} variant="outlined" color="#2C404E" className={classes.clear} id="addclr" onClick={handleClose}>
                  Clear
                </Button>
                <Button className={classes.add} id="addt" variant="contained" onClick={handleFinalAdd}>
                  Add
                </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

    /*<InputLabel className={classes.margin} required >Due date</InputLabel>
                <Fragment>
                  <KeyboardDatePicker clearable value={selectedDate} placeholder="10/10/2018" onChange={date => handleDateChange(date)} minDate={new Date()} format="MM/dd/yyyy"/>
                </Fragment>
*/
/*<InputLabel className={classes.margin} required >Due Date</InputLabel>
<KeyboardDatePicker
      margin="normal"
   id="date-picker-dialog"
 label="Date picker dialog"
 format="MM/dd/yyyy"
value={null}
onChange={handleDateChange}
KeyboardButtonProps={{
'aria-label': 'change date',
}}
/>*/
