<!DOCTYPE html>
<html <?php echo get_language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <?php wp_head(); ?>
  </head>
  <body>
    <header>
      <div>
        <?php if (is_front_page()): ?>
          <h1><?php bloginfo('name'); ?></h1>
        <?php else: ?>
          <a href="/"><?php bloginfo('name'); ?></a>
        <?php endif; ?>
        <nav>
          <ul>
            <?php
              wp_nav_menu(array(
                'container' => '',
                'items_wrap' => '%3$s',
                'theme_location' => 'header-menu'
              ));
            ?>
          </ul>
        </nav>
      </div>
    </header>
