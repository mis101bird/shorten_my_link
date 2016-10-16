import React, {Component} from 'react';

class LinkCreate extends Component{

    handleSubmit(event){
        event.preventDefault(); //阻止元素默認行為
        console.log(this.refs.link.value); //ref: react的特殊屬性，取得render return的HTML DOM實體
        Meteor.call('links.insert',this.refs.link.value); // 用call使用Meteor.method
    }

    render(){
    return (
        <form onSubmit={this.handleSubmit.bind(this) /*bind the Context*/}>
            <div className="form-group">
                <label>Link to Shorten</label>
                    <input ref="link" className="form-control"/>
            </div>
            <button className="btn btn-primary">Shorten!!</button>
        </form>
    );
    }
}

export default LinkCreate;