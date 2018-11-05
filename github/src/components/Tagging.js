import React from 'react';
import Tagtitle from './Title/Tagtitle';
import Tagcontent from './Content/Tagcontent';

class Tagging extends React.Component{

    state ={
        tagdata:[],
        selected:'',
        selectedCategory:[],
        pre_select:'',
        pre_data:[
            {
                "item":"tee",
                "cat":"style"
            },
            {
                "item":"sweetheart",
                "cat":"neck"
            }
        ]
    }

    componentDidMount(){
        fetch("../tags.json")
        .then(res => res.json())
        .then(data => this.setState({
            tagdata:data
        }))
    }

    render(){
        var titles = this.loadTitles();
        return(
            <div>
                <Tagtitle titlelist={titles} clickevent={this.selectContent.bind(this)}/>
                <Tagcontent selectedcategory ={ this.state.selectedCategory } changepredata={this.changePredata.bind(this)} pre_selected={this.state.pre_select} selected={this.state.selected}/>
                <button onClick={this.changePredata.bind(this,'tee')}>btn</button>
            </div>
        )
    }
    //get all title from list
    loadTitles(){
        var title = [];
        Object.keys(this.state.tagdata).map((type) => {
            Object.keys(this.state.tagdata[type]).map((category) => {
                title.push(type +"#"+category)
            })
        })
        return title;
    }
    changePredata(items,category){
        console.log("called" + items +"==" + category);
        
        // this.setState(prevState => ({
        //     arr : prevState.pre_data.map(
        //     obj => (obj.item === items ? Object.assign(obj, { item : "blouse" }) : obj)
        //   )
        // }));
        // console.log(this.state.pre_data);
        // var i = this.getChecked(category);
        // this.setState({
        //     pre_select:i
        // })
        
    }
    //get checked
    getChecked(dr_category){
        var arr = this.state.pre_data;
        for(var i=0;i<arr.length;i++){
            if(arr[i].cat === dr_category){
                //console.log(arr[i]);
                return arr[i].item
            }
        }
        return null;
    }
    //get content by item and category
    selectContent(dr_item, dr_category){
        
        // this.setState({
        //     selectedTitle : dr_item,
        //     selectedCategory: dr_category
        // });
        //console.log(dr_item + "====" + dr_category);
        //console.log(dr_category);
        //parse data by separate # tag
        Object.keys(this.state.tagdata).map((type) => {
            //console.log(type);
            if(type === dr_item){
                //console.log("found");
                var i = this.getChecked(dr_category)
                //console.log(i);
                
                Object.keys(this.state.tagdata[type]).map((category) => {
                    //console.log(this.state.tagdata[type][category]);
                    if(dr_category === category){
                       //console.log(this.state.tagdata[type][category]); 
                       this.setState({
                           selectedCategory : this.state.tagdata[type][category],
                           selected:dr_category,
                           pre_select:i
                       })
                    }
                })
            }
            
        })
    }
}

export default Tagging;