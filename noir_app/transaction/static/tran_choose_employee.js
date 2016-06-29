var EmployeeList = React.createClass({
	render: function(){
		var employees = this.props.employees.map(function(value, index){
			return <Employee employee={value} key={index} />;
		});
		
		return(
			<div className="employeeList">
				選擇員工：
				{ employees }
			</div>
		);
	}
});

var Employee = React.createClass({
	render: function(){
		return(
			<p><a href="/transaction/paycheck/">
				{this.props.employee.id}-{this.props.employee.title}
			</a></p>
		);
	}
});
//{this.props.employee.contact.name}無效

$.ajax({
//	url: "/static/tran_employee_list.json",
	url: "http://localhost:8000/api/v1/employee/?format=json",
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
//
//$.ajax({
////	url: "/static/tran_employee_list.json",
//	url: "http://localhost:8000/api/v1/contact/?format=json",
//	dataType:"json",
//	success: function(data){
//		ReactDOM.render(
//			<ContactList contacts={data.objects} />,
//			document.getElementById("tran_contact_list")	
//		);
//	},
//	error: function(data){
//		alert("fail");
//	},
//});
