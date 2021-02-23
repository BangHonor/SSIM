/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.Edit = function ( editor ) {

	var strings = editor.strings;

	var container = new UI.Panel();
	container.setClass( 'menu' );

	var title = new UI.Panel();
	title.setClass( 'title' );
	title.setTextContent( strings.getKey( 'menubar/View' ) );
	container.add( title );

	var options = new UI.Panel();
	options.setClass( 'options' );
	container.add( options );

	// Undo

	var undo = new UI.Row();
	undo.setClass( 'option' );
	undo.setTextContent( strings.getKey( 'menubar/View/undo' ) );

	options.add( undo );

	// Redo

	var redo = new UI.Row();
	redo.setClass( 'option' );
	redo.setTextContent( strings.getKey( 'menubar/View/redo' ) );

	options.add( redo );

	// Clear History

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/View/clear_history' ) );

	options.add( option );


	// ---

	options.add( new UI.HorizontalRule() );

	// Clone

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/View/clone' ) );

	options.add( option );

	// Delete

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/View/delete' ) );

	options.add( option );

	// Minify shaders

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/View/minify_shaders' ) );

	options.add( option );

	options.add( new UI.HorizontalRule() );

	// Set textures to sRGB. See #15903

	var option = new UI.Row();
	option.setClass( 'option' );
	option.setTextContent( strings.getKey( 'menubar/View/fixcolormaps' ) );

	options.add( option );

	var colorMaps = [ 'map', 'envMap', 'emissiveMap' ];

	function fixColorMap( obj ) {

		var material = obj.material;

		if ( material !== undefined ) {

			if ( Array.isArray( material ) === true ) {

				for ( var i = 0; i < material.length; i ++ ) {

					fixMaterial( material[ i ] );

				}

			} else {

				fixMaterial( material );

			}

			editor.signals.sceneGraphChanged.dispatch();

		}

	}

	var redo = new UI.Row();
	redo.setClass( 'option' );
	redo.setTextContent( strings.getKey( 'menubar/View/1' ) );

	options.add( redo );
	options.add( new UI.HorizontalRule() );

	var redo = new UI.Row();
	redo.setClass( 'option' );
	redo.setTextContent( strings.getKey( 'menubar/View/2' ) );

	options.add( redo );
	var redo = new UI.Row();
	redo.setClass( 'option' );
	redo.setTextContent( strings.getKey( 'menubar/View/3' ) );

	options.add( redo );
	options.add( new UI.HorizontalRule() );

	var redo = new UI.Row();
	redo.setClass( 'option' );
	redo.setTextContent( strings.getKey( 'menubar/View/4' ) );

	options.add( redo );


	function fixMaterial( material ) {

		var needsUpdate = material.needsUpdate;

		for ( var i = 0; i < colorMaps.length; i ++ ) {

			var map = material[ colorMaps[ i ] ];

			if ( map ) {

				map.encoding = THREE.sRGBEncoding;
				needsUpdate = true;

			}

		}

		material.needsUpdate = needsUpdate;

	}

	return container;

};
