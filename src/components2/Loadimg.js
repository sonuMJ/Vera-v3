import React from 'react';

class Loadimg extends React.Component{
    state = {
        loadedData:[]
    }

    componentDidMount(){
        fetch("../_temp.json")
        .then(res => res.json())
        .then(result => this.setState({
            loadedData : result
        }))
    }

    render(){
        var img_url = ShowImg(this.state.loadedData);
        return(
            <div>
                <img src={img_url} alt="dress" className="img-responsive"/>
            </div>
        )
    }
}
const ShowImg = (arr_) => {
    var img = '';
    arr_.map((data,i) => {
        Object.keys(data).map(items => {
            if(items === "img_url"){
                img = data[items]
            }
        })
    })
    return img;
}

export default Loadimg;