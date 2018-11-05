import React from 'react'; 
import Loader from './Loader';
import Tag from './Tag';

class Taggimgmain extends React.Component{
    state = { 
        _tempData:[],
        _tagdata:[],
        isFetched:true,
        path:''
     }

    fetchData(){
    fetch("http://localhost:5000/tags")
        .then(res => res.json())
        .then(result => this.setState({
            _tempData : result,
            isFetched : false
        }))
        .catch(e => {
            console.log("error");
        })
    }

    submitData(data){
        console.log("submit called");
        // fetch("",{
        //   method:'POST',
        //   body: JSON.stringify(data)
        // })
        // .then(res => res.json())
        // .then(result => {
        //   console.log(result)
        //   //if true
        //     //this.fetchData()
        // })
        this.props.history.push("/redirect")
    }

    parseTemp(){
        Object.keys(this.state._tempData).map(i => {
            //console.log(this.state._tempData[i][0]);
            this.setState({
            _tagdata : this.state._tempData[i][0]
            })
        })
    }

    componentDidMount(){
        this.fetchData();
        setTimeout(() => {
            this.parseTemp();
            //console.log(this.state._tagdata);
        }, 100);
        this.setState({
            path:this.props.history
        })
    }

    render(){
        return(
            <div>
            {/* <Tagging /> */}
            {/* <Tag /> */}
            {
              this.state.isFetched ? <Loader /> : <Tag dressdata={this.state._tagdata} submitmethod={this.submitData}/>
            }
          </div>
        )
    }

}

export default Taggimgmain;