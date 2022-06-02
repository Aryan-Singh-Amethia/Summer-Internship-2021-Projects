
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
//import FormControl from '@material-ui/core/FormControl';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import {useDispatch,useSelector} from 'react-redux';
import { handleeopen, handleeclose } from "../actions/myActions";

const useStyle = makeStyles((theme) => ({
    button:{
        marginLeft:355,
    },
    button1:{
        margin:theme.spacing.unit,
        color:"#97A1A9",
        borderBlockColor:"#97A1A9",
        borderColor:"#97A1A9"
    },
    margin: {
      margin: theme.spacing(1),
      color:"#97A1A9",
      //display:'inline-block',
    },
    TextField:{
      //width: "100px",
      //height: "25px",
      margin: theme.spacing(1),
      border: "1px solid #356680",
      borderRadius: "10px",
      opacity: "1",
      backgroundColor:"#283A46",
      borderColor:"#356680",
    },
    bgcolour:{
      backgroundColor:"#2A3E4C",
    },
  blue:{
    margin: theme.spacing(1),
    color:"#FFFFFF",
    backgroundColor:"#14AFF1",
},
colour:{
  borderColor:"#14AFF1"
},
root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const EditFormDialog = () => {
   
    const classes=useStyle();
    const styles = {
      labelAsterisk: {
        color: "red"
      }
    };
    const StyledApp = withStyles(styles);
    const open = useSelector((state) => state.opene);
	  const dispatch = useDispatch();
	  const handleClickOpen = () => dispatch(handleeopen());
	  const handleClose = () => dispatch(handleeclose());
    const DialogContent = withStyles(theme => ({
        root: {
          backgroundColor:"#2A3E4C",
          borderTop: `1px solid ${theme.palette.divider}`,
          padding: theme.spacing.unit,
        },
      }))(MuiDialogContent);
    const DialogActions = withStyles(theme => ({
        root: {
          backgroundColor:"#2A3E4C",
          borderTop: `1px solid ${theme.palette.divider}`,
          padding: theme.spacing.unit,
        },
      }))(MuiDialogActions);
    return (
        <div className={classes.root}>
          <Button variant="outlined" color="#97A1A9" className={classes.button1} startIcon={<EditIcon  />} onClick={handleClickOpen}>
            Edit
          </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title" style={{backgroundColor:"#2A3E4C"}}><font color='white'>Edit Invoice</font>
                <Button aria-label="close" onClick={handleClose} endIcon={<CloseIcon />} className={classes.button}> </Button>
                </DialogTitle>
            <DialogContent>
            <form>
            <Grid container
              alignItems="center"
              alignContent="center"
              justify="center"
              direction="row">
            <Grid item xs={6}  justify="center" direction="row">
              <InputLabel className={classes.margin}display="inline-block">Invoice amount<font color="red">*</font></InputLabel>
              </Grid>
              <Grid item xs={6}  justify="center" direction="row">
              <TextField  className={classes.TextField} required type="no"  variant="outlined" display="inline-block" />
              </Grid>
              <Grid item xs={6}  justify="center" direction="row">
             <InputLabel className={classes.margin}  >Notes</InputLabel>
             </Grid>
             <Grid item xs={6}  justify="center" direction="row">
            <TextField id="notes" className={classes.TextField} multiline rows={4} variant="outlined"/>
            </Grid>
            </Grid>
            </form>
            </DialogContent>
            <DialogActions>
              <div className="ButtonHeader">
              <div className="left">
              <Button onClick={handleClose} style={{color:"#14AFF1"}}>
                Cancel
              </Button>
              </div>
              <div className="right">
              <Button variant="outlined" color="#2C404E" className={classes.colour}  color="#FFFFFF" style={{color:"#FFFFFF",
          borderBlockColor:"#14AFF1",
          borderColor:"#14AFF1"}} onClick={handleClose} color="primary">
                Reset
              </Button>
              <Button variant="contained" className={classes.blue}>
               Save
              </Button>
              </div>
              </div>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
export default EditFormDialog;