var ProjectList = React.createClass({
	render: function(){
		var projects = this.props.projects.map(function(value, index){
			return <Project project={value} key={index} />;
		});
		
		return(
			<div className="projectList">
				選擇工地：
				{ projects }
			</div>
		);
	}
});

var Project = React.createClass({
	render: function(){
		return(
			<div className="project">
				<p> { this.props.project.id} </p>
				<p> { this.props.project.name} </p>
			</div>
		);
	}
});


$.ajax({
	url: "./project_list.json",
	dataType:"json",
	success: function(data){
		ReactDOM.render(
			<ProjectList projects={data.objects} />,
			document.getElementById("project_list")	
		);
	},
	error: function(data){
		alert("fail");
	},
});
