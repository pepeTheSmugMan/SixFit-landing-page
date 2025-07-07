<?php

/**
 * Custom Gutenberg functions
 */

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

function sixfit_gutenberg_blocks() {
    wp_register_script(
        'custom-cta-js',
        get_template_directory_uri() . '/inc/blocks/gutenberg-action-block.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ),
        filemtime( get_template_directory() . '/inc/blocks/gutenberg-action-block.js' ),
        true
    );

    register_block_type( 'sixfit/custom-cta', array(
        'editor_script' => 'custom-cta-js'
    ) );
}
sixfit_gutenberg_blocks();

