var PyacheckInformation = React.createClass({
    render: function(){
        return(
            <div className="information">
                <p> {this.props.information.amount } </p>
                <p> {this.props.information.reason_code } </p>
                <p> {this.props.information.reason } </p>
            </div>
        );
    }
});
//<p> {this.props.information.employee.contact.name } </p>
//<p> {this.props.information.id } </p>

var PyacheckInformationForm = React.createClass({
    getInitialState: function(){
        return{
//            employee: "", amount: "", reason_code: "", reason: ""
            amount: "", reason_code: "", reason: ""
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
    click: function(){
        console.log(this.props);
        this.props.newPaycheckInformation(this.state);
	    $.ajax({
			type: 'GET',
			url: "/api/v1/paycheck/?format=json",
			data: JSON.stringify({
				"amount":"0",
				"reason_code":"0",
				"reason":"0"
			}),
			error: function(e) {
				console.log(e);
			},
			dataType: 'json',
			contentType: 'application/json',
	    });
    }, 
      
    render: function(){
        return(
            <div className="informationForm">
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
//changeEmployee: function(e){
//this.setState({employee: e.target.value});  
//},

//<p><input type="text" placeholder="employee" 
//value={this.state.employee} onChange={this.changeEmployee}/></p>

//<input type="hidden" name="_csrf" value="<%= _csrf %>" />

var PyacheckInformationList = React.createClass({
    render: function(){
        var informations = this.props.informations.map(function(value, index){
            return <PyacheckInformation information={value} key={index}/>;
        });
        
        return(
            <div className="informationList">
                <h3>Paycheck Informantion：</h3>
                { informations }
            </div>
        );
    }
});


var PyacheckInformationBox = React.createClass({
    getInitialState: function(){
        console.log(this.props.informations);
        return {informations: this.props.informations};
    },
    newPaycheckInformation: function(data){
        this.state.informations.push(data);
        this.setState({state: this.state.informations});
    },
// 
//    handlePaycheckInformationSubmit: function(information) {
//        // TODO: submit to the server and refresh the list
//    	var information_form = $(information).serialize();
//    	console.log(this.props);
//	    $.ajax({
//			type: 'GET',
//			url: "/api/v1/paycheck/?format=json",
//			data: { amount: "0", reason_code: "0", reason: "0"},
//	    });
//    },
    
    render: function(){
        return(
            <div className="informationBox">
                <PyacheckInformationList informations={this.state.informations} />
                <PyacheckInformationForm newPaycheckInformation={this.newPaycheckInformation} />
            </div>
        );
    }
});
//this.state.informations.push(data);

//url: this.props.url,
//dataType: 'json',
//data: { csrfmiddlewaretoken: "{{ csrf_token }}", data:"data"},
//contentType: 'application/json',

//success: function(data){
//console.log(data);
//this.setState({data: data});
//},
//error: function(data){
//alert("fail");
//},

//<PyacheckInformationForm newPyacheckInformation={this.newPyacheckInformation} />

//        success: function(data) {
//          this.setState({data: data});
//        }.bind(this),
//        error: function(xhr, status, err) {
//          console.error(this.props.url, status, err.toString());
//        }.bind(this)




$.ajax({
    url: "/api/v1/paycheck/?format=json",
    dataType:'json',
    success: function(data){
        ReactDOM.render(
            <PyacheckInformationBox informations={data.objects}/>,
            document.getElementById('content_transaction')
        );
    },
    error: function(data){
        alert("fail");
    },
});
