import React from 'react';
import TagTop from './TagTop';
import TagContent from './TagContent';
import Loadimg from './Loadimg';
import '../App.css';
import Tabtitle from './Tabtitle';

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
    return _tempBottom;
}

class Tag extends React.Component{
    state={
        tagdata : [],
        selectedCatogory:'',
        selectedType:'',
        currentSelected_arr : [],
        pre_Selected : 'tank',
        Top_pre : [],
        Bottom_pre: [],
        bottom_selected:'',
        selectedTab:'Validity'
    }

    componentDidMount(){
        fetch("../tags.json")
        .then(res => res.json())
        .then(data => this.setState({
            tagdata:data
        }))
        var top = [];
        var bottom = [];
        // setTimeout(() => {
        //    v = Pre_load("Top")
        // },100)
        top = Pre_load("Top");
        bottom = Pre_load("Bottom");
        console.log(top);
        
        this.setState({
            Top_pre : top,
            Bottom_pre:bottom
        })
        setTimeout(() => {
            //console.log(this.state.Bottom_pre);
            this.getBottomTypeFromPreLoad();
        }, 100);

    }
    

    //get all title from list
    loadTitles(tagType){
        var title = [];
        Object.keys(this.state.tagdata).map((type) => {
            if(tagType === type){
                Object.keys(this.state.tagdata[type]).map((category) => {
                    title.push(type +"#"+category)
                })
            }
        })
        return title;
    }

    loadCropImage(tagtype){
        if(tagtype === "top")
            var arr = this.state.Top_pre;
        else
            var arr = this.state.Bottom_pre;

        var imguri;
            arr.map(item => {
                Object.keys(item).map(list => {
                    if(list === "dataURI"){
                        imguri = item[list];
                    }
                })
        })
        return imguri;
    }

    searchPreChecked(item, category){
        var checked = '';
        console.log(item + "---" + category);
        if(item === "Top"){
            var arr = this.state.Top_pre;
            arr.map(item => {
                Object.keys(item).map(list => {
                    if(list === category){
                        //console.log(item[list]);
                        checked =  item[list];
                    }
                })
            })
        }
        if(item === "Bottom"){
            var arr = this.state.Bottom_pre;
            arr.map(item => {
                Object.keys(item).map(list => {
                    if(list === category){
                        console.log(item[list]);
                        checked =  item[list];
                    }
                })
            })
        }
        if(item === "Pants" || item === "Shorts" || item === "Skirt"){
            var arr = this.state.Bottom_pre;
            arr.map(item => {
                Object.keys(item).map(list => {
                    if(list === category){
                        console.log(item[list]);
                        checked =  item[list];
                    }
                })
            })
        }
        this.setState({
            pre_Selected : checked
        })
        return checked;
    }

    
    getBottomTypeFromPreLoad(){
        var arr = this.state.Bottom_pre;
            arr.map(item => {
                Object.keys(item).map(list => {
                    if(list == "type"){
                        this.setState({
                            bottom_selected : item[list]
                        })
                    }
                })
            })
        
    }
    getBottomType(bottom_type){
        var title = [];
        console.log(this.state.tagdata);
        
        Object.keys(this.state.tagdata).map((type) => {
            Object.keys(this.state.tagdata[type]).map((category) => {
                if(type === bottom_type){
                    console.log(this.state.tagdata[type]);
                }
            })
        })
    }
    showTagPage(){
        var t_crop = this.loadCropImage("top");
        var b_crop = this.loadCropImage("bottom");
        return(
            <div className="row">
                    <div className="col-lg-6">
                        <div className="col-lg-4">
                            <Loadimg />
                        </div>
                        <div className="col-lg-8">
                            <TagContent imguritop={t_crop} imguribottom={b_crop} selectedtab={this.state.selectedTab} bottomtype_sel={this.onBottomTypeSelect.bind(this)} currentselect={this.state.currentSelected_arr} pre_selected={this.state.pre_Selected} selectedcategory={this.state.selectedCatogory} selectedtype={this.state.selectedType}/>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        {/* <iframe src={this.state.selectedCatogory +".html"} className="iframe_"></iframe> */}
                        {/* <img src={"images/"+this.state.selectedCatogory + ".png"} /> */}
                    </div>
                </div>
        )
    }
    showReview(){
        var t_crop = this.loadCropImage("top");
        var b_crop = this.loadCropImage("bottom");

        console.log(t_crop);
        return(
            <div className="row">
                    <div className="col-lg-6">
                            <Loadimg />
                    </div>
                    <div className="col-lg-6">
                        {/* <iframe src={this.state.selectedCatogory +".html"} className="iframe_"></iframe> */}
                        <img src={t_crop} alt="top" />
                        <img src={b_crop} alt="bottom" />
                        <h1>Review</h1>
                    </div>
                </div>
        )
    }

    render(){
        //console.log(this.state.Top_pre);
        //var check = this.searchPreChecked(this.state.selectedType,this.state.selectedCatogory);
        //console.log(check);


        //this.getBottomType("Pants");

        
        
        var topTitles = this.loadTitles("Top");
        var bottomTitles = this.loadTitles("Bottom");
        var bottomTypeTitle = this.loadTitles(this.state.bottom_selected)
        //console.log(bottomTypeTitle);
        
        return(
            <div>
                 <ul class="nav nav-tabs">
                    <Tabtitle tab={"Validity"} clickevent={this.onTitleClick.bind(this)}/>
                    <Tabtitle tab={"Color"} clickevent={this.onTitleClick.bind(this)}/>
                    <TagTop titles={topTitles} clickevent={this.onTitleClick.bind(this)}/>
                    <TagTop titles={bottomTitles} clickevent={this.onTitleClick.bind(this)}/>
                    <TagTop titles={bottomTypeTitle} clickevent={this.onTitleClick.bind(this)}/>
                    <Tabtitle tab={"Review"} clickevent={this.onTitleClick.bind(this)}/>
                </ul>

                {
                    this.state.selectedTab === 'Review' ? this.showReview() : this.showTagPage()
                }
                
                
            </div>
        )
    }

    onBottomTypeSelect(a){
        this.setState({
            bottom_selected : a
        })
        
    }
    
    onTitleClick(item,category){
        console.log(item +"--" + category);
        this.setState({selectedTab : item})
        var check = this.searchPreChecked(item,category);
        //console.log(check);
        Object.keys(this.state.tagdata).map((type) => {
            if(type === item){
                Object.keys(this.state.tagdata[type]).map((_category) => {
                    if(_category === category){
                       this.setState({
                           currentSelected_arr : this.state.tagdata[type][_category],
                           selectedCatogory : category,
                           selectedType : item,
                           pre_Selected : check
                       })
                    }
                })
            }
            
        })
    }
}

export default Tag;