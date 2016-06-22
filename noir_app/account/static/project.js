var Comment = React.createClass({
    render: function(){
        return(
            <div className="comment">
                <p> {this.props.comment.name    } </p>
                <p> {this.props.comment.comment } </p>
            </div>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function(){
        return{
            name: "", comment: "dddddd"
        };
    },
    changeName: function(e){
        this.setState({name: e.target.value});  
    },
    changeComment: function(e){
        this.setState({comment: e.target.value});  
    },
    click: function(){
        console.log(this.props);
        this.props.newComment(this.state);
    },
    render: function(){
        return(
            <div className="commentForm">
                <input type="text" placeholder="Name" value={this.state.name} onChange={this.changeName}/>
                <input type="text" placeholder="Comment" value={this.state.comment} onChange={this.changeComment}/>
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
                Hello, I am a commentList.
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
    url: "/static/project.json",
    dataType:'json',
    success: function(data){
        ReactDOM.render(
            <CommentBox comments={data}/>,
            document.getElementById('content_project')
        );
    },
    error: function(data){
        alert("fail");
    },
});

$.ajax({
    url: "/static/project.json",
    dataType:'json',
    success: function(data){
        ReactDOM.render(
            <CommentBox comments={data}/>,
            document.getElementById('content_project')
        );
    },
    error: function(data){
        alert("fail");
    },
});

