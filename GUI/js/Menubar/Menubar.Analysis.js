/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.Analysis = function ( editor ) {

    var strings = editor.strings;

    var container = new UI.Panel();
    container.setClass( 'menu' );

    var title = new UI.Panel();
    title.setClass( 'title' );
    title.setTextContent( strings.getKey( 'menubar/Analysis' ) );
    container.add( title );

    var options = new UI.Panel();
    options.setClass( 'options' );
    container.add( options );

    // Group

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Analysis/group' ) );

    options.add( option );

    //x


    // Box

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Analysis/plane' ) );

    options.add( option );

    // Circle

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Analysis/box' ) );

    options.add( option );

    // Cylinder

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Analysis/circle' ) );

    options.add( option );
    options.add( new UI.HorizontalRule() );
    // Dodecahedron

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Analysis/cylinder' ) );

    options.add( option );

    // Icosahedron

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Analysis/ring' ) );

    options.add( option );
    options.add( new UI.HorizontalRule() );
    // Octahedron

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Analysis/sphere' ) );

    options.add( option );

    // Plane

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Analysis/dodecahedron' ) );

    options.add( option );
    options.add( new UI.HorizontalRule() );
    // Ring

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Analysis/icosahedron' ) );

    options.add( option );


    return container;

};
