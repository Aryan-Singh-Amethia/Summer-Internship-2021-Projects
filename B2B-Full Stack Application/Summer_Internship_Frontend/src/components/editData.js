// Edit data pop-up.
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
import EditIcon from '@material-ui/icons/Edit';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
const useStyles = makeStyles((theme) => ({
    divs:{
      backgroundColor:"#2A3E4C",
      color:"#FFFFFF",
      fontFamily:" normal normal normal Ubuntu"
    },
    view:{
        width: "85px",
        height: "45px",
        border:"1px solid #14AFF1",
        borderRadius: "10px",
        backgroundColor:"#2A3E4C",
        textAlign: "center",
        fontSize: "18px",
        color: "#FFFFFF",
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
        marginRight:"350px",
        textAlign:"center",
        border:" #14AFF1",
        borderRadius:"10px",
        width:"120px",
        height:"45px"
       },
       clear:{
        color:"#14AFF1",
        marginLeft:"600px",
        marginRight:"15px",
        textAlign:"center",
        border:"1px solid #14AFF1",
        borderRadius:"10px",
        width:"120px",
        height:"45px"
       },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      backgroundColor:"#2A3E4C",
    },
    label1:{
      margin: theme.spacing(1),
      color:"#97A1A9",
    },
    text1:{
      margin: theme.spacing(1),
      border: "1px solid #356680",
      borderRadius: "10px",
      opacity: "1",
      backgroundColor:"#283A46",
      borderColor:"#356680",
    },
    root1: {
      flexGrow: 1,
      width: '100%'
    },
  grid:{
      width:"100%",
      margin:"0px",
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
export default function EditBtn() {
  const [open, setOpen] = React.useState(false);
  //redux implementation
  const Check =useSelector((state) => state.ch);
  const dispatch = useDispatch();
  const classes= useStyles();
  let [total_open_amount, editAmount] = React.useState(0);
  let [notes, editNotes] = React.useState("");
  //handling notes change
  const handleNotesChange =(event) =>{
    editNotes(event.target.value);
  }
  //handling total amount change.
  const handleAmountChange =(event) =>{
    editAmount(event.target.value);
    //console.log(total_open_amount)
  }
  //handling onClick of Save button.
   const handleSave=(event)=>{
    console.log(total_open_amount);
    if(Check.check_data.length==0){
      alert("None selected");
    }
    if(Check.check_data.length==1){
      axios
      .get(`http://localhost:8080/Summer_Internship_Backend/edit?notes=${notes}&total_open_amount=${total_open_amount}&doc_id=${Check.check_data[0]}`)
    }
    else{
      alert("More than one selected");
    }
    setOpen(false);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button className={classes.view} variant="outlined" startIcon={<EditIcon  />} onClick={handleClickOpen}> Edit</Button>
      <Dialog width="50%" onClose={handleClose} aria-labelledby="form-dialog-title" open={open}>
        <DialogTitle className={classes.divs} id="form-dialog-title" onClose={handleClose}>
        Edit Invoice
        </DialogTitle>
        <DialogContent className={classes.divs} dividers>
          <form className={classes.root} noValidate autoComplete="off">
          <Grid container
              alignItems="center"
              alignContent="center"
              justify="center"
              direction="row">
            <Grid item xs={6}  justify="center" direction="row">
            <label className={classes.label1}>Invoice amount<font color="red">*</font></label>
              </Grid>
              <Grid item xs={6}  justify="center" direction="row">
                  <TextField className={classes.text1}  id="total_open_amount" variant="outlined"  name="custName" onChange={handleAmountChange} display="inline-block"  required type="no" />
              </Grid>
              <Grid item xs={6}  justify="center" direction="row">
             <label className={classes.label1}  >Notes</label>
             </Grid>
             <Grid item xs={6}  justify="center" direction="row">
                  <TextField className={classes.text1} multiline rows={4} id="notes" variant="outlined" marginLeft="70px" name="custName" onChange={handleNotesChange}  display="inline-block" />
              </Grid>
          </Grid>
        </form>       
        </DialogContent>
        <DialogActions className={classes.divs}>
        <Button style={{color:"#14AFF1"}}  className={classes.can} id="edtcancel" onClick={handleClose}>
                  Cancel
                </Button>
                <Button className={classes.clear} id="edtreset" onClick={handleClose}>
                  Reset
                </Button>
                <Button className={classes.add} id="edtsave" onClick={handleSave}>
                  Save
                </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
