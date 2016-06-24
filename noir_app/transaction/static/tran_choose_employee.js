var EmployeeList = React.createClass({
	render: function(){
		var employees = this.props.employees.map(function(value, index){
			return <Employee employee={value} key={index} />;
		});
		
		return(
			<div className="employeeList">
				選擇工地：
				{ employees }
			</div>
		);
	}
});

var Employee = React.createClass({
	render: function(){
		return(
			<p><a href="#">
				{this.props.employee.id}: {this.props.employee.name}
			</a></p>
		);
	}
});


$.ajax({
	url: "/static/tran_employee_list.json",
	dataType:"json",
	success: function(data){
		ReactDOM.render(
			<EmployeeList employees={data.objects} />,
			document.getElementById("tran_employee_list")	
		);
	},
	error: function(data){
		alert("fail");
	},
});
