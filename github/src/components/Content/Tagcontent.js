import React from 'react';

class Tagcontent extends React.Component{
    state ={
        select: this.props.pre_selected
    }

    render(){
        var checkdata='';
        if(this.props.pre_selected == null || this.props.pre_selected == undefined){
            //console.log("prop undefined or null");
            
        }else{
            //console.log(this.props.pre_selected);
            checkdata = this.props.pre_selected;
            this.state.select = checkdata;
        }
        return(
            <div>
                <div class="tab-content">
                    {/* <div id="home" class="tab-pane fade in active">
                        <h3>HOME</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div> */}
                    <div id="menu1" class="tab-pane fade">
                    {
                        //console.log(this.props.selected)
                    }
                    {
                        
                            this.props.selectedcategory.map((items) => {
                                return(
                                    <div className="radio" key={items}>
                                    <label><input type="radio" name={this.props.selected} checked={this.state.select === items} onClick={this.props.changepredata.bind(this, items,this.props.selected)} value={items} onChange={this.selectCategory.bind(this,this.props.selected,items)}/>{items}</label>
                                  </div>
                                )
                            })
                        }
                        <button className="btn btn-primary"><span>Confirm:</span>   {this.state.select}</button>
                    </div>
                    {/* <div id="menu2" class="tab-pane fade">
                        <h3>Menu 2</h3>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                    </div>
                    <div id="menu3" class="tab-pane fade">
                        <h3>Menu 3</h3>
                        <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    </div> */}
                </div>
            </div>
        )
    }
    selectCategory(item,sub_category){
        this.setState({
            select: sub_category
        })
    }
    selectchange(e){
        console.log(e.target.value);
        this.state.select = e.target.value;
        this.props.changepredata.bind(this,"tee");
        
        // this.setState({
        //     select : e.target.value
        // })
        console.log(this.state.select);
        
    }
}

export default Tagcontent;