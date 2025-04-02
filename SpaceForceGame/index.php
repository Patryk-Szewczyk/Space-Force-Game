<?php
/**
 * Main. PongWorker
 * 
 * @package PongWorker
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
    <div class="border-bottom"></div>
    <div class="border-left"></div>
    <div class="border-right"></div>
    <div class="player">
        <div class="hitbox"></div>
        <div class="hitbox"></div>
        <div class="hitbox"></div>
        <!--tutaj utwórz tag pocisku-->
    </div>
    <!--TYLKO dla testów-->
    <div class="enemy-1"></div>
    <div class="enemy-2"></div>
    <div class="enemy-3"></div>
    <div class="enemy-4"></div>
    <div class="enemy-5"></div>
    <div class="enemy-6"></div>
    <!-- - - - - - - - - -->
</div>





<?php wp_footer(); ?>

<?php get_footer(); ?>