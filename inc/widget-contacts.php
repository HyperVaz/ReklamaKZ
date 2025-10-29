<?php
class RK_Widget_Contacts extends WP_Widget
{
    public function __construct()
    {
        parent::__construct('rk_widget_contacts', 'Виджет для вывода номера телефона', [
            'name' => 'Виджет для вывода номера телефона',
            'description' => 'Выводит текст для телефона'
        ]);
    }
    public function form($instance)
    {
        ?>
        <p>
            <label for="<?php echo $this->get_field_id('phone'); ?>">
                Введите текст
            </label>
            <input type="text" id=" <?php echo $this->get_field_id('id-phone'); ?>" name="<?php echo $this->get_field_name('phone'); ?>" value="<?php echo $instance['phone'] ?>" class='widefat'>
        </p>

        <?php
    }
    public function widget($args, $instance)
    {
        $tel_text = $instance['phone'];
        $pattern = '/[^+0-9]/';
        $tel = preg_replace($pattern, '', $tel_text);
        ?>
        <a href="tel: <?php echo $tel; ?>" class="">
            <?php echo $instance['phone'] ?>
        </a>
        <?php
    }
    public function update($new_instance, $old_instance)
    {
        return $new_instance;
    }
}

?>