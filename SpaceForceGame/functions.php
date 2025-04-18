<?php
/**
 * Functions. SpaceForceGame
 * 
 * @package SpaceForceGame
 */
?>



<?php



//require_once get_template_directory() . '/pages/info.php';

function SpaceForceGame_enqueue_scripts() {

    wp_enqueue_style('style.css', get_stylesheet_uri(), [], filemtime(get_template_directory() . '/style.css'), 'all');

    // Biblioteki:
    wp_enqueue_script('style-read.js', get_template_directory_uri() . '/libraries/style-read.js', [], filemtime(get_template_directory() . '/libraries/style-read.js'), true);

    // Obiekty z workerami:
    wp_enqueue_script('cPlayer.js', get_template_directory_uri() . '/objects/player/cPlayer.js', [], filemtime(get_template_directory() . '/objects/player/cPlayer.js'), true);
    wp_enqueue_script('wPlayer.js', get_template_directory_uri() . '/objects/player/wPlayer.js', [], filemtime(get_template_directory() . '/objects/player/wPlayer.js'), true);
    wp_enqueue_script('cSpeeder.js', get_template_directory_uri() . '/objects/enemies/speeder/cSpeeder.js', [], filemtime(get_template_directory() . '/objects/enemies/speeder/cSpeeder.js'), true);
    wp_enqueue_script('wSpeeder.js', get_template_directory_uri() . '/objects/enemies/speeder/wSpeeder.js', [], filemtime(get_template_directory() . '/objects/enemies/speeder/wSpeeder.js'), true);
    
    // Obiekty bez workerów:
    wp_enqueue_script('soundtracks.js', get_template_directory_uri() . '/objects/soundtracks/soundtracks.js', [], filemtime(get_template_directory() . '/objects/soundtracks/soundtracks.js'), true);
    wp_enqueue_script('gameBoard.js', get_template_directory_uri() . '/objects/gameBoard/script.js', [], filemtime(get_template_directory() . '/objects/gameBoard/script.js'), true);
    
    // Sterowniki poziomów:
    wp_enqueue_script('przeniesToDoLeveli.js', get_template_directory_uri() . '/pages/gameBoard/script.js', [], filemtime(get_template_directory() . '/pages/gameBoard/script.js'), true);
    
}

add_action('wp_enqueue_scripts', 'SpaceForceGame_enqueue_scripts');



?>