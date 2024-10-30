# Logger configuration

```snet-daemon``` uses [zap](https://github.com/uber-go/zap) log
library. Logger configuration is a set of properties in ```log``` section in config file.

* **log** - log configuration section

    * **level** (default: info) - log level. Possible values are:
        * debug
        * info
        * warn
        * error
        * fatal
        * panic

    * **timezone** (default: UTC) - timezone to format timestamps and log
      file names. It should be name of the time.Location, see
      [time.LoadLocation](https://golang.org/pkg/time/#LoadLocation).

    * **formatter** - set of properties with ```log.formatter.``` prefix
      describes logger formatter configuration.

        * **type** (default: text) - type of the log formatter. Two types are
          supported, which correspond to ```zap``` formatter types:
            * json
            * text

        * **timestamp_format** (default:  "2006-01-02T15:04:05.999Z07:00") -
          timestamp format to use in log lines, standard time.Time formats are
          supported, see [time.Time.Format](https://golang.org/pkg/time/#Time.Format)

    * **output** - set of properties with ```log.output.``` prefix describes
      logger output configuration.

        * **type** (default: file & stdout) - type of the logger output. You can specify one or several values at the same time by using an array [(examples are provided below)](#examples). Types are
          supported:
            * file -
              [lumberjack](https://github.com/natefinch/lumberjack)
              output which supports log rotation
            * stdout - os.Stdout
            * stderr - os.Stderr

        * **file_pattern** (default: ./snet-daemon.%Y%m%d.log) - log file name
          which may include date/time patterns in ```strftime (3)``` format. Time
          and date in file name are necessary to support log rotation.

        * **current_link** (default: ./snet-daemon.log) - link to the latest log
          file.

        * **max_size_in_mb** (default: 10 Mb) - max size of current log file in megabytes.

        * **max_age_in_days** (default: 7 days) - number of days since
          last modification time before log file is removed.

        * **rotation_count** (default: 0 (disabled)) - max number of rotation
          files. When number of log files becomes greater then oldest log file is
          removed.

    * **hooks** (optional, default empty) - list of names of the hooks which will be executed
      when message with specified log level appears in log. List contains names of
      the hooks and hook configuration can be found by name prefix. Thus for
      hook named ```<hook-name>``` properties will start from
      ```log.<hook-name>.``` prefix.

    * **```<hook-name>```** - configuration of log hook with `<hook-name>` name

        * **type** (required always) - Type of the hook. This type is used to find actual
          hook implementation. Hook types supported: 
      
          1) `email`  
          2) `telegram_bot` 

        * **levels** (required always) - list of log levels to trigger the hook.

        Next are the parameters depending on the type of hook:

        #### Email hook configuration

        For hook type `email`. Its configuration should contain all the properties which are required to send email:

        * **host** (required) - host of mail server.
        * **port** (required) - port of mail server.
        * **from** (required) - the mail from which the logs will be sent.
        * **to** (required) - the mail to which the logs will be sent.
        * **username** (required) - username is often equal to **from**.
        * **password** (required) - password (to send from a Google account, you will need to create the special "app password").
        * **application_name** (optional, default empty) - for smtp auth.

        #### Telegram bot hook configuration

        For hook type `telegram_bot`:

        * **telegram_api_key** (required) - api key of your telegram bot.
        * **telegram_chat_id** (required) - the chat id to which the logs will be sent.
        * **disable_notification** (optional, default `false`) - if `true`, the bot will send the message silently.

## Examples

**Simple configuration with logs output both to the console and to a file in JSON format**

```json
"log": {
   "formatter": {
      "type": "json"
   },
   "output": {
      "type": ["file", "stdout"]
   },
}
```

**Logger configuration with text format in file**

```json
"log": {
   "formatter": {
   "timestamp_format": "2006-01-02T15:04:05.999Z07:00",
   "type": "text"
},
"level": "info",
"output": {
   "current_link": "./snet-daemon.log",
   "file_pattern": "./snet-daemon.%Y%m%d.log",
   "max_age_in_days": 1,
   "rotation_count": 0,
   "max_size_in_mb": 300,
   "type": "file"
},
"timezone": "UTC"
}
```

### Email hook configuration

```json
  "log": {
   "hooks": ["send-mail"],
   "send-mail": {
      "type": "email",
      "levels": ["error", "warn", "fatal", "panic"],
      "application_name": "test-application-name",
      "host": "smtp.gmail.com",
      "port": 587,
      "from": "from-user@gmail.com",
      "to": "to-user@gmail.com",
      "username": "from-user@gmail.com",
      "password": "secret"
   },
}
```

### Telegram bot hook configuration

```json
"log": {
   "hooks":["tg"],
   "tg": {
      "telegram_api_key": "7258436600:AAFlAm8gIGIyOTEv7lb8ipHcuB7YTR9-TuR",
      "telegram_chat_id": -4113253950,
      "disable_notification": false,
      "type": "telegram_bot",
      "levels": [ "fatal", "panic"]
    },
}
```