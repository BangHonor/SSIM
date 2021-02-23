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
		//$(window.parent.document).find("#bottom").attr("style", "margin-top:20%;")//注意这里的用法，其他的很多都不可行
		div.innerHTML =`
			<div style="
			width:100%;
			font-size:12px;
			line-height:250%;
			display: grid;
			grid-template-rows: 50% 50%;
			/*共三行，每行行高60px*/
			grid-template-columns: 25% 25% 25% 25%;
			background-color:grey">
			<div>&emsp;<input style="background-color:lightgrey;overflow:hidden;width:70%;text-align:center" type="text" readonly value="Please enter coordinates of nodes"></div>
			<div class="cal" style="display:inline"><input style="background-color:lightgrey;overflow:hidden;width:20%;text-align:center" type="text" readonly value="Status">&nbsp;<input style="background-color:lightgrey;overflow:hidden;width:50%" type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
			<div></div>
			<div></div>

			<div class="cal" style="display:inline">&emsp;<input style="background-color:lightgrey;overflow:hidden;width:20%;text-align:center" type="text" readonly value="x=">&nbsp;<input type="text" id="x" style="width:40%"></div>
			<div class="cal" style="display:inline"><input style="background-color:lightgrey;overflow:hidden;width:20%;text-align:center" type="text" readonly value="y=">&nbsp;<input type="text" id="y" style="width:40%"></div>
			<div class="cal" style="display:inline"><input style="background-color:lightgrey;overflow:hidden;width:20%;text-align:center" type="text" readonly value="z=">&nbsp;<input type="text" id="z" style="width:40%"></div>
			<div><input type="button" style="width:40%;overflow:hidden" value="Apply" onclick="DefineNodes()">&emsp;<button style="width:40%;overflow:hidden" onclick="Cancel()">Cancel</button></div

</div>
`
	});

	options.add(option);

	//Move Node(s)
	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Geometry/Move Node(s)' ) );
	option.onClick(function () {
		var div = window.parent.document.getElementById("bottom")
		$(window.parent.document).find("#bottom").attr("style", "margin-bottom")//注意这里的用法，其他的很多都不可行
		div.innerHTML = `
			<div style="
			font-size:12px;
			line-height:250%;
			display: grid;
			grid-template-rows: 50% 50%;
			/*共三行，每行行高60px*/
			grid-template-columns: 25% 25% 25% 25%;
			background-color:grey">
<div>&emsp;<input style="background-color:lightgrey;overflow:hidden;width:70%;text-align:center" type="text" readonly value="Define node(s) and movement"></div>
<div><input style="background-color:lightgrey;overflow:hidden;width:30%;text-align:center" type="text" readonly value="Node(s)"><input type="text" id="node" style="width:30%"></div>
<div><button style="width:20%" onclick="All()">All</button><button style="width:20%" onclick="Clr()">Clr</button><button style="width:20%" onclick="Adv()">Adv</button></div>
<div class="cal" style="display:inline"><input style="background-color:lightgrey;overflow:hidden;width:20%;text-align:center" type="text" readonly value="Status">&nbsp;<input style="background-color:lightgrey;overflow:hidden;width:50%" type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>


			
			<div class="cal" style="display:inline">&emsp;<input style="background-color:lightgrey;overflow:hidden;width:20%;text-align:center" type="text" readonly value="Delta x=">&nbsp;<input type="text" id="x" style="width:40%"></div>
			<div class="cal" style="display:inline"><input style="background-color:lightgrey;overflow:hidden;width:20%;text-align:center" type="text" readonly value="Delta y=">&nbsp;<input type="text" id="y" style="width:40%"></div>
			<div class="cal" style="display:inline"><input style="background-color:lightgrey;overflow:hidden;width:20%;text-align:center" type="text" readonly value="Delta z=">&nbsp;<input type="text" id="z" style="width:40%"></div>


			<div><input type="button" style="width:40%" value="Apply" onclick="MoveNodes()">&emsp;<button style="width:40%" onclick="Cancel()">Cancel</button></div>
`
	});
	options.add(option);


	// Duplicate Node(s)
	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Geometry/Duplicate Node(s)' ) );
	options.add( option );

	// Remove Node(s)
	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent(strings.getKey('menubar/Geometry/Remove Node(s)'));
	option.onClick(function () {
		var div = window.parent.document.getElementById("bottom")
		$(window.parent.document).find("#bottom").attr("style", "margin-top:57%")//注意这里的用法，其他的很多都不可行
		div.innerHTML = `
			<div style="height:100%;
			font-size:12px;
			line-height:30px;
			display: grid;
			grid-template-rows: 40% 40%;

			grid-template-columns: 50% 50%;
			background-color:grey">
<div>&emsp;<input style="background-color:lightgrey;overflow:hidden;width:80%;text-align:center" type="text" readonly value="Please define node(s) to remove that are element independent"></div>
<div class="cal" style="display:inline"><input style="background-color:lightgrey;overflow:hidden;width:20%;text-align:center" type="text" readonly value="Status">&nbsp;<input style="background-color:lightgrey;overflow:hidden;width:50%" type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
<div class="cal" style="display:inline">&emsp;<input style="background-color:lightgrey;overflow:hidden;width:20%;text-align:center" type="text" readonly value="Node(s)">&nbsp;<input type="text" id="node" style="width:40%"></div>
<div><button style="width:30%" onclick="AllUnattached()">AllUnattached</button><button style="width:10%" onclick="Clr()">Clr</button><button style="width:10%" onclick="Adv()">Adv</button>&emsp;&emsp;<input type="button" style="width:15%" value="Apply" onclick="RemoveNodes()"><button style="width:15%" onclick="Cancel()">Cancel</button></div>
`
	});
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
<div class="cal" style="display:inline"><label style="background-color:lightgrey; ">&nbsp;&emsp;Status:&nbsp;&emsp;</label>&nbsp;<label style="background-color:lightgrey;">&emsp;&emsp;&emsp;&emsp;Blanks NOT Acceptable!&emsp;&emsp;&emsp;&emsp;</label></div>
<div></div>
<div></div>

			<div class="cal" style="display:inline">&emsp;<label style="background-color:lightgrey; ">&emsp;&emsp;Node i=&emsp;&emsp;</label>&nbsp;<input type="text" id="Nodei" style="width:50%"></div>
			<div class="cal" style="display:inline"><label style="background-color:lightgrey; ">&emsp;&emsp;Node j&emsp;&emsp;</label>&nbsp;<input type="text" id="Nodej" style="width:50%"></div>
			<div class="cal" style="display:inline"><label style="background-color:lightgrey;">&emsp;&emsp;Beta(Deg)&emsp;&emsp;</label>&nbsp;<input type="text" id="Beta" style="width:50%"></div>


			<div><input type="button" style="width:100px" value="Apply" onclick="DefineElements()">&emsp;<button style="width:100px">Cancel</button></div>
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
