import React from 'react';

class Tagtitle extends React.Component{
    render(){
        
        return(
            <div>
                <ul class="nav nav-tabs">
                    {/* <li class="active"><a data-toggle="tab" href="#home">Home</a></li>
                    <li><a data-toggle="tab" href="#menu1">Menu 1</a></li>
                    <li><a data-toggle="tab" href="#menu2">Menu 2</a></li>
                    <li><a data-toggle="tab" href="#menu3">Menu 3</a></li> */}
                    {
                        this.props.titlelist.map((title) =>{
                            var dr_item='';
                            var dr_category='';
                            var str_array = title.split('#');
                            dr_item = str_array[0];
                            dr_category = str_array[1];
                            return (<li key={title}><a data-toggle="tab" href="#menu1" onClick={this.props.clickevent.bind(this,dr_item,dr_category)}>{dr_item+" "+dr_category}</a></li>)
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Tagtitle;