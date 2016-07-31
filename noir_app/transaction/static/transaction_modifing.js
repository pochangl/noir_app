var PyacheckInformation = React.createClass({
    rawMarkup: function() {
	    var md = new Remarkable();
	    var rawMarkup = md.render(this.props.children.toString());
	    return { __html: rawMarkup };
	},
	render: function(){
        return(
            <div className="information">
            	<span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

//<h2 claaName="informationAmount">
//	{this.props.amount}
//</h2>
//<p> {md.render(this.props.amount.toString()) </p>
//<p> {md.render(this.props.reason_code.toString()) </p>
//<p> {md.render(this.props.reason.toString()) </p>



var PyacheckInformationForm = React.createClass({
    getInitialState: function(){
        return{
            amount: "", reason_code: "", reason: ""
//            {data: {information:[]}};
        };
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
    handleSubmit: function(e) {
        e.preventDefault();
        var amount = this.state.amount.trim();
        var reason_code = this.state.reason_code.trim();
        var reason = this.state.reason.trim();
        if (!amount || !reason_code || !reason) {
        	return;
        }
        // TODO: send request to the server
        this.props.onInformationSubmit({amount: amount, reason_code: reason_code, reason: reason});
        this.setState({amount: "", reason_code: "", reason: ""});
      },
      
    render: function(){
        return(
            <form className="informationForm" onSubmit={this.handleSubmit}>
                <p><input type="text" placeholder="amount" 
                                   value={this.state.amount} onChange={this.changeAmount}/></p>
                <p><input type="text" placeholder="reason_code" 
                                   value={this.state.reason_code} onChange={this.changeReason_code}/></p>
                <p><input type="text" placeholder="reason" 
                                   value={this.state.reason} onChange={this.changeReason}/></p>
                <input type="submit" value="confirm" />
            </form>
        );
    }
});



var PyacheckInformationList = React.createClass({
    render: function(){
        console.log(this.props.data);
        var dataNodes = this.props.data.map(function(information){
            return (
            	<PyacheckInformation key={information.id} value={information}>
	            	{information.amount}
	            	{information.reason_code}
	            	{information.reason}
            	</PyacheckInformation>
            );
        });
        
        return(
            <div className="informationList">
                { dataNodes }
            </div>
        );
    }
});

//{information.amount}
//{information.reason_code}
//{information.reason}
//<Comment author="Pete Hunt">This is one comment</Comment>
//<Comment author="Jordan Walke">This is *another* comment</Comment>

var PyacheckInformationBox = React.createClass({
	handleInformationSubmit: function(data) {
	    // TODO: submit to the server and refresh the list
	    $.ajax({
	        url: "/api/v1/paycheck/?format=json",
	        dataType: 'json',
	        type: 'POST',
	        data: data,
	        success: function(data) {
	            this.setState({data: data});
	        }.bind(this),
	        error: function(xhr, status, err) {
	            console.error(this.props.url, status, err.toString());
	        }.bind(this)
	    });
	},
	  
    getInitialState: function(){
        console.log(this.props.data);
        return {data: this.props.data};
//        return {data: {information:[]}};
    },
    
	componentDidMount: function() {
		$.ajax({
//			url: this.props.url,
			url: "/api/v1/paycheck/?format=json",
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
//				console.error(this.props.url, status, err.toString());
		        alert("fail");
			}.bind(this)
		});
	},
      
//    newPaycheckInformation: function(data){
//        this.state.informations.push(data);
//        this.setState({state: this.state.informations});
//    },
    
    render: function(){
        console.log(this.props.data);
        return(
            <div className="informationBox">
            	<h3>PyacheckInformation</h3>
                <PyacheckInformationList data={this.state.data} />
                <PyacheckInformationForm onInformationSubmit={this.handleInformationSubmit} />
            </div>
        );
    }
});

//ReactDOM.render(
//	<CommentBox />,
//    document.getElementById('content_transaction')
//);
//<PyacheckInformationForm newPaycheckInformation={this.newPaycheckInformation} />

$.ajax({
    url: "/api/v1/paycheck/?format=json",
    dataType:'json',
    success: function(data){
        ReactDOM.render(
            <PyacheckInformationBox data={data.objects}/>,
            document.getElementById('content_transaction')
        );
    },
    error: function(data){
        alert("fail");
    },
});
