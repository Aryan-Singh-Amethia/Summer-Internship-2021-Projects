// Import base paper.


import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Autorenew } from '@material-ui/icons';
import ButtonFunc from './gridButton'
import ShowContent from './showContent'
import TableScroll from './panelTable'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    marginLeft:30,
    marginTop: 28,
    marginRight:20,
    width: 1610,
    height: 660,
    backgroundColor: '#273D49CC'
    
  },
}));
export default function CenteredGrid() {
    const classes = useStyles();
    return (
      <div className={classes.root}>
       <Grid container spacing={3}> 
          <Grid item xs={12}> 
         
            <Paper className={classes.paper}> 
            <ButtonFunc/>
            <TableScroll/>
            
            
             </Paper> 
           </Grid> 
         
          </Grid> 
   </div>
 );
}
