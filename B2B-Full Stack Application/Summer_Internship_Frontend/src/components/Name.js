import React, { Component } from 'react';

class Name extends React.Component
{
    render()
    {
        return(
            <div>
                <h1>Helloo My name is {this.props.myProps}</h1>
            </div>
        );
    }
}
export default Name;