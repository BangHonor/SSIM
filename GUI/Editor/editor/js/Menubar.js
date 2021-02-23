/**
 * @author mrdoob / http://mrdoob.com/
 */

var Menubar = function ( editor ) {

	var container = new UI.Panel();
	container.setId( 'menubar' );

	container.add( new Menubar.File( editor ) );
	container.add( new Menubar.Edit( editor ) );
	container.add( new Menubar.Geometry( editor ) );
	container.add( new Menubar.Properties( editor ) )
	container.add( new Menubar.Conditions( editor ) );
	container.add( new Menubar.Analysis( editor ) );
	container.add( new Menubar.Results( editor ) );

	container.add( new Menubar.Status( editor ) );
	container.add( new Menubar.Add( editor ) );
	return container;

};
