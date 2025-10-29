<?php
/**
 * Socials Widget
 */
//TODO: перепиши его под телегу нахуй
class Socials_Widget extends WP_Widget {

    // Конструктор виджета
    public function __construct() {
        parent::__construct(
            'socials_widget', // ID виджета
            __('Socials Widget', 'text_domain'), // Название виджета
            array('description' => __('A widget to display social media links', 'text_domain')) // Описание
        );
    }

    // Фронтенд виджета
    public function widget($args, $instance) {
        echo $args['before_widget'];

        // Получаем значения из админки
        $phone_number = !empty($instance['phone_number']) ? $instance['phone_number'] : '';
        $vk_link = !empty($instance['vk_link']) ? $instance['vk_link'] : '';

        // Удаляем все символы, кроме цифр, чтобы правильно сформировать ссылки
        $phone_number_digits = preg_replace('/[^0-9]/', '', $phone_number);

        // Выводим ссылки на соцсети
        ?>
        <div class="socials__items-box">
            <li class="socials__item">
                <a href="https://wa.me/<?php echo $phone_number_digits; ?>" target="_blank" rel="noopener noreferrer">
                    <img class="socials__img" src="<?= _rk_image_path('whatsapp-icon.svg') ?>" alt="Написать в WhatsApp">
                </a>
            </li>
            <li class="socials__item">
                <a href="viber://chat?number=<?php echo $phone_number_digits; ?>" target="_blank" rel="noopener noreferrer">
                    <img class="socials__img" src="<?= _rk_image_path('viber-icon.svg') ?>" alt="Написать в Viber">
                </a>
            </li>
            <li class="socials__item">
                <a href="https://t.me/<?php echo $phone_number_digits; ?>" target="_blank" rel="noopener noreferrer">
                    <img class="socials__img" src="<?= _rk_image_path('telegram-icon.svg') ?>" alt="Написать в Telegram">
                </a>
            </li>
            <li class="socials__item">
                <a href="<?php echo esc_url($vk_link); ?>" target="_blank" rel="noopener noreferrer">
                    <img class="socials__img" src="<?= _rk_image_path('vk-icon.svg') ?>" alt="Зайти на наш Вк">
                </a>
            </li>
        </div>
        <?php

        echo $args['after_widget'];
    }

    // Админка виджета
    public function form($instance) {
        $phone_number = !empty($instance['phone_number']) ? $instance['phone_number'] : '';
        $vk_link = !empty($instance['vk_link']) ? $instance['vk_link'] : '';
        ?>
        <p>
            <label for="<?php echo $this->get_field_id('phone_number'); ?>"><?php _e('Phone Number:'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('phone_number'); ?>" name="<?php echo $this->get_field_name('phone_number'); ?>" type="text" value="<?php echo esc_attr($phone_number); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('vk_link'); ?>"><?php _e('VK Link:'); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('vk_link'); ?>" name="<?php echo $this->get_field_name('vk_link'); ?>" type="text" value="<?php echo esc_attr($vk_link); ?>">
        </p>
        <?php
    }

    // Сохранение настроек виджета
    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['phone_number'] = (!empty($new_instance['phone_number'])) ? strip_tags($new_instance['phone_number']) : '';
        $instance['vk_link'] = (!empty($new_instance['vk_link'])) ? strip_tags($new_instance['vk_link']) : '';
        return $instance;
    }
}

