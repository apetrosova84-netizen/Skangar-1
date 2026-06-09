Что изменено в сайте

1. Формы больше не только показывают сообщение на странице: они отправляют данные в api/send-lead.php.
2. После успешной отправки срабатывают цели Яндекс.Метрики:
   - lead_request_form — отправка открытой формы заявки;
   - lead_catalog_bot — заявка на каталог через Telegram-бота.
3. Для кнопки перехода в Telegram-бот срабатывает цель click_telegram_bot.
4. Для открытия блоков форм срабатывают open_request_form и open_catalog_form.
5. React подключен в production-версии.
6. Добавлены базовые SEO/Open Graph meta-теги.

Важно по отправке заявок

Файл api/send-lead.php отправляет заявки на email timmetall@yandex.ru через mail() хостинга.
Если хотите получать заявки в Telegram, откройте api/send-lead.php и заполните:

const TELEGRAM_BOT_TOKEN = '';
const TELEGRAM_CHAT_ID = '';

Токен нельзя добавлять в frontend-файлы. Его нужно хранить только в PHP-файле на сервере.

Если сайт размещается на статическом хостинге без PHP, api/send-lead.php работать не будет. В этом случае нужен webhook/серверless-функция, и ссылку на него нужно указать в config.js в поле leadEndpoint.

Цели для Метрики

Создать как JavaScript-событие:
open_request_form
click_request_form
lead_request_form
open_catalog_form
click_get_catalog
lead_catalog_bot
click_telegram_bot
click_phone
click_email
click_whatsapp
click_telegram
