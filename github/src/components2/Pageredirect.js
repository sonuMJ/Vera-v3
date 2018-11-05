import React from 'react';

class Pageredirect extends React.Component{

    componentDidMount(){
        this.props.history.push("/");
    }

    render(){
        return(
            <React.Fragment></React.Fragment>
        )
    }
}

export default Pageredirect;