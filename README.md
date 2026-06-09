# Nano Noty

**Nano-Noty** is a notification library that makes it easy to create **alert** - **success** - **error** - **warning** - **information** messages. Based on [Noty](https://ned.im/noty/), but only with the core features.

You can try it out [here](https://baupen.github.io/nano-noty/). Features include:
- Tiny and dependency-free
- Many types (`success`, `error`, ...), layouts (`topRight`, `bottomRight`, ...) and themes (`bootstrap`, `light`, ...)
- Timed notifications with a progress bar counting down
- Important notifications placed first in queue
- Custom themes and custom animations.


## Basic Usage

```js
import Noty from "noty";

new Noty({
  text: "Notification text"
}).show();

// or

const Noty = require("noty");

new Noty({
  text: "Notification text"
}).show();
```

## Docs

### Setting Default Theme

```javascript
// Set default theme to bootstrap-v5
Noty.overrideDefaults({
  theme: 'bootstrap-v5'
});
```


### Example 1: Success Notification with Timeout

A success message that automatically closes after 3 seconds with a progress bar.

```javascript
new Noty({
  text: 'Operation completed successfully!',
  type: 'success',
  timeout: 3000,
}).show();
```


### Example 2: Persistent Danger Notification

A danger notification that stays open until manually closed, displayed at the top of the queue.

```javascript
new Noty({
  text: 'Critical error occurred. Please contact support.',
  type: 'danger',
  timeout: false,
  first: true,
}).show();
```


---

## API Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `text` | `string` | `""` | The notification message text |
| `type` | `'alert' \| 'success' \| 'warning' \| 'error' \| 'info' \| 'information'` | `'alert'` | The notification type/style |
| `layout` | `'top' \| 'topLeft' \| 'topCenter' \| 'topRight' \| 'center' \| 'centerLeft' \| 'centerRight' \| 'bottom' \| 'bottomLeft' \| 'bottomCenter' \| 'bottomRight'` | `'topRight'` | Position where the notification appears |
| `theme` | `string` | `'boostrap-v5'` | Theme name (e.g., 'mint', 'relax', 'sunset', 'semanticui', 'bootstrap-v3', 'bootstrap-v4', 'bootstrap-v5') |
| `timeout` | `false \| number` | `false` | Duration in milliseconds before auto-close. Set to `false` to disable auto-close |
| `progressBar` | `boolean` | `false` | Show countdown progress bar (only works if `timeout` is a number) |
| `animation` | `object` | `{ open: null, close: null }` | Custom animation settings with `open` and `close` properties |
| `id` | `false \| string` | `false` | Unique identifier for the notification |
| `first` | `boolean` | `false` | Place notification at the top of the queue |
| `container` | `false \| string` | `false` | Custom container selector where notification will be appended |

---

## Instance Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `show()` | — | `void` | Display the notification |
| `close()` | — | `void` | Close the notification |
| `setText(text, override?)` | `text: string`, `override?: boolean` | `void` | Update notification text |
| `setType(type, override?)` | `type: Type`, `override?: boolean` | `void` | Change notification type |
| `setTimeout(ms)` | `ms: false \| number` | `Noty` | Set or clear timeout |
| `stop()` | — | `void` | Stop the timeout countdown |
| `resume()` | — | `void` | Resume the timeout countdown |

---

## Static Methods

| Method | Parameters | Description |
|--------|-----------|-------------|
| `Noty.closeAll()` | — | Close all active notifications |
| `Noty.setMaxVisible(max)` | `max: number` | Set maximum number of visible notifications at once |
| `Noty.overrideDefaults(options)` | `options: object` | Set default options for all new notifications |
