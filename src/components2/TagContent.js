import React from 'react';
import $ from 'jquery';
import './style.css';

const Pre_load = (dressType) => {
    var _arr = [];
    var _tempBottom = [];
    fetch("../_temp.json")
    .then(res => res.json())
    .then(result => _arr.push(result[0]))
    setTimeout(() => {
        _arr.map((pos) => {
            Object.keys(pos).map((items) => {
                if(items === dressType){
                    _tempBottom.push(pos[items])
                }
            })
        })
    },100)
    //console.log(_tempBottom);
}



class TagContent extends React.Component{

    

    state ={
        sel_category:'',
        sel_type:'',
        curr_check : '',
        pre_CheckedList:[],
        selectedList :[]

    }

    constructor(props){
        super(props);
        Pre_load("Top");
    }

    componentDidMount(){
        this.setState({
            curr_check : this.props.pre_selected
        })
        console.log(this.props.selectedtab);
        console.log($(".nav-tabs li:first-child").addClass("active"));
        
        //$(".nav-tabs").next("li").attr("class","active");
    }

    componentWillReceiveProps(){

        setTimeout(()=>{
            this.setState({
                sel_category : this.props.selectedcategory, 
                sel_type : this.props.selectedtype, 
            })
            this.getCheckedStatus(this.state.sel_category, this.state.sel_type);
        
        },10)
        
        console.log("recive props");
        
        // setTimeout(function(){
        //     console.log("recive props");
        // },1000)
        //  console.log(this.props.selectedcategory);
         
        // recive props

        //check is already selected
        // if => true
        //set current_sel = item
        //else =>
        //set pre_prop as item






    //     this.state.selectedList.push({ category: "Top" ,type: "style" ,selected: "Tee" ,"checked" : false });
        
         //setTimeout(1000);
    //     //search 
        
         
        // if(a){
        //     console.log("true");
            
        //     this.setState({
        //         curr_check : this.getCheckedItem()
        //     })
            
            
        // }else{
        //     console.log("false");
        
            
            setTimeout(() => {
                this.setState({
                    curr_check : this.props.pre_selected
                })
            },10)
            
        // }
        // console.log(this.state.curr_check);
    }

    getCheckedItem(){
        var status= '';
        this.state.selectedList.map((item) => {
            Object.keys(item).map((i) => {
                if(i === "selected"){
                   // console.log(item[i]);
                    
                    status = item[i];
                }
            })
        })
        
        return status;
    }

    getCheckedStatus(type,category){
        //console.log(category + "---"+type);
        
        var status= false;
        var selected = ''
        // this.state.selectedList.map((item) => {
        //     Object.keys(item).map((i) => {
        //         if(i === "checked"){
        //            // console.log(item[i]);
                    
        //             status = item[i];
        //         }
        //     })
        // })
        
            for(var i = 0;i<this.state.selectedList.length;i++){
                if (this.state.selectedList[i].category == category && this.state.selectedList[i].type == type){
                    status = this.state.selectedList[i].checked;
                    selected = this.state.selectedList[i].selected;
                    //console.log(this.state.selectedList[i].checked);
                }
            }
            if(status){
                //do add
                //console.log(selected);
                setTimeout(() => {
                    this.setState({
                        curr_check : selected
                    })
                },10)
            }else{
                // add props
                setTimeout(() => {
                    this.setState({
                        curr_check : this.props.pre_selected
                    })
                },10)
            }
    }

    onRadioClick(radSelect,cate,dr_type){
        console.log(radSelect+"**"+cate+"**"+dr_type);
        if(dr_type === "Bottom"){
            if(cate === 'type'){
                console.log(radSelect);
                this.props.bottomtype_sel(radSelect)
            }
        }


        this.setState({
            curr_check : radSelect
        })
        //this.state.selectedList = [];
        if(this.state.selectedList.length == 0){
            console.log("null");
            this.state.selectedList.push({ category: dr_type ,type: cate ,selected: radSelect ,"checked" : true });
        }else{
            //check for update
            var isExist = this.checkExist(dr_type, cate);
            if(isExist === -1){
                //insert new entry
                this.state.selectedList.push({ category: dr_type ,type: cate ,selected: radSelect ,"checked" : true });
            }else{
                //update
                this.updateItem(isExist, { selected : radSelect })
            }
        }
    }

