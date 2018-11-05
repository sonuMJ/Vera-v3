import React from 'react';
import TagTop from './TagTop';
import TagContent from './TagContent';
import Loadimg from './Loadimg';
import '../App.css';
import Tabtitle from './Tabtitle';
import Loader from './Loader';

const TOP = "Top";
const BOTTOM = "Bottom";
const OTHERS = "Others";




// const Pre_load = (dressType) => {
//     var _arr = [];
//     var _tempBottom = [];
//     fetch("../_temp.json")
//     .then(res => res.json())
//     .then(result => _arr.push(result[0]))
//     setTimeout(() => {
//         _arr.map((pos) => {
//             Object.keys(pos).map((items) => {
//                 if(items === dressType){
//                     _tempBottom.push(pos[items])
//                 }
//             })
//         })
//     },100)
//     //console.log(_tempBottom);
//     return _tempBottom;
// }

class Tag extends React.Component{
    state={
        _tempData:[],
        tagdata : [],
        selectedCatogory:'',
        selectedType:'',
        currentSelected_arr : [],
        pre_Selected : 'tank',
        Top_pre : [],
        Bottom_pre: [],
        bottom_selected:'',
        selectedTab:'Validity',
        dress_pos: OTHERS,
        isLoaded:false
    }

    componentDidMount(){
        //this.loadTagData();
        this.loadTags();
        var top = [];
        var bottom = [];
        // setTimeout(() => {
        //    v = Pre_load("Top")
        // },100)
        top = this.getDressData("Top");
        bottom = this.getDressData("Bottom");
        //console.log(top);
        
        this.setState({
            Top_pre : top,
            Bottom_pre:bottom
        })
        
        setTimeout(() => {
            this.loadTagData();
            //console.log(this.state._tempData)
            // this.setState({
            //     isLoaded : true
            // })
        }, 100);
        setTimeout(() => {
            //console.log(this.state.Bottom_pre);
            this.getBottomTypeFromPreLoad();
        }, 110);
    }


    loadTagData(){
        // fetch("../_temp.json")
        // .then(res => res.json())
        // .then(result => this.setState({
        //     _tempData : result[0]
        // }))
        this.setState({
            _tempData : this.props.dressdata
        })
        this.setState({
            isLoaded : true
        })
    }

    loadTags(){
        fetch("../tags.json")
        .then(res => res.json())
        .then(data => this.setState({
            tagdata:data
        }))
    }
    
    getDressData(dressType){
        var _tempBottom = [];
        setTimeout(() => {
            Object.keys(this.state._tempData).map((items) => {
                if(items === dressType){
                    _tempBottom.push(this.state._tempData[items])
                }
            })
        },110)
        return _tempBottom;
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
        if(tagtype === TOP)
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

    getImageUrl(){
        var url;
        Object.keys(this.state._tempData).map((items) => {
            if(items === "img_url"){
                url = this.state._tempData[items];
            }
        })
        return url;
    }

    searchPreChecked(item, category){
        var checked = '';
        //console.log(item + "---" + category);
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
        //console.log(this.state.tagdata);
        
        Object.keys(this.state.tagdata).map((type) => {
            Object.keys(this.state.tagdata[type]).map((category) => {
                if(type === bottom_type){
                    console.log(this.state.tagdata[type]);
                }
            })
        })
    }
    showTagPage(){
        var t_crop = this.loadCropImage("Top");
        var b_crop = this.loadCropImage("bottom");
        return(
            <div className="row">
                    <div className="col-lg-6">
                        <div className="col-lg-6">
                            {/* 
                                Change photo w.r.t selected
                                if(top => show cropped top)
                                if(bottom => show cropped bottom)
                                else => show full img
                            */}
                            {
                                this.showImage()
                            }
                        </div>
                        <div className="col-lg-6">
                            <TagContent dresstype={this.state.dress_pos} submi={this.props.submitmethod}  imguritop={t_crop} imguribottom={b_crop} selectedtab={this.state.selectedTab} bottomtype_sel={this.onBottomTypeSelect.bind(this)} currentselect={this.state.currentSelected_arr} pre_selected={this.state.pre_Selected} selectedcategory={this.state.selectedCatogory} selectedtype={this.state.selectedType}/>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        {/* <iframe src={this.state.selectedCatogory +".html"} className="iframe_"></iframe> */}
                        {/* <img src={"images/"+this.state.selectedCatogory + ".png"} /> */}
                    </div>
                </div>
        )
    }
    showImage(){
        if(this.state.dress_pos === TOP){
            return <Loadimg imgurl={this.loadCropImage(TOP)} />
        }else if(this.state.dress_pos === BOTTOM){
            return <Loadimg imgurl={this.loadCropImage(BOTTOM)}/>
        }else if(this.state.dress_pos === OTHERS){
            return <Loadimg imgurl={this.getImageUrl()}/>
        }
    }

    render(){
        return(
            this.state.isLoaded ? this.showFullPage() : <Loader />
        )
    }

    showFullPage(){
        var topTitles = this.loadTitles("Top");
        var bottomTitles = this.loadTitles("Bottom");
        var bottomTypeTitle = this.loadTitles(this.state.bottom_selected);
        return(
            <div>
                 <ul class="nav nav-tabs">
                    <Tabtitle tab={"Validity"} clickevent={this.onTitleClick.bind(this)}/>
                    <Tabtitle tab={"Color"} clickevent={this.onTitleClick.bind(this)}/>
                    <TagTop titles={topTitles} d_type={"Top"} clickevent={this.onTitleClick.bind(this)}/>
                    <TagTop titles={bottomTitles} d_type={"Bottom"} clickevent={this.onTitleClick.bind(this)}/>
                    <TagTop titles={bottomTypeTitle} d_type={"Bottom"} clickevent={this.onTitleClick.bind(this)}/>
                    <Tabtitle tab={"Review"} clickevent={this.onTitleClick.bind(this)}/>
                </ul>
                {
                     this.showTagPage() 
                }
                
            </div>
        )
    }
    

    onBottomTypeSelect(a){
        this.setState({
            bottom_selected : a
        })
        
    }
    
    onTitleClick(item,category,d_pos){
        //console.log(item +"--" + category);
        var d = '';
        if(d_pos != TOP && d_pos != BOTTOM){
            d = "Others"
        }else{
            d = d_pos
        }
        this.setState({selectedTab : item, dress_pos : d})
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
                           pre_Selected : check,
                           dress_pos : d
                       })
                    }
                })
            }
            
        })
    }
}

export default Tag;