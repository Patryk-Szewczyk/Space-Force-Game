<?php
/**
 * Functions. PongWorker
 * 
 * @package PongWorker
 */
?>



<?php



//require_once get_template_directory() . '/pages/info.php';

function SpaceForceGame_enqueue_scripts() {

    wp_enqueue_style('style.css', get_stylesheet_uri(), [], filemtime(get_template_directory() . '/style.css'), 'all');

    wp_enqueue_script('cPlayer.js', get_template_directory_uri() . '/objects/player/cPlayer.js', [], filemtime(get_template_directory() . '/objects/player/cPlayer.js'), true);
    wp_enqueue_script('wPlayer.js', get_template_directory_uri() . '/objects/player/wPlayer.js', [], filemtime(get_template_directory() . '/objects/player/wPlayer.js'), true);
    
    wp_enqueue_script('board.js', get_template_directory_uri() . '/objects/board/board.js', [], filemtime(get_template_directory() . '/objects/board/board.js'), true);
    
    wp_enqueue_script('run.js', get_template_directory_uri() . '/pages/run/run.js', [], filemtime(get_template_directory() . '/pages/run/run.js'), true);
    
}

add_action('wp_enqueue_scripts', 'SpaceForceGame_enqueue_scripts');



?>