var Comment = React.createClass({
    render: function(){
        return(
            <div className="comment">
                <p> {this.props.comment.employee } </p>
                <p> {this.props.comment.amount } </p>
                <p> {this.props.comment.reason_code } </p>
                <p> {this.props.comment.reason } </p>
            </div>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function(){
        return{
            employee: "", amount: "", reason_code: "", reason: ""
        };
    },
    changeEmployee: function(e){
        this.setState({employee: e.target.value});  
    },
    changeAmount: function(e){
        this.setState({amount: e.target.value});  
    },
    changeReason_code: function(e){
        this.setState({reason_code: e.target.value});  
    },
    changeReason: function(e){
        this.setState({reason: e.target.value});  
    },
    click: function(){
        console.log(this.props);
        this.props.newComment(this.state);
    },
    render: function(){
        return(
            <div className="commentForm">
                <p><input type="text" placeholder="employee" 
                                   value={this.state.employee} onChange={this.changeEmployee}/></p>
                <p><input type="text" placeholder="amount" 
                                   value={this.state.amount} onChange={this.changeAmount}/></p>
                <p><input type="text" placeholder="reason_code" 
                                   value={this.state.reason_code} onChange={this.changeReason_code}/></p>
                <p><input type="text" placeholder="reason" 
                                   value={this.state.reason} onChange={this.changeReason}/></p>
                <input type="submit" value="confirm" onClick={this.click} />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function(){
        var comments = this.props.comments.map(function(value, index){
            return <Comment comment={value} key={index}/>;
        });
        
        return(
            <div className="commentList">
                指定員工：
                { comments }
            </div>
        );
    }
});


var CommentBox = React.createClass({
    getInitialState: function(){
        console.log(this.props.comments);
        return {comments: this.props.comments};
    },
    newComment: function(data){
        this.state.comments.push(data);
        this.setState({state: this.state.comments});
    },
    render: function(){
        return(
            <div className="commentBox">
                <CommentList comments={this.state.comments} />
                <CommentForm newComment={this.newComment} />
            </div>
        );
    }
});

$.ajax({
    url: "/static/transaction.json",
    dataType:'json',
    success: function(data){
        ReactDOM.render(
            <CommentBox comments={data}/>,
            document.getElementById('content_transaction')
        );
    },
    error: function(data){
        alert("fail");
    },
});
