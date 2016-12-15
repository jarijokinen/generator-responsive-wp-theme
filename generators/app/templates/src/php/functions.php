<?php

define(THEME_SLUG, '<%= theme_slug %>');
load_theme_textdomain(THEME_SLUG, 'languages');

function custom_the_generator() {
  return '';
}
add_filter('the_generator', 'custom_the_generator');

function custom_document_title_separator() {
  return '|';
}
add_filter('document_title_separator', 'custom_document_title_separator');

function custom_document_title_parts($title) {
  return (is_home() || is_front_page()) ? array_reverse($title) : $title;
}
add_filter('document_title_parts', 'custom_document_title_parts');

function theme_after_setup_theme() {
  show_admin_bar(false);
  add_theme_support('title-tag');
  register_nav_menus(['header-menu' => __('Header Menu')]);
  remove_action('wp_head', 'feed_links_extra', 3);
  remove_action('wp_head', 'feed_links', 2);
  remove_action('wp_head', 'rel_canonical');
  remove_action('wp_head', 'wp_shortlink_wp_head');
  remove_action('wp_head', 'rest_output_link_wp_head');
  remove_action('wp_head', 'wp_oembed_add_discovery_links');
  remove_action('wp_head', 'rsd_link');
  remove_action('wp_head', 'wlwmanifest_link');
  remove_action('wp_head', 'index_rel_link');
  remove_action('wp_head', 'wp_generator');
  remove_action('wp_head', 'print_emoji_detection_script', 7);
  remove_action('wp_head', 'wp_resource_hints', 2);
  remove_action('admin_print_styles', 'print_emoji_styles');
  remove_action('admin_print_scripts', 'print_emoji_detection_script');
  remove_action('wp_print_styles', 'print_emoji_styles');
  remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
  remove_filter('the_content_feed', 'wp_staticize_emoji');
  remove_filter('comment_text_rss', 'wp_staticize_emoji');
}
add_action('after_setup_theme', 'theme_after_setup_theme');

function theme_enqueue_scripts() {
  wp_enqueue_style(THEME_SLUG, get_stylesheet_uri(), null, null);
  wp_enqueue_script(THEME_SLUG,
    get_template_directory_uri() . '/js/' . THEME_SLUG . '.js',
    null, '1', true);
}
add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');

?>
