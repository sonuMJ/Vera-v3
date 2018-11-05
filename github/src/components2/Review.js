import React from 'react';
import { withRouter } from 'react-router';

class Review extends React.Component{

    componentDidMount(){
        console.log(this.props.toptagged);
    }

    componentWillReceiveProps(){
        console.log("props changed");
        console.log(this.props.toptagged);
    }
    

    render(){
        return(
            <React.Fragment>
                <h2>Review</h2>
                <div>
                    <div className="col-lg-6">
                        <h3>Top</h3>
                        <TopReview toptaggeddata={this.props.toptagged}/>
                    </div>
                    <div className="col-lg-6">
                        <h3>Bottom</h3>
                        <TopReview toptaggeddata={this.props.bottomtagged}/>
                    </div>
                </div>
                <button className="btn btn-success btn-block" onClick={this.props.submitd.bind(this, "abc")}>Submit</button>
            </React.Fragment>
        )
    }
}
const TopReview = (props) => {
    return(
        props.toptaggeddata.map(i => {
            return(
                <p style={{marginTop:20,fontSize:18}} key={i}><strong style={{textTransform:"capitalize"}}>{i.type}:</strong>&nbsp;{i.selected}</p>
            )
        })
    )
}

export default withRouter(Review);