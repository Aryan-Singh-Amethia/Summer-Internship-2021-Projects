// for displaying all buttons

import Button from '@material-ui/core/Button';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import AppBar from '@material-ui/core/AppBar';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import DeleteDialog from './deleteModel';
import React, { Component,useState } from 'react'
import EditFormDialog from './editModel'
import EditBtn from './editData'
import AddFormDialog from './addModel'
import Grid from '@material-ui/core/Grid';
import './gridButton.css'
import View from './addModel'
import ViewBtn from './viewModel'
import DltBtn from './deleteModel'

const useStyle = makeStyles((theme) => ({
    button:{
        margin:theme.spacing.unit,
        color:"#97A1A9",
        borderBlockColor:"#97A1A9",
        borderColor:"#97A1A9"
    },
    predict:{
        color:"#FFFFFF",
        borderColor:"#97A1A9"
    },
    search: {
        position: 'relative',
        display:'inline-block',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '250px',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          //width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0.75, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'inline',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        //width: '100%',
        [theme.breakpoints.up('sm')]: {
          width:'12ch',
          '&:focus':{
          width: '20ch',
          },
        },
      },
        }));
export default function ButtonFunc(){
    const classes=useStyle();
    const [showModal, setShowModal] = useState(false);
    return(
        <div className='ButtonHeader'>
            <div className='Leftb1'>
                <Button variant="contained" color="#97A1A9" className={classes.button}>Predict</Button>
                <ViewBtn/ >
            </div>
            <div className='Rightb2'>
                
                <View showModal = {showModal} setShowModal = {setShowModal} className="ModalButtons" ></View >
                
                <EditBtn showModal = {showModal} setShowModal = {setShowModal} className="ModalButtons" ></EditBtn>

                <DltBtn/>
               
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search by invoice number"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          </div>   
        </div>
    );
}

