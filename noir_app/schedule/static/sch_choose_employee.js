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
			<p><a href="/schedule/dayoff/">
				{this.props.employee.id}: {this.props.employee.title}
			</a></p>
		);
	}
});


$.ajax({
	url: "http://localhost:8000/api/v1/employee/?format=json",
	dataType:"json",
	success: function(data){
		ReactDOM.render(
			<EmployeeList employees={data.objects} />,
			document.getElementById("sch_employee_list")	
		);
	},
	error: function(data){
		alert("fail");
	},
});
