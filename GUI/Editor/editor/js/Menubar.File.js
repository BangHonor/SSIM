/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.File = function ( editor ) {

	var NUMBER_PRECISION = 6;


	function parseNumber( key, value ) {

		return typeof value === 'number' ? parseFloat( value.toFixed( NUMBER_PRECISION ) ) : value;

	}

	//

	var config = editor.config;
	var strings = editor.strings;

	var container = new UI.Panel();
	container.setClass( 'menu' );

	var title = new UI.Panel();
	title.setClass( 'title' );
	title.setTextContent( strings.getKey( 'menubar/file' ) );
	container.add( title );

	var options = new UI.Panel();
	options.setClass( 'options' );
	container.add( options );

	// New

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/file/new' ) );
	option.onClick( function () {

		if ( confirm( 'Any unsaved data will be lost. Are you sure?' ) ) {

			editor.clear();

		}

	} );
	options.add( option );

	//

	options.add( new UI.HorizontalRule() );

	// Import

	var form = document.createElement( 'form' );
	form.style.display = 'none';
	document.body.appendChild( form );

	var fileInput = document.createElement( 'input' );
	fileInput.multiple = true;
	fileInput.type = 'file';
	fileInput.addEventListener( 'change', function ( event ) {

		editor.loader.loadFiles( fileInput.files );
		form.reset();

	} );
	form.appendChild( fileInput );

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/file/import' ) );
	option.onClick( function () {

		fileInput.click();

	} );
	options.add( option );

	options.add( new UI.HorizontalRule() );

	// Export Geometry

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/file/export/geometry' ) );
	option.onClick( function () {

		var object = editor.selected;

		if ( object === null ) {

			alert( 'No object selected.' );
			return;

		}

		var exporter = new THREE.OBJExporter();

		saveString( exporter.parse( object ), 'model.obj' );

	} );
	options.add( option );

	// Export Object

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/file/export/object' ) );

	options.add( option );
	options.add( new UI.HorizontalRule() );

	// Export Scene

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/file/export/scene' ) );

	options.add( option );

	//

	options.add( new UI.HorizontalRule() );

	// Export DAE

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/file/export/dae' ) );

	options.add( option );
	options.add( new UI.HorizontalRule() );
	// Export GLB

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/file/export/glb' ) );

	options.add( option );

	// Export GLTF

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/file/export/gltf' ) );

	options.add( option );
	options.add( new UI.HorizontalRule() );
	// Export OBJ

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/file/export/obj' ) );

	options.add( option );
	options.add( new UI.HorizontalRule() );
	// Export STL (ASCII)

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/file/export/stl' ) );
	option.onClick( function () {

		window.close()

	} );
	options.add( option );


	var link = document.createElement( 'a' );
	function save( blob, filename ) {

		link.href = URL.createObjectURL( blob );
		link.download = filename || 'data.json';
		link.dispatchEvent( new MouseEvent( 'click' ) );

		// URL.revokeObjectURL( url ); breaks Firefox...

	}

	function saveArrayBuffer( buffer, filename ) {

		save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );

	}

	function saveString( text, filename ) {

		save( new Blob( [ text ], { type: 'text/plain' } ), filename );

	}

	return container;

};
