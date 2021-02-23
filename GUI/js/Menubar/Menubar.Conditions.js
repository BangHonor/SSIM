/**
 * @author mrdoob / http://mrdoob.com/
 */

Menubar.Conditions = function ( editor ) {

    var strings = editor.strings;

    var container = new UI.Panel();
    container.setClass( 'menu' );

    var title = new UI.Panel();
    title.setClass( 'title' );
    title.setTextContent( strings.getKey( 'menubar/Conditions' ) );
    container.add( title );

    var options = new UI.Panel();
    options.setClass( 'options' );
    container.add( options );

    // Group

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Conditions/fix' ) );

    options.add( option );
    options.add( new UI.HorizontalRule() );
    //x

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Conditions/group' ) );

    options.add( option );

    // Box

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Conditions/plane' ) );

    options.add( option );
    options.add( new UI.HorizontalRule() );
    // Circle

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Conditions/box' ) );

    options.add( option );
    options.add( new UI.HorizontalRule() );
    // Cylinder

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Conditions/circle' ) );

    options.add( option );

    // Dodecahedron

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Conditions/cylinder' ) );

    options.add( option );
    options.add( new UI.HorizontalRule() );
    // Icosahedron

    var option = new UI.Row();
    option.setClass( 'option' );
    option.setTextContent( strings.getKey( 'menubar/Conditions/ring' ) );

    options.add( option );





    return container;

};
