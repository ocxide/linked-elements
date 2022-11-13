# LinkedElements

LinkedElements is an angular library for link elements within a page (eg. sections, comments, articles, ect).

## Getting Started

Import the default module within your module

**my-module.component.ts**
```ts
import { LinkedElementsModule } from 'ngx-linked-elements';
import { MyComponent } from './my-component.component';

@NgModule({
    declarations: [MyComponent],
    imports: [LinkedElementsModule],
})
export class MyModule {}
```

Then, you will need to register the **LinkedElementsService** within your component.

**my-component.component.ts**
```ts
import { LinkedElementsService } from 'ngx-linked-elements';

@Component({
    ...,
    templateUrl: 'my-component.component.html',
    providers: [LinkedElementsService, ...]
})
export class MyComponent {}
```

Now you are ready to define linked elements and link triggers

### Click based links

**my-component.component.html**
```html
<button ngxLinkTo="section-1">I am a link to section 1</button>
<button ngxLinkTo="section-2">I am a link to section 2</button>

<section ngxLinkedElement="section-1" style="height: 500px;">
    <h3>Section 1</h3>
    <p>...</p>
</section>
<section ngxLinkedElement="section-2" style="height: 500px;">
    <h3>Section 2</h3>
</section>
```

You can have multiple links for the same linked element but just one linked element register with the same name
```html
<button ngxLinkTo="article-1">I am a link to article-1</button>
<button ngxLinkTo="article-1">I am a link to article-1 too!</button>

<article ngxLinkedElement="article-1" style="height: 200px;">
    <span>...</span>
</article>
```

### Route based links

You can define linked elements and scroll to them based on the route.

First, you will have to provide the **LinkedElementsFragmentsRouterService** within your component.

**my-component.component.ts**
```ts
import { LinkedElementsService, LinkedElementsFragmentsRouterService } from 'ngx-linked-elements';

@Component({
    ...,
    templateUrl: 'my-component.component.html',
    providers: [LinkedElementsService, LinkedElementsFragmentsRouterService]
})
export class MyComponent {}
```

Now, each time that the fragment route changes, the document will scroll to the matched LinkedElement.

```html
<a routerLink="" fragment="section-1">I am a link to article-1<a>

<section ngxLinkedElement="section-1" style="height: 500px;margin-top: 100vh;">
    <h3>Section 1</h3>
    <p>...</p>
</section>
```


## Advanced

Most of the features of the library are highly customizable and can be overwritted by providing the tokens withing your module.

So, most of the directives are [standalone](https://angular.io/guide/standalone-components) so you can import them separaretly.

Also, the **LinkedElementsModule** is just a wrapper for the default providers and directives.

### Changing the scroll strategy

You could change the scroll strategies by providing the token and a class that implements the **BaseScrollStrategy**.

For example, you could want to change the way that the first scroll is made.

**my-module.component.ts**
```ts
import { 
    LinkedElementDirective, 
    LinkToDirective,
    PrimaryScrollStrategy,
    SecondaryScrollStrategy
    SmoothScrollStrategy,
} from 'ngx-linked-elements';
import { MyComponent } from './my-component.component';

@NgModule({
    ...
    imports: [
        ...,
        LinkedElementDirective, 
        LinkToDirective,
        ...
    ],
    providers: [
        ...,
        { provide: PrimaryScrollStrategy, useClass: SmoothScrollStrategy },
        { provide: SecondaryScrollStrategy, useClass: SmoothScrollStrategy }
    ]
})
export class MyModule {}
```

**PrimaryScrollStrategy** represents the principal strategy used to scroll when the route changes or an **LinkToDirective** is clicked.

**SecondaryScrollStrategy** represents the secondary strategy used at the page load.

**SmoothScrollStrategy** is the strategy that scrolls slowly and smoothly to a given **LinkedElement**.

This provider configuration will make it scrolls scroll smoothly to the route matched **LinkedElement** at the page load and each time a route changes or an **LinkToDirective** is clicked.