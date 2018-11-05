import React from 'react';

class Loader extends React.Component{
    getHeight(){
        var height = window.innerHeight;
        var _h = height / 2;
        return _h;
    }
    render(){
        return(
            <div style={{textAlign:"center",marginTop:this.getHeight()-100}}>
                <h3 className="text-center" >Loading...</h3>
                <img src="./gif/2.gif" alt="loader_gif"/>
            </div>
        )
    }
}

export default Loader;