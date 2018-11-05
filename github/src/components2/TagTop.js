import React from 'react';

class TagTop extends React.Component{

    render(){
        return(
            <React.Fragment>
                
                    {
                        this.props.titles.map((title) =>{
                            var dr_item='';
                            var dr_category='';
                            var str_array = title.split('#');
                            dr_item = str_array[0];
                            dr_category = str_array[1];
                            return (<li key={title}><a data-toggle="tab" href="#menu1" onClick={this.props.clickevent.bind(this,dr_item,dr_category,this.props.d_type)}>{dr_item+" "+dr_category}</a></li>)
                        })
                    }
            </React.Fragment>
        )
    }
}

export default TagTop;