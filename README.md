Интересует только метод _clear

```js
  _clear() {
    // Вариант не рабочий, от автора ролика
    for (const child of this._element.children) {
      child.remove();
    }

    // Рабочие варианты
    // for (const child of Array.from(this._element.children)) {
    //   child.remove();
    // }
    // this._element.innerHTML = '';
  }

```