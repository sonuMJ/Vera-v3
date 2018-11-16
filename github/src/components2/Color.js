import React from 'react';

class Color extends React.Component{

    state ={
        topcolor:[],
        bottomcolor:[]
    }

    componentDidMount(){
        this.setState({
            topcolor : this.props.topcolor,
            bottomcolor :this.props.bottomcolor
        })
    }

    lab2rgb(lab){
        var y = (lab[0] + 16) / 116,
            x = lab[1] / 500 + y,
            z = y - lab[2] / 200,
            r, g, b;
        
        x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16/116) / 7.787);
        y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16/116) / 7.787);
        z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16/116) / 7.787);
        
        r = x *  3.2406 + y * -1.5372 + z * -0.4986;
        g = x * -0.9689 + y *  1.8758 + z *  0.0415;
        b = x *  0.0557 + y * -0.2040 + z *  1.0570;
        
        r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1/2.4) - 0.055) : 12.92 * r;
        g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1/2.4) - 0.055) : 12.92 * g;
        b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1/2.4) - 0.055) : 12.92 * b;
        
        return [Math.max(0, Math.min(1, r)) * 255, 
                Math.max(0, Math.min(1, g)) * 255, 
                Math.max(0, Math.min(1, b)) * 255]
        
    }

    getLabColor(type){
        var c ;
        if(type === "top"){
            Object.keys(this.state.topcolor).map(i =>{
                c = this.state.topcolor[i]
            })
        }else if(type === "bottom"){
            Object.keys(this.state.bottomcolor).map(i =>{
                c = this.state.bottomcolor[i]
            })
        }
        return c;
    }

    render(){

        var c = this.getLabColor("top")
        console.log(c);

        var top = this.lab2rgb([32.125214918126275, 2.5245464866289757, -25.92584132977035]);
        var bottom = this.lab2rgb([32.125214918126275, 2.5245464866289757, -25.92584132977035]);

        //console.log(a);
        
        

        
        
        return(
            <React.Fragment>
                <h1>Color</h1>
                <div className="row">
                    <div className="col-lg-8">
                        <img src={this.props.imgtop} alt="image_top" className="img-responsive"/>
                    </div>
                    <div className="col-lg-4">
                        <div className="color_sq" style={{ backgroundColor : "rgb("+ top +")"}}></div>
                    </div>
                </div>
                <br/>
                <p>&nbsp;</p>
                <div className="row">
                    <div className="col-lg-8">
                        <img src={this.props.imgbottom} alt="image_bottom" className="img-responsive"/>
                    </div>
                    <div className="col-lg-4">
                        <div className="color_sq"></div>
                    </div>
                </div>
                <p>&nbsp;</p>
                <button className="btn btn-success btn-block" onClick={this.props.next.bind(this)}>Confirm</button>
            </React.Fragment>
        )
    }
}

export default Color;