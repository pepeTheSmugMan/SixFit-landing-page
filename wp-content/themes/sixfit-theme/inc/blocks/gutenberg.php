<?php

/**
 * Custom Gutenberg functions
 */

function theme_setup() {
    // add support for gutenberg
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');
    add_theme_support('editor-styles');

    // add css to editor
    add_editor_style('style.css');
}
add_action('after_setup_theme', 'theme_setup');

//add custom category
function add_custom_block_category($categories) {
    return array_merge(
        $categories,
        array(
            array(
                'slug'  => 'sixfit',
                'title' => __('sixfit block', 'sixfit'),
            ),
        )
    );
}
add_filter('block_categories_all', 'add_custom_block_category', 10, 1);

//change default colors of editor
function sixfit_gutenberg_default_colors()
{
    add_theme_support('editor-color-palette', array(
        array(
            'name' => 'White',
            'slug' => 'white',
            'color' => '#ffffff'
        ),
        array(
            'name' => 'Dark Indigo',
            'slug' => 'dark indigo',
            'color' => '#131732'
        ),
        array(
            'name' => 'Bright Indigo',
            'slug' => 'bright indigo',
            'color' => '#2c2e5a'
        )
    ));
}
sixfit_gutenberg_default_colors();

//register blocks
function enqueue_block_editor_assets() {
    wp_enqueue_script(
        'custom-blocks',
        get_template_directory_uri() . '/inc/blocks/build/index.js', // Path to compiled JS
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-block-editor'),
        null,
        true
    );
}
add_action('enqueue_block_editor_assets', 'enqueue_block_editor_assets');

