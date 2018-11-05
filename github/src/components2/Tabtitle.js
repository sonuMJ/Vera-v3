import React from 'react';

class Tabtitle extends React.Component{
    render(){
        return(
            <React.Fragment>
                <li><a data-toggle="tab" href="#menu1" onClick={this.props.clickevent.bind(this, this.props.tab, "")}>{ this.props.tab }</a></li>
            </React.Fragment>
        )
    }
}

export default Tabtitle