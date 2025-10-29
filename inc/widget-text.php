<?php

class RK_Widget_Text extends WP_Widget
{
    public function __construct()
    {
        parent::__construct('rk_widget_text', 'Текстовый Виджет', [
            'name' => 'Текстовый Виджет',
            'description' => 'Выводит простой текст без верстки'
        ]);
    }

    public function form($instance)
    {
        ?>
        <p>
            <label for="<?php echo $this->get_field_id('text'); ?>">
                Введите текст
            </label>
            <textarea id=" <?php echo $this->get_field_id('id-text'); ?>" name="<?php echo $this->get_field_name('text'); ?>" value="<?php echo $instance['text'] ?>" class='widefat'></textarea>
        </p>
        <?php

    }

    public function widget($args, $instance)
    {
        echo nl2br($instance['text']);
    }
    public function update($new_instance, $old_instance)
    {
        return $new_instance;
    }
}

?>