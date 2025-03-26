<?php
/**
 * Main. SpaceForceGame
 * 
 * @package SpaceForceGame
 */
get_header();
?>

<?php wp_head(); ?>



<?php

// get_template_part('alerts/fullScreen');

// get_template_part('menu/navbar');

// get_template_part('pages/app-content');

?>

<div class="board">
    <div class="part"></div>
    <div class="part"></div>
    <div class="part"></div>
    <div class="border-top"></div>
    <div class="player">
        <div class="hitbox"></div>
        <div class="hitbox"></div>
        <div class="hitbox"></div>
        <!--tutaj utwórz tag pocisku-->
    </div>
</div>





<?php wp_footer(); ?>

<?php get_footer(); ?>