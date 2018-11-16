import React from 'react';
import $ from 'jquery';
import './style.css';
import Review from './Review';
import Color from './Color';

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
        selectedList :[],
        topSelect:[],
        bottomSelect:[],
        dress_type:''
    }

    constructor(props){
        super(props);
        Pre_load("Top");
    }

    componentDidMount(){
        this.setState({
            curr_check : this.props.pre_selected
        })
        //console.log(this.props.selectedtab);
        //console.log($(".nav-tabs li:first-child").addClass("active"));
        
        $(".nav-tabs li:first-child").addClass("active");
        $(".nav-tabs li:first-child").find("a").removeClass("inactive-tab");
    }

    componentWillReceiveProps(){

        setTimeout(()=>{
            this.setState({
                sel_category : this.props.selectedcategory, 
                sel_type : this.props.selectedtype, 
                dress_type : this.props.dresstype
            })
            this.getCheckedStatus(this.state.sel_category, this.state.sel_type);
        
        },10)
        
        //console.log("recive props");
        
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
        var selected = '';
        if(this.state.dress_type === "Top"){
            for(var i = 0;i<this.state.topSelect.length;i++){
                if (this.state.topSelect[i].category == category && this.state.topSelect[i].type == type){
                    status = this.state.topSelect[i].checked;
                    selected = this.state.topSelect[i].selected;
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
        }else if(this.state.dress_type === "Bottom"){
            for(var i = 0;i<this.state.bottomSelect.length;i++){
                if (this.state.bottomSelect[i].category == category && this.state.bottomSelect[i].type == type){
                    status = this.state.bottomSelect[i].checked;
                    selected = this.state.bottomSelect[i].selected;
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
    }

    onRadioClick(radSelect,cate,dr_type){
        /*
        1. Use separate state for top and bottom
        2.
        */
        console.log(radSelect+"**"+cate+"**"+dr_type);
        if(dr_type === "Bottom"){
            if(cate === 'type'){
                console.log(radSelect);
                this.props.bottomtype_sel(radSelect);

                //remove all bottom types from array list

                //get all type through loop

                //user splice to remove item
            }
        }
        this.setState({
            curr_check : radSelect
        })

        if(this.state.dress_type === "Top"){
            console.log("Top category");
            if(this.state.topSelect.length == 0){
                //console.log("null");
                this.state.topSelect.push({ category: dr_type ,type: cate ,selected: radSelect ,"checked" : true });
            }else{
                //check for update
                var isExist = this.checkExist(dr_type, cate);
                if(isExist === -1){
                    //insert new entry
                    this.state.topSelect.push({ category: dr_type ,type: cate ,selected: radSelect ,"checked" : true });
                }else{
                    //update
                    this.updateItem(isExist, { selected : radSelect })
                }
            }
            
       }else if(this.state.dress_type === "Bottom"){
        console.log(radSelect+"**"+cate+"**"+dr_type);
            var _array = []; 
            if(cate === "type"){
                console.log("refresh array");
                this.state.bottomSelect = [];

                //this.state.selectedList = [];
                if(this.state.bottomSelect.length == 0){
                    //console.log("null");
                    this.state.bottomSelect.push({ category: dr_type ,type: cate ,selected: radSelect ,"checked" : true });
                }else{
                    //check for update
                    var isExist = this.checkExist(dr_type, cate);
                    if(isExist === -1){
                        //insert new entry
                        this.state.bottomSelect.push({ category: dr_type ,type: cate ,selected: radSelect ,"checked" : true });
                    }else{
                        //update
                        this.updateItem(isExist, { selected : radSelect })
                    }
                }
            }
            //this.state.selectedList = [];
            if(this.state.bottomSelect.length == 0){
                //console.log("null");
                this.state.bottomSelect.push({ category: dr_type ,type: cate ,selected: radSelect ,"checked" : true });
            }else{
                //check for update
                var isExist = this.checkExist(dr_type, cate);
                if(isExist === -1){
                    //insert new entry
                    this.state.bottomSelect.push({ category: dr_type ,type: cate ,selected: radSelect ,"checked" : true });
                }else{
                    //update
                    this.updateItem(isExist, { selected : radSelect })
                }
            }
        }
    }

    checkExist(category, t_type){
        if(this.state.dress_type === "Top"){
            var exist = -1;
            for(var i = 0;i<this.state.topSelect.length;i++){
                if (this.state.topSelect[i].category == category && this.state.topSelect[i].type == t_type){
                    exist = i;
                }
            }
            return exist;
        }else if(this.state.dress_type === "Bottom"){
            var exist = -1;
            for(var i = 0;i<this.state.bottomSelect.length;i++){
                if (this.state.bottomSelect[i].category == category && this.state.bottomSelect[i].type == t_type){
                    exist = i;
                }
            }
            return exist;
        }
    }

    updateItem(id, itemAttributes) {
        
        // remove items from selected if change in bottom type
        if(this.state.dress_type === "Top"){
            var index = id
        if (index === -1){
            console.log("went wrong!!");
            // handle error
        }
         
        else{
          this.setState({
            topSelect: [
               ...this.state.topSelect.slice(0,index),
               Object.assign({}, this.state.topSelect[index], itemAttributes),
               ...this.state.topSelect.slice(index+1)
            ]
          });
        }
        }else if(this.state.dress_type === "Bottom"){
            var index = id
            if (index === -1){
                console.log("went wrong!!");
                // handle error
            }
             
            else{
              this.setState({
                bottomSelect: [
                   ...this.state.bottomSelect.slice(0,index),
                   Object.assign({}, this.state.bottomSelect[index], itemAttributes),
                   ...this.state.bottomSelect.slice(index+1)
                ]
              });
            } 
        }


        // var index = id
        // if (index === -1){
        //     console.log("went wrong!!");
        //     // handle error
        // }
         
        // else{
        //   this.setState({
        //     selectedList: [
        //        ...this.state.selectedList.slice(0,index),
        //        Object.assign({}, this.state.selectedList[index], itemAttributes),
        //        ...this.state.selectedList.slice(index+1)
        //     ]
        //   });
        // }
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

    getLABColors(type){
        var c ;
        if(type === "top"){
            Object.keys(this.props.topdata).map(i => {
                 Object.keys(this.props.topdata[i]).map(items=> {
                   if(items === "colors"){
                        c = this.props.topdata[i][items];
                   }
                 })
            })
        }else if(type === "bottom"){
            Object.keys(this.props.bottomdata).map(i => {
                Object.keys(this.props.bottomdata[i]).map(items=> {
                  if(items === "colors"){
                       c = this.props.bottomdata[i][items];
                  }
                })
           })
        }
        return c;
    }



    showContent(){
        var topColor = this.getLABColors("top");
        var bottomColor = this.getLABColors("bottom");
        switch(this.props.selectedtab){
            case 'Validity' :
                return (
                <React.Fragment><h1>Validity</h1>
                    <img src={this.props.imguritop}/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <img src={this.props.imguribottom}/><br/>
                    <button className="btn btn-danger-outline" onClick={this.validityConfirm.bind()}>Inappropriate</button>&nbsp;
                    <button className="btn btn-danger-outline" onClick={this.validityConfirm.bind()}>Swimwear</button>&nbsp;
                    <button className="btn btn-danger-outline" onClick={this.validityConfirm.bind()}>Sleepwear</button>&nbsp;
                    <button className="btn btn-danger-outline" onClick={this.validityConfirm.bind()}>Propduct</button>&nbsp;
                    <button className="btn btn-danger-outline" onClick={this.validityConfirm.bind()}>Logo</button>&nbsp;
                    <button className="btn btn-danger-outline" onClick={this.validityConfirm.bind()}>Notwomen</button>
                    <button className="btn btn-success btn-block" onClick={this.nextTab.bind(this)}>Valid</button>
                    </React.Fragment>)
                
                break;
            case 'Color':
                return(<React.Fragment><Color imgtop={this.props.imguritop} topcolor={topColor} bottomcolor={bottomColor
                } imgbottom={this.props.imguribottom} next={this.nextTab.bind(this)}/></React.Fragment>)
                break;
            case 'Review':
                return(<div>
                    {
                        <Review toptagged={this.state.topSelect} submitd={this.props.submi} bottomtagged={this.state.bottomSelect}/>
                        
                    }
                </div>)
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

    validityConfirm(e){
        var type = e.target.innerHTML;
        var validate = window.confirm("Are you sure you want to flag this image as : "+ type.toLowerCase() );
        if(validate){
            //confirm
        }else{
            
        }
        e.preventDefault();
    }

    render(){

        console.log(this.state.selectedList)
        
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

        // if(this.props.dresstype === "Bottom" && this.state.sel_category === "type"){
        //     this.deleteBottomItem();
        // }

        //remove inactive class 
        $(".nav-tabs > .active").next("li").find("a").removeClass("inactive-tab");

        //make click event in tab
        $(".nav-tabs > .active").next("li").find("a")[0].click();
        //console.log( $(".nav-tabs > .active").next("li"));
    }
}

export default TagContent;