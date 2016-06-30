var Comment = React.createClass({
    render: function(){
        return(
            <div className="comment">
                <p> {this.props.comment.employee_project } </p>
                <p> {this.props.comment.assignment } </p>
                <p> {this.props.comment.start_time } </p>
                <p> {this.props.comment.end_time } </p>
            </div>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function(){
        return{
            employee_project: "", assignment: "", start_time: "", end_time: "", check_in: "", check_out: "", 
            status: "", pay: "", actual_pay: ""
        };
    },
    changeEmployeeproject: function(e){
        this.setState({employee_project: e.target.value});  
    },
    changeAssignment: function(e){
        this.setState({assignment: e.target.value});  
    },
    changeStart_time: function(e){
        this.setState({start_time: e.target.value});  
    },
    changeEnd_time: function(e){
        this.setState({end_time: e.target.value});  
    },
    changeCheck_in: function(e){
        this.setState({check_in: e.target.value});  
    },
    changeCheck_out: function(e){
        this.setState({check_out: e.target.value});  
    },
    changeStatus: function(e){
        this.setState({status: e.target.value});  
    },
    changePay: function(e){
        this.setState({pay: e.target.value});  
    },
    changeActual_pay: function(e){
        this.setState({actual_pay: e.target.value});  
    },
    click: function(){
        console.log(this.props);
        this.props.newComment(this.state);
    },
    render: function(){
        return(
            <div className="commentForm">
                <p><input type="text" placeholder="employee_project" 
                                   value={this.state.employee_project} onChange={this.changeEmployeeproject}/></p>
                <p><input type="text" placeholder="assignment" 
                                   value={this.state.assignment} onChange={this.changeAssignment}/></p>
                <p><input type="text" placeholder="start_time" 
                                   value={this.state.start_time} onChange={this.changeStart_time}/></p>
                <p><input type="text" placeholder="end_time" 
                                   value={this.state.end_time} onChange={this.changeEnd_time}/></p>
                <p><input type="text" placeholder="check_in" 
                                   value={this.state.check_in} onChange={this.changeCheck_in}/></p>
                <p><input type="text" placeholder="check_out" 
                                   value={this.state.check_out} onChange={this.changeCheck_out}/></p>
                <p><input type="text" placeholder="status" 
                                   value={this.state.status} onChange={this.changeStatus}/></p>
                <p><input type="text" placeholder="pay" 
                                   value={this.state.pay} onChange={this.changePay}/></p>
                <p><input type="text" placeholder="actual_pay" 
                                   value={this.state.actual_pay} onChange={this.changeActual_pay}/></p>
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
                指派工地：
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
//    url: "/static/project.json",
    url: "http://localhost:8000/api/v1/assignment/?format=json",
    dataType:'json',
    success: function(data){
        ReactDOM.render(
            <CommentBox comments={data.objects}/>,
            document.getElementById('content_project')
        );
    },
    error: function(data){
        alert("fail");
    },
});

