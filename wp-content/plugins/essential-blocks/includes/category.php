<?php

function block_categories($categories, $post)
{
    $eb_category = array(
        'slug' => 'essential-blocks',
        'title' => __('Essential Blocks', 'eb'),
    );
    $modifiedCategory[0] = $eb_category;
    $modifiedCategory = array_merge($modifiedCategory, $categories);
    return $modifiedCategory;

}
add_filter('block_categories', 'block_categories', 10, 2);
