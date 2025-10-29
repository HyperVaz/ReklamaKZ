<?php
add_action('after_setup_theme', 'rk_setup');
function rk_setup()
{
    add_theme_support('custom-logo');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}

add_action('wp_enqueue_scripts', 'rk_scripts_styles');
function rk_scripts_styles()
{
    wp_enqueue_script('main_script', get_template_directory_uri() . '/js/main.js', true);
    wp_enqueue_script('animations_script', get_template_directory_uri() . '/js/animations.js', ['main_script'], true);
    wp_enqueue_script('gallery_script', get_template_directory_uri() . '/js/gallery.js', ['main_script'], true);
    wp_enqueue_script('mobileMenu_script', get_template_directory_uri() . '/js/mobileMenu.js', ['main_script'], true);
    wp_enqueue_script('projectModal_script', get_template_directory_uri() . '/js/projectModal.js', ['main_script'], true);
    wp_enqueue_script('ripple_script', get_template_directory_uri() . '/js/ripple.js', ['main_script'], true);

//    wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-3.6.3.min.js', [], '3.6.3', true);
//    wp_enqueue_script('main_script', get_template_directory_uri() . '/assets/js/main.js', ['jquery'], '1.5', true);


    wp_enqueue_style('style.css', get_template_directory_uri() . '/style.css', [], '1.0', 'all');

    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('bodhi-svgs-attachmetnt');
    wp_dequeue_style('wp-embed');
    wp_dequeue_script('wp-embed');
}

function _rk_image_path($path)
{
    return get_template_directory_uri() . '/images/' . $path;
}

add_action('widgets_init', 'rk_register');

$widgets = [
    'widget-text.php',
    'widget-contacts.php',
    'widget-socials.php'
];

foreach ($widgets as $widget) {
    require_once(__DIR__ . '/inc/' . $widget);
}
function rk_register()
{
    register_sidebar([
        'name' => 'Сайдбар телефона в шапке',
        'id' => 'rk-header-telephone',
        'before_widget' => null,
        'after_widget' => null
    ]);
    register_sidebar([
        'name' => 'Сайдбар графика работы в шапке',
        'id' => 'rk-header-graphic',
        'before_widget' => null,
        'after_widget' => null
    ]);
    register_sidebar([
        'name' => 'Сайдбар адреса телеграмма в шапке',
        'id' => 'rk-header-telegram',
        'before_widget' => null,
        'after_widget' => null
    ]);
    register_widget('pc_widget_text');
    register_widget('pc_widget_contacts');
    register_widget('pc_widget_socials');
};