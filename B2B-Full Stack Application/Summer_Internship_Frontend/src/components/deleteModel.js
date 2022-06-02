// for Delete pop-up.
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
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    divs:{
        backgroundColor:"#39495E",
        color:"#FFFFFF",
        fontFamily:"Ubuntu"
    },

    view:{
        
        marginLeft:"30px",
        width: "105px",
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

export default function DltBtn() {
  const [open, setOpen] = React.useState(false);

    const classes= useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Check = useSelector((state) => state.ch);
  const dispatch = useDispatch();
  var sendDocId = [];
  const handleFinalDelete = () =>{
    console.log("Check_Data");
    console.log(Check.check_data);
    let count= 0;
    Check.check_data.forEach((item) => {
      axios
      .get(`http://localhost:8080/Summer_Internship_Backend/delete?doc_id=${item}`)
      .then((response) => {
        count = count +1;
        if(count === Check.check_data.length){
          window.location.reload();
        }
        
      })
    }
    );
      
      setOpen(false);
  }

  return (
    <div>
      <Button className={classes.view} variant="outlined" onClick={handleClickOpen}>- Delete</Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle className={classes.divs} id="customized-dialog-title" onClose={handleClose}>
         Delete record(s)
        </DialogTitle>
        <DialogContent className={classes.divs} dividers>
          <Typography gutterBottom>
                You'll lose your record(s) after this action. We can't recover them once you delete
                  </Typography>
          <Typography gutterBottom>
          Are you sure you want to <font color="red"> permenantly delete </font> them?
                     </Typography>
          
        </DialogContent>
        <DialogActions className={classes.divs}>
        <Button className={classes.can} onClick={handleClose} color="primary">
                 Cancel
                </Button>
                <Button className={classes.can} onClick={handleFinalDelete} color="primary">
                 Delete
                </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}