NVJS_Accordeon
==========

<!-- [![Greenkeeper badge](https://badges.greenkeeper.io/nolimits4web/Swiper.svg)](https://greenkeeper.io/) -->

NVJS_Accordeon - is the free and responsive script, which allow create Accordeon and control it

- **No dependencies**
- All modern browsers are supported
- Fully **responsive**

NVJS_Accordeon is not compatible with all platforms, because it used ES6. it is a modern menu which is focused only on modern apps/platforms to bring the best experience and simplicity.

## [Example on Codepen](https://codepen.io/r0mzes/pen/oaLXaP)

<!-- _Read documentation in other languages:_
[_Русский_](documentation/README.ru-Ru.md) -->

# Supported Browsers

 - Edge
 - Chrome
 - Safari
 - Mobile Safari
 - Android Default Browser

# API

API description is available on [API documentation](documentation/api.md).



# Get Started

## Include NVJS_Accordeon Files To Website/App

```html
<!DOCTYPE html>
<html lang="en">
<head>
    ...
    <link rel="stylesheet" href="path/to/NVJS_Accordeon.css">
</head>
<body>
    ...
    <script src="path/to/NVJS_Accordeon.js"></script>
</body>
</html>
```


## Add NVJS_Accordeon HTML Layout

```html
  <div class="accordeon">
    <div class="accordeon__area">
      <header class="accordeon__header">Title</header>
      <div class="accordeon__container">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque velit modi, asperiores commodi possimus dicta voluptates hic obcaecati autem omnis incidunt praesentium perspiciatis blanditiis eligendi reprehenderit mollitia harum id. Mollitia.</div>
    </div>
    <div class="accordeon__area">
      <header class="accordeon__header">Title</header>
      <div class="accordeon__container">Aspernatur fugit commodi odit molestias sed. Ex, hic omnis laborum harum ipsam quod possimus eligendi culpa laudantium eveniet aliquam ea nam necessitatibus? Facere blanditiis earum eum praesentium ipsum maxime optio!</div>
    </div>
    <div class="accordeon__area">
      <header class="accordeon__header">Title</header>
      <div class="accordeon__container">Praesentium a soluta dignissimos, illum numquam, dolor doloribus corporis eos repellendus dolore, dicta enim. Cumque sed sint vel dolore maiores odit, animi ratione, ipsum rem inventore qui tenetur earum sunt.</div>
    </div>
    <div class="accordeon__area">
      <header class="accordeon__header">Title</header>
      <div class="accordeon__container">Maxime aperiam doloribus vero quasi reiciendis quod at ad dicta, iste error nihil deserunt, aliquid, possimus dignissimos numquam accusamus incidunt. Provident veritatis autem cumque culpa facere dignissimos mollitia architecto similique.</div>
    </div>
    <div class="accordeon__area">
      <header class="accordeon__header">Title</header>
      <div class="accordeon__container">Ratione ipsam reiciendis quibusdam. Sed harum magni voluptatem, quia eaque dolorum facere perferendis at voluptates dolorem, alias blanditiis pariatur distinctio laudantium. Vero beatae maxime fugiat ex incidunt quis, laboriosam nisi!</div>
    </div>
  </div>
```

## Initialize NVJS_Accordeon

```js
    new NVJSAccordeon('.accordeon', {
      buttons: '.accordeon__header',
      buttonsActiveClass: 'active',
      blocks: '.accordeon__area',
      blockActiveClass: 'open'
    });
```


# Changelog

Changelog is available on [Changelog documentation](documentation/changelog.md).


# License

 NVJS_Accordeon is licensed [WTFPL](http://www.wtfpl.net/about/). You can use it **for free** and **without any attribution**, in any personal or commercial project. You may also fork the project and re-release it under another license you prefer.