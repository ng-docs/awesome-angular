# Version 9 of Angular Now Available — Project Ivy has arrived!

The 9.0.0 release of Angular is here! This is a major release that spans the entire platform, including the framework, Angular Material, and the CLI. This release switches applications to the [Ivy](https://angular.io/guide/ivy) compiler and runtime by default, and introduces improved ways of testing components.

<figure>

![](https://miro.medium.com/max/3200/0*4tkqVWVOl0dGjbO9)

</figure>

This is one of the biggest updates to Angular we’ve made in the past 3 years, and we’re excited for all of the ways it empowers developers to build better applications and contribute to the Angular ecosystem.

# How to update to version 9

Visit [update.angular.io](https://update.angular.io) for detailed information and guidance. To have the best update experience, we recommend you first update to the final release of Angular 8.

First, update to the latest version of 8

<pre><span>ng update @angular/cli@8 @angular/core@8</span></pre>

Then, update to 9

<pre><span>ng update @angular/cli @angular/core</span></pre>

To review the key changes with this update, including deprecated APIs, see [Updating to Angular version 9](https://v9.angular.io/guide/updating-to-version-9) in the Angular documentation.

# Ivy

Version 9 moves all applications to use the [Ivy compiler and runtime](https://v9.angular.io/guide/ivy) by default. In addition to hundreds of bug fixes, the Ivy compiler and runtime offers numerous advantages:

*   Smaller bundle sizes
*   Faster testing
*   Better debugging
*   Improved CSS class and style binding
*   Improved type checking
*   Improved build errors
*   Improved build times, enabling AOT on by default
*   Improved Internationalization

Here’s a breakdown of some of the more notable improvements.

# Smaller bundle sizes

The Ivy compiler has been designed to remove parts of Angular that aren’t being used via [tree-shaking](https://webpack.js.org/guides/tree-shaking/) and to generate less code for each Angular component.

With these improvements, small apps and large apps can see the most dramatic size savings.

*   Small apps that don’t use many Angular features can benefit most from tree-shaking.
*   Large apps with many components can benefit most from the reduced factory size.
*   Medium-sized apps should see bundle sizes that are on par or slightly smaller, since they benefit less from tree-shaking and don’t have enough components to truly leverage smaller factories.

<figure>

![](https://miro.medium.com/max/3200/0*7dSxEASiMazbMt7N)

<figcaption>Small apps could see around a 30% decrease in bundle size, large apps will see a 25–40% decrease, and medium apps decrease minimally.</figcaption>

</figure>

# Faster testing

We have also revamped the implementation of `[TestBed](https://angular.io/api/core/testing/TestBed)` in Ivy to make it more efficient.

Previously, `TestBed` would recompile all components between the running of each test, regardless of whether there were any changes made to components (for example, through overrides).

In Ivy, `TestBed` doesn’t recompile components between tests unless a component has been manually overridden, which allows it to avoid recompilation between the grand majority of tests.

With this change, the framework’s core acceptance tests are about 40% faster. We would expect users to see their own application test speeds to be around 40–50% faster.

# Better debugging

Ivy provides you with more tools to debug your applications. When running an application in Dev Mode with the Ivy runtime, we now offer the new `[ng](https://v9.angular.io/api/core/global)` [object for debugging](https://v9.angular.io/api/core/global).

*   You can ask Angular for access to instances of your components, directives, and more
*   You can manually call methods and update state
*   When you want to see the results of change detection, you can trigger change detection with `applyChanges`

<figure>

![](https://miro.medium.com/max/1164/0*RB_jqf6GCX-Ewq5V)

</figure>

Ivy also improves the stack trace for debugging issues such as the `ExpressionChangedAfterItHasBeenCheckedError`. Previously the stack trace could be unhelpful:

<figure>

![](https://miro.medium.com/max/3192/0*I4qPrPIXJi2yUj99)

</figure>

With Ivy, you see a more useful stack trace that allows you to jump directly to the template instruction with the expression that has changed.

<figure>

![](https://miro.medium.com/max/3036/0*QPhLwDCufQOOhRVo)

</figure>

For example, if you click on `AppComponent_Template` in the stack trace above, you can see the specific line in the generated code where the error is being thrown:

<figure>

![](https://miro.medium.com/max/3200/0*69sx5aAdQyJoGbqv)

</figure>

If you’re so inclined, you can also step into any of these framework instructions to walk through how the framework creates or updates your components.

# Improved CSS class and style binding

The Ivy compiler and runtime provides improvements for handling styles. Previously, if an application contained competing definitions for a style, those styles would destructively replace each other. With Ivy, the styles are merged in a predictable way.

Consider the following template and component snippets:

<figure>

<div><iframe src="https://blog.angular.io/media/eebd878c8eeb1f4a66e4b5048a2a1a70" allowfullscreen="" frameborder="0" height="80" width="680" title="snippet.html" scrolling="auto"></iframe></div>

</figure>

<figure>

<div><iframe src="https://blog.angular.io/media/5e3da6a82d530d7d665f8d76d6a6452b" allowfullscreen="" frameborder="0" height="351" width="680" title="snippet.ts" scrolling="auto"></iframe></div>

</figure>

Previously, whichever binding was evaluated last would win, and this could depend on the timing of changes to these expressions. If `myColor` and `myOtherColor` both were undefined, the static ‘red’ style would be ignored.

With version 9, you can manage your styles through a clear, consistent order of precedence that isn’t dependent on timing. The most specific styles always have the highest precedence. For example, a binding to `[style.color]` overrides a conflicting binding to `[style]`.

However, for backwards compatibility reasons, we have left `[ngStyle]` and `[ngClass]` bindings behavior the same as before. When their binding values are updated, the new values will override any competing bindings.

You can read more about styling precedence rules in the [Template Syntax guide](https://v9.angular.io/guide/template-syntax#styling-precedence) in the documentation.

As a side effect of the styling refactoring, you can now also bind to [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) (also known as CSS variables).

<figure>

<div><iframe src="https://blog.angular.io/media/66b492e125b315183ace725b5de7e2c6" allowfullscreen="" frameborder="0" height="109" width="680" title="custom-properties.html" scrolling="auto"></iframe></div>

</figure>

# Improved type checking

The Angular compiler can check more of the types of your application, and it can apply more strict rules. These features will help you and your team catch bugs earlier in the development process.

We support two main flags for additional type checks in addition to the default.:

*   `fullTemplateTypeCheck` — Activating this flag tells the compiler to check everything within your template (`ngIf`, `ngFor`, `ng-template`, etc)
*   `strictTemplates` — Activating this flag will apply the strictest Type System rules for type checking.

To learn more about template type checking options, see the [Template type checking guide](https://v9.angular.io/guide/template-typecheck) in the documentation.

# Improved build errors

The new Ivy compiler is not only faster and offers stronger type safety, it also makes all of the error messages easier to read.

In version 8 or View Engine, a typical compiler error would look like the following:

<figure>

![](https://miro.medium.com/max/2052/0*9MynS6_WDBlGkYqN)

</figure>

In version 9 with Ivy, the same error looks like:

<figure>

![](https://miro.medium.com/max/2056/0*Ag3LaCG6UVxNppq4)

</figure>

# Improved build times, enabling Ahead-of-Time compiler on by default

Thanks to Ivy’s new architecture, we’ve made significant improvements to the compiler’s performance.

We measure our compiler’s performance in terms of the _overhead_ on top of a plain TypeScript compilation of an application. For our documentation app (angular.io), this overhead decreased from 0.8x to 0.5x with Ivy, an improvement of nearly 40%.

These improvements mean that [AOT builds](https://angular.io/guide/aot-compiler) can be noticeably faster. Thanks to this speedup, for the first time ever we’re using AOT even for dev-mode builds. This means that ``ng serve`` now benefits from the same compile-time checking as production builds, significantly improving the developer experience for Angular.

Thanks to the changes in the compiler and runtime, we also no longer require `[entryComponents](https://v9.angular.io/guide/deprecations#entryComponents)`. These components will be discovered and compiled automatically by their usage.

# Improved internationalization (i18n)

Internationalization has been a core feature of Angular, where you could build your application once per locale and receive highly optimized and localized applications. In 9.0, we’re making this faster by moving the build-time i18n substitutions later in the build process. This change allowed us to make it up to 10 times faster.

[Read more](https://v9.angular.io/guide/i18n) about the new i18n: `@angular/localize` and the new `angular.json` configuration.

# Other improvements with version 9

The team has also been hard at work continuing to improve the full experience of using Angular.

# More reliable ng update

We’ve made some changes to how `ng update` works to make it more reliable and informative.

*   **Always use the latest CLI.** Starting with 8.3.19 of the CLI, we now use the CLI from the update TARGET version during updates. This means that, going forward, updates will always be handled by the latest CLI automatically.
*   **Clearer progress updates.** `ng update` now does more to tell you what is going on under the hood. For each migration, you’ll see information about the migration.
*   **Easier update debugging.** By default, `ng update` runs all of the migrations and leaves the aggregate changes on disk for you to inspect. The version 9 update also introduces the new `**--create-commits**` flag. When you run `ng update --create-commits`, the tool commits the state of your codebase after each migration, so you can step through and understand or debug the changes we are making to your code.

# New options for '`_providedIn'_`

When you create an `@Injectable` service in Angular, you must choose where it should be added to the injector. In addition to the previous `root` and module options, you have two additional options.

*   `platform`— Specifying `providedIn: 'platform'` makes the service available in a special singleton platform injector that is shared by all applications on the page.
*   `any`— Provides a unique instance in every module (including lazy modules) that injects the token.

[Learn more about providedIn](https://v9.angular.io/api/core/Injectable) in our API documentation.

# Component harnesses

Testing components has historically relied on using implementation details such as CSS selectors to find components and to trigger events. This meant that whenever a component library changed its implementation, all of the tests relying on those components would need to be updated.

In version 9, we are introducing _component harnesses_, which offer an alternative way to test components. By abstracting away the implementation details, you can make sure your unit tests are correctly scoped and less brittle.

Most of Angular Material’s components can now be tested via harnesses, and we are making harnesses available to any component author as part of the [Component Dev Kit](https://material.angular.io/cdk/categories) (CDK).

Here’s an example test before harnesses:

<figure>

<div><iframe src="https://blog.angular.io/media/ecba92926e72f27a8848131c34f1f142" allowfullscreen="" frameborder="0" height="351" width="680" title="test-before.ts" scrolling="auto"></iframe></div>

</figure>

And the same test with harnesses:

<figure>

<div><iframe src="https://blog.angular.io/media/eaaaaa0a220d9ae0e5e7ad4a410030ba" allowfullscreen="" frameborder="0" height="175" width="680" title="test-after.ts" scrolling="auto"></iframe></div>

</figure>

Learn more about [Material’s component harnesses](https://v9.material.angular.io/guide/using-component-harnesses) or [building your own](https://v9.material.angular.io/cdk/testing/overview) with the CDK.

# New components

You can now include capabilities from YouTube and Google Maps in your applications.

*   You can render a YouTube Player inline within your application with the new [youtube-player](https://github.com/angular/components/tree/master/src/youtube-player). After you load the YouTube IFrame player API, this component will take advantage of it.
*   We are also introducing [google-maps](https://github.com/angular/components/tree/master/src/google-maps) components. These components make it easy to render Google Maps, display markers, and wire up interactivity in a way that works like a normal Angular component, saving you from needing to learn the full [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial).

# IDE & language service improvements

<figure>

![](https://miro.medium.com/max/1280/1*EFcVVFKZKOshNNpJd9ot6g.gif)

<figcaption>Go to definition and improved Language Service demo</figcaption>

</figure>

Significant improvements have been made to the Angular language service [extension](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) on the Visual Studio Marketplace. Along with major architectural overhaul to address performance and stability issues, many long-standing bugs have also been fixed. Besides that, some new features include:

*   TextMate grammar for Angular Template Syntax, which now enables syntax highlighting in both inline and external templates
*   “Go to definition” for `templateUrl` and `styleUrls`
*   NgModule and type information in hover tooltip

# TypeScript 3.7 support

Angular has been updated to work with TypeScript 3.6 and 3.7, including the extremely popular [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) feature in TypeScript 3.7\. To stay in sync with the ecosystem, we’ve also updated our version of other ecosystem dependencies such as Zone.JS and RxJS.

# Thank you to the community

This release is the culmination of over 2 years of work. We’re really excited about the future and possibilities that this work opens up. This wouldn’t be possible without the work of hundreds of people in the community.

v9 Contributors:

Aaron Frost, Adam J. Penn, Adam Plumer, Adam Vigneaux, Adrien Crivelli, Ajit Singh, Alain Chautard, Alan Agius, Alexander Ivanov, Alexander von Weiss, Alex Eagle, Alex Rickabaugh, alexzuza, Ali Mirlou, Alison Gale, Alyssa Nicoll, Amadou Sall, AMarinov, Amit Dubey, Anders Kjær Damgaard, Andrew Kushnir, Andrew Scott, Andrew Seguin, Andrius, Andrus Diaz, Ankit Prajapati, Aravind, Aristeidis Bampakos, Arne Hoek, Artur Androsovych, arturovt, Atef Ben Ali, Ayaz Hafiz, Ben Elliott, Benjamin Liii, Brian Michalski, CaerusKaru, Carlos Ortiz García, Cédric Exbrayat, Charles Lyding, Christian Liebel, Christopher Dahm, codingnuclei, Colum Ferry, Craig Spence, cran-cg, crisbeto, Cyrille Tuzi, Daniele Morosinotto, Daniel Waxweiler, Danny Skoog, David Sánchez, David Shevitz, Denis Omelkov, Denys Vuika, Diego Juliao, dishanfernando, Dmitri Ischenko, Dominik Pieper, Do Nhu Vy, Doug Parker, Dyma, EddyP23, Edy Segura, Eliran Eliassy, Elvis Begovic, Emmanuel DEMEY, Ephraim, Erik Pintar, Esteban Gehring, Eusen, Evan Martin, FabianGosebrink, FaustmannChr, FDIM, Ferdinand Malcher, FG-33, Filipe Silva, Gabor Szekely, Gabriel Medeiros Coelho, GavinMK, Geoff Bass, George Kalpakas, Gérôme Grignon, ghiscoding, Girma Nigusse, Greg Magolan, Grigoriy Beziuk, hafiz, Harinder Singh, Hayouung, Hoel IRIS, horn, idzark, Igor Minar, Issei Horie, ivanwonder, Jakub Pawlot, James Vickery, Jan Malchert, Jason Bedard, Jeff Held, Jennifer Fell, Jeremy Elbourn, JiaLiPassion, Jithil P Ponnan, jnavb, Joakim Zebic, Joey Perrott, john li, John Ralph Umandal, Jonathan Sharpe, Joost Koehoorn, Jordan Amman, Jordan Nelson, Joshua Colvin, Judy Bogart, J Z, Kai Röder, Kapunahele Wong, Kara Erickson, katryo, Kayla Altepeter, Keen Yee Liau, ketangote, Kirk Larkin, Koala, Kristina Gocheva, kristinavavrova, Kristiyan Kostadinov, Kwinten Pisman, Kyle J. Kemp, Lars Gyrup Brink Nielsen, LASLEDJ, lazarljubenovic, Leonardo Zizzamia, Leon Radley, Luka Petrovic, Mansour Fall, manzonif, Mark Goho, Martina Kraus, Martin Probst, Matias Niemelä, Matthew Harris, Matt Janssen, Mayur Barge, mbehrlich, mertdeg2, Michael Maier, Michael Nahkies, Michael Prentice, Michał Koziara, Mike Brocchi, Mike Casebolt, mikef, Miles Malerba, Minko Gechev, Mirco Widmer, Misko Hevery, Miško Hevery, Mitchell Skaggs, mohax, Muhammad Umair, Muhammad Umair Khan, Nathan Tate, Németh Tamás, Nicolas Villanueva, Nikita Potapenko, Niklas Merz, noeri, Noopur, NothingEverHappens, ODAVING, Olegas Goncarovas, Olivier Combe, Orlando Pozo, owenmecham, Pascal Fivian, paulceli, Paul Gschwendtner, Pawel Kozlowski, Pete Bacon Darwin, Phaneendra, philonor, Pierre-Yves FARE, Piotr Błażejewicz, Potapy4, Rado Kirov, Ralf D. Müller, Raz Luvaton, Reuben Wilson, Richard Lea, Rick Katka, Robert Coie, Robin Dupret, Roy, Rudar Daman Singla, Rustam, Sachin, Sahan Serasinghe, Sam Julien, Santosh Yadav, Sasha Rudan, Sergey Koshechkin, Sergey Nikitin, Shibasish, Sholka Jadav, Showtim3, ShubhrankR, Simon Jespersen, Simon Kurtz, skrikl, Smartin, Sonu Kapoor, Srichandradeep Choudarapu, Sriram Jayarman, Stefanie Fluin, Stephen Cooper, Stephen Fluin, Suguru Inatomi, Suresh918, Syu Kato, thanhpd, thekiba, TheMushr00m, Tiep Phan, Timar, <mark>Tim Deschryver</mark>, TinyMan, Tom Kwong, Tom Sullivan, Trevor Karjanis, Troels Lenda, Turtuvshin Byambaa, Vanessa Schmitt, Victor, Vikash Dahiya, Vikram Subramanian, Wagner Maciel, Wataru Kasahara, Wenqi, why520crazy, willbeaufoy, William Lohan, WreckItRalph, Yann Bertrand, Younes Jaaidi, Yulia Tsareva, Zaid Al-Omari, zuckjet, 陈旭.

We would also like to thank our GDEs and the community at large. The feedback, issue reports, and reproductions we receive are essential to holding our work to the highest quality standards. There are already over 4000 public Angular apps using version 9.

Special thanks to our long term enterprise collaborator [Pawel Kozlowski](https://github.com/pkozlowski-opensource) and his sponsor [Amadeus](https://amadeus.com/). Pawel made a huge quantity of contributions with exceptional quality over the 2 years of the Ivy project that have been a critical part of the project’s success.

If you have feedback on this release, please [file an issue](https://github.com/angular/angular/issues/new/choose), or [let us know](https://twitter.com/angular)!
