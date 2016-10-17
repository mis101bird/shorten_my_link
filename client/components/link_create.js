import React, {Component} from 'react';

class LinkCreate extends Component{
   
    constructor(props){
        super(props);
        this.state={ error:'' };
    }
    handleSubmit(event){
        event.preventDefault(); //阻止元素默認行為
        console.log(this.refs.link.value); //ref: react的特殊屬性，取得render return的HTML DOM實體
        Meteor.call('links.insert',this.refs.link.value, (error)=>{ //add callback
            // console.log(error); 回傳的是給Client的簡易版Error
            if(error){
                this.setState({ error: 'Please enter the valid URL'});
            }else{
                this.setState({ error: '' }); // 改回no Error
                this.refs.link.value=''; //清空inputs
            }
        }); // 用call使用Meteor.method
    }

    render(){ //re-render when state change
    return (
        <form onSubmit={this.handleSubmit.bind(this) /*bind the Context*/}>
            <div className="form-group">
                <label>Link to Shorten</label>
                    <input ref="link" className="form-control"/>
            </div>
            <div className="text-danger">{ this.state.error }</div>
            <button className="btn btn-primary">Shorten!!</button>
        </form>
    );
    }
}

export default LinkCreate;