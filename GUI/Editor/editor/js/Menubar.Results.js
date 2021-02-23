/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.Results = function ( editor ) {

    var strings = editor.strings;

    var container = new UI.Panel();
    container.setClass( 'menu' );

    var title = new UI.Panel();
    title.setClass( 'title' );
    title.setTextContent( strings.getKey( 'menubar/Results' ) );
    container.add( title );

    var options = new UI.Panel();
    options.setClass( 'options' );
    container.add( options );

    // Group

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Results/group' ) );

    options.add( option );

    //x

    options.add( new UI.HorizontalRule() );

    // Box

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Results/plane' ) );

    options.add( option );

    // Circle

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Results/box' ) );

    options.add( option );
    options.add( new UI.HorizontalRule() );
    // Cylinder

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Results/circle' ) );

    options.add( option );

    // Dodecahedron

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Results/cylinder' ) );

    options.add( option );
    options.add( new UI.HorizontalRule() );
    // Icosahedron

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Results/ring' ) );

    options.add( option );
    options.add( new UI.HorizontalRule() );
    // Octahedron

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Results/sphere' ) );

    options.add( option );




    return container;

};
