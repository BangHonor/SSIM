/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.Properties = function ( editor ) {

	var strings = editor.strings;

	var container = new UI.Panel();
	container.setClass( 'menu' );

	var title = new UI.Panel();
	title.setClass( 'title' );
	title.setTextContent( strings.getKey( 'menubar/Properties' ) );
	container.add( title );

	var options = new UI.Panel();
	options.setClass( 'options' );
	container.add( options );

	// Group

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Properties/group' ) );
	option.onClick(function () {
		var div = window.parent.document.getElementById("bottom")
		$(window.parent.document).find("#bottom").attr("style", "margin-top:730px")//注意这里的用法，其他的很多都不可行
		div.innerHTML = `
			<div style="height:100%;
			font-size:12px;
			line-height:30px;
			display: grid;
			grid-template-rows: 30% 30% 30%;
			/*共三行，每行行高60px*/
			grid-template-columns: 17% 17% 17% 17% 17% 15%;
			background-color:grey">
<div>&emsp;<label style="background-color:lightgrey;">&emsp;Please enter section priperties</label></div>
<div>&emsp;&emsp;<label style="background-color:lightgrey;">&emsp;&emsp;&emsp;Section 1&emsp;&emsp;&emsp;</label></div>
<div class="cal" style="display:inline"><label style="background-color:lightgrey; ">&nbsp;Name&nbsp;&emsp;</label>&nbsp;<input style="width:120px"></div>
<div id="Dimensions button" >&emsp;&emsp;&emsp;<span style="margin-left:2%;background-color:lightgrey;width:30%"><input type="radio" style="font-size:15px">Database&nbsp;&nbsp;</span></div>
<div class="cal" style="display:inline"><label style="background-color:lightgrey; ">&nbsp;Status:&nbsp;</label>&nbsp;<label style="background-color:lightgrey;">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</label></div>
<div></div>

			<div class="cal" style="display:inline">&emsp;<label style="background-color:lightgrey; ">&nbsp;Area=&nbsp;</label>&nbsp;<input style="width:120px"></div>
			<div class="cal" style="display:inline"><label style="background-color:lightgrey; ">&nbsp;Izz=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>&nbsp;<input style="width:120px"></div>
			<div class="cal" style="display:inline"><label style="background-color:lightgrey;">&nbsp;Iyy=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>&nbsp;<input style="width:120px"></div>
			<div class="cal" style="display:inline"><label style="background-color:lightgrey;">&nbsp;J=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>&nbsp;<input style="width:120px"></div>
			<div class="cal" style="display:inline"><label style="background-color:lightgrey;">&nbsp;Cw=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>&nbsp;<input style="width:120px"></div>
			<div onclick="Advanced()"><select>
<option>Basic</option>
<option>Advanced</option>
</select></div>
			<div class="cal" style="display:inline">&emsp;<label style="background-color:lightgrey;">&nbsp;Zzz=&nbsp; &nbsp;</label>&nbsp;<input style="width:120px"></div>
			<div class="cal" style="display:inline"><label style="background-color:lightgrey;">&nbsp;Zyy=&nbsp;&nbsp;&nbsp; </label>&nbsp;<input style="width:120px"></div>
			<div class="cal" style="display:inline"><label style="background-color:lightgrey;">&nbsp;Ayy=&emsp; </label>&nbsp;<input style="width:120px"></div>
			<div class="cal" style="display:inline"><label style="background-color:lightgrey;">&nbsp;Azz=&emsp;&nbsp; </label>&nbsp;<input style="width:120px"></div>
			<div><button style="width:150px">Apply</button></div
			<div><button style="width:150px">Cancel</button></div>
</div>
`



	});
	options.add( option );


	// Box

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Properties/plane' ) );

	options.add( option );

	// Circle

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Properties/box' ) );

	options.add( option );

	// Cylinder

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Properties/circle' ) );

	options.add( option );
	options.add( new UI.HorizontalRule() );
	// Dodecahedron

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Properties/cylinder' ) );

	options.add( option );
	options.add( new UI.HorizontalRule() );
	// Icosahedron

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Properties/ring' ) );

	options.add( option );

	// Octahedron

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Properties/sphere' ) );

	options.add( option );

	// Plane

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Properties/dodecahedron' ) );

	options.add( option );

	// Ring

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Properties/icosahedron' ) );

	options.add( option );
	options.add( new UI.HorizontalRule() );
	// Sphere

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/Properties/octahedron' ) );

	options.add( option );



	return container;

};
