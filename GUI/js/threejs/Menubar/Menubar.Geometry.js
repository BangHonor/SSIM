/// <reference path="system.min.js" />
/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.Geometry = function ( editor ) {

	var strings = editor.strings;

	var container = new UI.Panel();
	container.setClass( 'menu' );

	var title = new UI.Panel();
	title.setClass( 'title' );
	title.setTextContent( strings.getKey( 'menubar/Geometry' ) );
	container.add( title );

	var options = new UI.Panel();
	options.setClass( 'options' );
	container.add( options );


	//Define Nodes
	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent(strings.getKey('menubar/Geometry/Define Node(s)'));
	option.onClick(function () {
		var div = window.parent.document.getElementById("bottom")
		$(window.parent.document).find("#bottom").attr("style", "margin-top:760px")//注意这里的用法，其他的很多都不可行
		div.innerHTML =`
			<div style="height:100%;
			font-size:12px;
			line-height:30px;
			display: grid;
			grid-template-rows: 40% 40%;
			/*共三行，每行行高60px*/
			grid-template-columns: 25% 25% 25% 25%;
			background-color:grey">
<div>&emsp;<label style="background-color:lightgrey;">&emsp;Please enter coordinates of nodes&emsp;</label></div>
<div class="cal" style="display:inline"><label style="background-color:lightgrey; ">&nbsp;&emsp;Status:&nbsp;&emsp;</label>&nbsp;<label style="background-color:lightgrey;">&emsp;&emsp;&emsp;&emsp;Blank not acceptable!&emsp;&emsp;&emsp;&emsp;</label></div>
<div></div>
<div></div>

			<div class="cal" style="display:inline">&emsp;<label style="background-color:lightgrey; ">&emsp;&emsp;x=&emsp;&emsp;</label>&nbsp;<input type="text" id="x" style="width:120px"></div>
			<div class="cal" style="display:inline"><label style="background-color:lightgrey; ">&emsp;&emsp;y=&emsp;&emsp;</label>&nbsp;<input type="text" id="y" style="width:120px"></div>
			<div class="cal" style="display:inline"><label style="background-color:lightgrey;">&emsp;&emsp;z=&emsp;&emsp;</label>&nbsp;<input type="text" id="z" style="width:120px"></div>


			<div><input type="button" style="width:100px" value="Apply" onclick="DefineNodes()">&emsp;<button style="width:100px">Cancel</button></div

</div>
`
	});

	options.add(option);

	//Move Node(s)
	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Geometry/Move Node(s)' ) );
	options.add( option );


	// Duplicate Node(s)
	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Geometry/Duplicate Node(s)' ) );
	options.add( option );

	// Remove Node(s)
	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Geometry/Remove Node(s)' ) );
	options.add( option );

	// Renumber Node(s)
	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Geometry/Renumber Node(s)' ) );
	options.add( option );
	options.add(new UI.HorizontalRule());


	// Define Element(s)
	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Geometry/Define Element(s)' ) );
	option.onClick(function () {
		var div = window.parent.document.getElementById("bottom")
		div.innerHTML = `
			<div style="height:100%;
			font-size:12px;
			line-height:30px;
			display: grid;
			grid-template-rows: 40% 40%;
			/*共三行，每行行高60px*/
			grid-template-columns: 25% 25% 25% 25%;
			background-color:grey">
<div>&emsp;<label style="background-color:lightgrey;">&emsp;Please enter coordinates of nodes&emsp;</label></div>
<div class="cal" style="display:inline"><label style="background-color:lightgrey; ">&nbsp;&emsp;Status:&nbsp;&emsp;</label>&nbsp;<label style="background-color:lightgrey;">&emsp;&emsp;&emsp;&emsp;Blank not acceptable!&emsp;&emsp;&emsp;&emsp;</label></div>
<div></div>
<div></div>

			<div class="cal" style="display:inline">&emsp;<label style="background-color:lightgrey; ">&emsp;&emsp;Node i=&emsp;&emsp;</label>&nbsp;<input type="text" id="Nodei" style="width:120px"></div>
			<div class="cal" style="display:inline"><label style="background-color:lightgrey; ">&emsp;&emsp;Node j&emsp;&emsp;</label>&nbsp;<input type="text" id="Nodej" style="width:120px"></div>
			<div class="cal" style="display:inline"><label style="background-color:lightgrey;">&emsp;&emsp;Beta(Deg)&emsp;&emsp;</label>&nbsp;<input type="text" id="Beta" style="width:120px"></div>


			<div><input type="button" style="width:100px" value="Apply" onclick="DefineElements()">&emsp;<button style="width:100px">Cancel</button></div

</div>
`
	});
	options.add(option);

	// Remove Element(s)
	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent(strings.getKey('menubar/Geometry/Remove Element(s)' ) );
	options.add( option );

	// Subdivide Element(s)
	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent(strings.getKey('menubar/Geometry/Subdivide Element(s)' ) );
	options.add( option );

	// Re-orient Element(s)
	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Geometry/Re-orient Element(s)' ) );
	options.add( option );

	// Define Connections
	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Geometry/Define Connections' ) );
	options.add( option );
	options.add(new UI.HorizontalRule());

	// Define Frame
	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Geometry/Define Frame' ) );
	options.add( option );
	options.add(new UI.HorizontalRule());

	//Information
	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Geometry/Information' ) );
	options.add( option );


	return container;

};
