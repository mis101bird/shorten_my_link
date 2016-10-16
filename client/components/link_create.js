import React, {Component} from 'react';

class LinkCreate extends Component{

    handleSubmit(event){
        event.preventDefault(); //阻止元素默認行為
        console.log(this.refs.input.value);
    }

    render(){
    return (
        <form onSubmit={this.handleSubmit.bind(this) /*bind the Context*/}>
            <div className="form-group">
                <label>Link to Shorten</label>
                    <input ref="input" className="form-control"/>
            </div>
            <button className="btn btn-primary">Shorten!!</button>
        </form>
    );
    }
}

export default LinkCreate;