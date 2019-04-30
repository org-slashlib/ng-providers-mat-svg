## angular scalable vector graphics (svg) provider ##

Provides inline scalable vector graphics for @angular/material projects.

This projects SVG graphics are provided by:
* https://material.io/tools/icons/?style=baseline ([Apache License V. 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt))<br />
  https://github.com/google/material-design-icons/

## building the library ##

* Browse https://github.com/org-slashlib/ng-project-template and download (no fork required!) a zip/tar of the the project template.
* Run <code> npm install </code> in the project template folder.
* Download or fork this project and link it into the templates subfolder.
* Run: <code> grunt </code>
* Change to build directory: <code> cd build </code>
* Call <code> ng build </code>
* Change to dist directory: <code> npm pack </code>
* <code> npm install path/to/@org.slashlib-ng-providers-mat-svg-<version>.tgz</code>

## installing ##

This guide assumes, that you are familiar with the use of npm.  

Download <code>org.slashlib-ng-services-svg-&lt;version&gt;.tgz</code> or

<code>npm install @org.slashlib/ng-services-svg --save-dev</code>

## usage ##

Add the following lines to your app module.

```javascript
import { LocalSVGProvider }           from "@org.slashlib/ng-providers-mat-svg";
import { svgProviderFactory }         from "@org.slashlib/ng-providers-mat-svg";

@NgModule({
  imports:      [ ... ],
  declarations: [ ... ],
  providers:    [
    LocalSVGProvider,                 // inline loading of svg (icons))
    { provide:    APP_INITIALIZER,
      useFactory: svgProviderFactory,
      deps:       [LocalSVGProvider],
      multi:      true }              // load svg (icons) on app start
  ],
  bootstrap:    [ ... ]
})
export class AppModule { }

```

In your components html, you can now use all icons provided in
version 2.2.0 of https://material.io/tools/icons/?style=baseline

```html
<mat-icon svgIcon="svg_icon_name"></mat-icon>
```