    checkExist(category, t_type){
        var exist = -1;
        for(var i = 0;i<this.state.selectedList.length;i++){
            if (this.state.selectedList[i].category == category && this.state.selectedList[i].type == t_type){
                exist = i;
            }
        }
        return exist;
    }

    updateItem(id, itemAttributes) {
        
        // remove items from selected if change in bottom type


        var index = id
        if (index === -1){
            console.log("went wrong!!");
            // handle error
        }
         
        else{
          this.setState({
            selectedList: [
               ...this.state.selectedList.slice(0,index),
               Object.assign({}, this.state.selectedList[index], itemAttributes),
               ...this.state.selectedList.slice(index+1)
            ]
          });
        }
    }
    
    showRadioContent(){
        return(
            this.props.currentselect.map((selectItem,index) => {
                return(
                    <React.Fragment key={index}>
                        <label>
                            <input 
                                type="radio"
                                value={selectItem}
                                name="blouse"
                                checked={this.state.curr_check === selectItem ? true : false}
                                onChange={this.onRadioClick.bind(this,selectItem,this.props.selectedcategory,this.props.selectedtype)}
                                />
                                {selectItem}
                        </label>
                        <br/>
                    </React.Fragment>
                )
            })
        )
    }



    showContent(){
        switch(this.props.selectedtab){
            case 'Validity' :
                return (<React.Fragment><h1>Validity</h1>
                    <img src={this.props.imguritop}/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <img src={this.props.imguribottom}/><br/>
                    <button className="btn btn-danger-outline">Inappropriate</button>&nbsp;
                    <button className="btn btn-danger-outline">Swimwear</button>&nbsp;
                    <button className="btn btn-danger-outline">Sleepwear</button>&nbsp;
                    <button className="btn btn-danger-outline">Propduct</button>&nbsp;
                    <button className="btn btn-danger-outline">Logo</button>&nbsp;
                    <button className="btn btn-danger-outline">Notwomen</button>
                    <button className="btn btn-success btn-block" onClick={this.nextTab.bind(this)}>Valid</button>
                    </React.Fragment>)
                
                break;
            case 'Color':
                return(<React.Fragment><h1>Color</h1>
                    <button className="btn btn-success btn-block" onClick={this.nextTab.bind(this)}>Confirm</button></React.Fragment>)
                break;
            case 'Review':
                return(<h2>Review</h2>)
                break;
            default:
                return(
                    <React.Fragment>
                        <h2>{this.props.selectedtype +" "+this.props.selectedcategory }</h2>
                        {
                            this.showRadioContent()
                        }
                        <button className="btn btn-primary" disabled={this.state.curr_check === '' ? true : false} onClick={this.nextTab.bind(this)}>Confirm: { this.state.curr_check }</button>
                    </React.Fragment>
                )
        }
    }

    render(){

        return(
            <div>
                {/* if validity */}
                {/* {
                    this.props.selectedtab === "Validity" ? this.showValidity() : this.showRadioContent()
                } */}
                {
                    this.showContent()
                }
                {/* color */}
                {/* top - bottom */}
                {/* review */}
                {/* <h2>{this.props.selectedtype +" "+this.props.selectedcategory }</h2> */}
                
                {/* {
                    this.props.currentselect.map((selectItem,index) => {
                        return(
                            <React.Fragment key={index}>
                                <label>
                                    <input 
                                        type="radio"
                                        value={selectItem}
                                        name="blouse"
                                        checked={this.state.curr_check === selectItem ? true : false}
                                        onChange={this.onRadioClick.bind(this,selectItem,this.props.selectedcategory,this.props.selectedtype)}
                                        />
                                        {selectItem}
                                </label>
                                <br/>
                            </React.Fragment>
                        )
                    })
                } */}
                {/* <button className="btn btn-primary" disabled={this.state.curr_check === '' ? true : false} onClick={this.nextTab.bind(this)}>Confirm: { this.state.curr_check }</button> */}
            </div>
        )
    }
    nextTab(){
        console.log(this.state.sel_type);
        
        this.onRadioClick(this.state.curr_check, this.state.sel_category, this.state.sel_type);
        $(".nav-tabs > .active").next("li").find("a")[0].click();
        //console.log( $(".nav-tabs > .active").next("li"));
    }
}

export default TagContent;