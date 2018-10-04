# API

## Initialize NVJS_Accordeon

``` js
// initialize accordeon:
new NVJS_Accordeon()

// initialize accordeon with options:
new NVJS_Accordeon(accordeonContainer, parameters, logErrors);
```

- `accordeonContainer` - string (with CSS Selector) of NVJS_Accordeon container HTML element. Required`;
- `parameters` - object with parameters. Required;
- `logErrors` - boolean - which allow to log all Errors and Warnings in console, if it's `true`. Optional. On default `false`.


## NVJS_Accordeon Parameters


**example:**
``` js
new NVJS_Accordeon({
    buttons: '.accordeon__header',
    buttonsActiveClass: 'active'
})
``` 

> **`buttons`** \
> Used for `show content` of block on click this elements. \
> **type**  `CSS Selector`

> **`buttonsActiveClass`** \
> CSS class name added to header (buttons) elements when it becomes opened \
> **type**  `String`

> **`blocks`** \
> String with accordeon shown block CSS Selector \
> **type**  `CSS Selector`

> **`blockActiveClass`** \
> CSS class name added to block elements when it becomes opened \
> **type**  `String`

> **`autoInitialize`** \
> Whether NVJS_Accordeon should be initialised automatically when you create an instance. If disabled, then you need to init it manually by calling myaccordeon.initialize() \
> **type**  `Boolean`\
> **default**  `true`

## NVJS_Accordeon Methods & Properties

**example:**

``` js
    let myaccordeon = new NVJS_Accordeon();
    myaccordeon.open();
```

> **`.initialize();`** \
> Initialize NVJS_Accordeon if autoinitialize false in config 

## Events

**example:**

``` js
    let myAccordeon = new NVJSAccordeon('.accordeon', {
      buttons: '.accordeon__header',
      buttonsActiveClass: 'active',
      blocks: '.accordeon__area',
      blockActiveClass: 'open'
    });
    myAccordeon.accordeon(addEventListener('toggle', () => {console.log('accordeon toggle')}))
```

> **`initialize`** \
> When accordeon initialized

> **`toggle`** \
> When some block of accordeonchange statement
