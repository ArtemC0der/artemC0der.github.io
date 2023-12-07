<?php
/**
 * Основные параметры WordPress.
 *
 * Скрипт для создания wp-config.php использует этот файл в процессе установки.
 * Необязательно использовать веб-интерфейс, можно скопировать файл в "wp-config.php"
 * и заполнить значения вручную.
 *
 * Этот файл содержит следующие параметры:
 *
 * * Настройки базы данных
 * * Секретные ключи
 * * Префикс таблиц базы данных
 * * ABSPATH
 *
 * @link https://ru.wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Параметры базы данных: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define( 'DB_NAME', 'wordpress' );

/** Имя пользователя базы данных */
define( 'DB_USER', 'root' );

/** Пароль к базе данных */
define( 'DB_PASSWORD', '' );

/** Имя сервера базы данных */
define( 'DB_HOST', 'localhost' );

/** Кодировка базы данных для создания таблиц. */
define( 'DB_CHARSET', 'utf8mb4' );

/** Схема сопоставления. Не меняйте, если не уверены. */
define( 'DB_COLLATE', '' );

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу. Можно сгенерировать их с помощью
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}.
 *
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными.
 * Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'JiaTZt%m.k!md)!x9rK5$Tpa@f=x`!7*jeOHPdR$s-js19Qe8#uldT_}joL&lk>R' );
define( 'SECURE_AUTH_KEY',  '=(x).]Wve_Z/N)W;Tok7pgP]CF8H!8r[^PCJ8xvj*ZmoE&pP`,mhwgx%-;QlY<:{' );
define( 'LOGGED_IN_KEY',    'I>A=d2a~0~ucvbd!pi[NvE H[.J;^9k{G9U9>Xyt7&n=n{e0Gq`~}J;4$=t9OqwM' );
define( 'NONCE_KEY',        'B.#(/NO9ttj9Ql#!]:m>+S_EW^;3MkTimj/CZ!_zX.+(JZ)kl1ax4QJhhUO(<ky ' );
define( 'AUTH_SALT',        'uCjXA*3fMp:0ePBnWZ>v.*#}4I0A<qzBc2W=s}gCNGn4@1peHTpeW(nGx-|,>D8>' );
define( 'SECURE_AUTH_SALT', 'IhH@F31t_Zc/AZ-BAVZPyE?w0J^L}5pWa<FgooR2c*N|m2*vmLI)#NG9:So)WA]|' );
define( 'LOGGED_IN_SALT',   '551)[j~BV-@+oV!cct5N6/MY-md&Q?zWM$]/Jsq`7g)v|qBGt|t3T`(>Ea*O#C=s' );
define( 'NONCE_SALT',       'RX@ WTBkT}*za~lR2Uc9sMta7G2hm=5*cWAwsd{/0x/txrW>T<L5h[=(d7xi,[kA' );

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix = 'wp_1';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 *
 * Информацию о других отладочных константах можно найти в документации.
 *
 * @link https://ru.wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Произвольные значения добавляйте между этой строкой и надписью "дальше не редактируем". */



/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Инициализирует переменные WordPress и подключает файлы. */
require_once ABSPATH . 'wp-settings.php';

 define('COOKIE_DOMAIN', $_SERVER['HTTP_HOST'] );
/* That's all, stop editing! Happy blogging. */
