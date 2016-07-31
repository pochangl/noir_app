var Comment = React.createClass({
    render: function(){
        return(
            <div className="comment">
                <p> {this.props.comment.employee } </p>
                <p> {this.props.comment.start_time } </p>
                <p> {this.props.comment.end_time } </p>
            </div>
        );
	}
});
var CommentForm = React.createClass({
    getInitialState: function(){
        return{
            employee: "",  start_time: "", end_time: ""
        };
    },
    changeEmployee: function(e){
        this.setState({employee: e.target.value});  
    },
    changeStart_time: function(e){
        this.setState({start_time: e.target.value});  
    },
    changeEnd_time: function(e){
        this.setState({end_time: e.target.value});  
    },
    click: function(){
        console.log(this.props);
        this.props.newComment(this.state);
    },
    render: function(){
        return(
            <div className="commentForm">
                <p><input type="text" placeholder="employee" 
						  value={this.state.employee} 
						  onChange={this.changeEmployee}/></p>
                <p><input type="text" placeholder="start_time" 
                          value={this.state.start_time}
                          onChange={this.changeStart_time}/></p>
                <p><input type="text" placeholder="end_time" 
                          value={this.state.end_time}
                          onChange={this.changeEnd_time}/></p>
                <input type="submit" value="confirm"
                       onClick={this.click} />
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
                <h3>請假資料：</h3>
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
//	url:"/static/schedule.json",
    url: "http://localhost:8000/api/v1/dayoff/?format=json",
    dataType:'json',
    success: function(data){
        ReactDOM.render(
            <CommentBox comments={data.objects}/>,
            document.getElementById('content_schedule')
        );
    },
    error: function(data){
        alert("fail");
    },
});
//
//// This may require the ``json2.js`` library for older browsers.
//var testdata = JSON.stringify({
////    "employee": "Mark",
//    "start_time": "2016-01-02T08:00:0",
//    "id": "1",
//    "end_time": "2016-01-02T17:00:0",
//});
//
//$.ajax({
//  url: 'http://localhost:8000/api/v1/dayoff/?format=json',
//  type: 'POST',
//  contentType: 'application/json',
//  data: testdata,
//  dataType: 'json',
//  processData: false
//})
