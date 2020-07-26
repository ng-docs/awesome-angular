Here’s my first public airing of a recently reworked document for coding standards that I revise every year and share with all the teams I work with. It’s not just my views, I take all suggestions and criticisms. I’d welcome feedback so I can continue to improve this document.

Hope you find it useful for your team.

# Project

Use the [Angular CLI](https://cli.angular.io/).

If using the Angular CLI, utilize **ng update** when possible.

Follow the [Angular Style Guide](https://angular.io/guide/styleguide), particularly the folder structure and naming conventions.

Visual Studio Code is the recommended IDE.

Use Prettier code formatter.

Add **ng lint** as a build step on your pipeline; this will enforce many style guide rules on all developers and reduce bug opportunity.

VS Code extensions: Use [John Papa’s Angular Essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials).

The above link also contains John Papa’s recommended editor settings; for the sake of avoiding arguments, I recommend using them all.

The Essentials extension above also includes the [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console). This simplifies CLI operations and should be used for complex scaffolding operations.

Use [Nrwl Nx](https://nx.dev/) workspaces for enterprise tooling and schematics (an augmentation of Angular CLI) to promote structural separation and best practices. A lot of people think Nx is only for monorepos or large apps, it’s not; it should be used on almost any serious project, just for the improved tooling.

When using an Nx workspace, work towards using [Enterprise Angular Monorepo Patterns](https://go.nrwl.io/angular-enterprise-monorepo-patterns-new-book). This will break code up into well architected, shareable-code patterns and contain and isolate areas of legacy complexity. [Other patterns are available](https://www.angulararchitects.io/en/konferenzen/sustainable-angular-architectures-with-nx-and-strategic-design-3/); choose one and stick to it for the entire enterprise.

Nx also gives you Cypress e2e testing out of the box. Use this to give you code coverage where you’ve been naughty and not added unit tests. Also use it to test Storybook ui components in isolation (for which there is an [Nx plugin](https://nx.dev/angular/plugins/storybook/overview))

Write unit tests as you develop (or before; TDD) - they’ll always be better quality than writing them later.

# Typescript

Make use of Typescript’s advanced features when possible. ES6 and ES7 commands means less code, and clearer intent.

Never use type **any** or infer it by not defining the type for an unassigned variable definition — unless in a very rare exception, you’re forced to. In which case, you should comment why. This is because **any** creates enormous bug opportunity. There are lint rules you can turn on to enforce this.

# Angular

Utilize Component Architecture and Feature Modules.

Lazy load resources whenever possible

## About Component Architecture:

*   Smart / Container Components: Communicate with Services and render child components
*   Dumb / Presentation Components: Accepts data via inputs Emit data change via event outputs
*   Data flows down and Events emit up.
*   One-way dataflow promotes reusable components and can increase performance
*   There are always occasional exceptions to this rule. When you have nested dumb components, it can be more efficient to have a component service provided on the top-most dumb component that the children can use to share and communicate ui state changes via the top-most emitter. (John Papa suggested this pattern to me)

Use [OnPush Change Detection Strategy](https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4) with Dumb / Presentation Components wherever possible.

Avoid doing much in the constructor of a component. Utilize the lifecycle hooks e.g. **ngOnInit** for variable initial value assignment.

Use [Component-provided](https://angular.io/guide/architecture-services#providing-services) Services to lift functional complexity out of all components and make it more easily testable. This means your component should contain the minimum code possible without passing the ‘**this**’ context into the service.

Use **trackBy** option on the ***ngFor** directive — “[Angular 2 — Improve performance with trackBy](https://netbasal.com/angular-2-improve-performance-with-trackby-cc147b5104e5)”

Use [Virtual Scroll](https://material.angular.io/cdk/scrolling/overview) when lists get long

Add wildcard routes for 404 handling

Use Environment Variables when you have to change values for dev or prod

Gotcha: In version 10, classes that use Angular features and do not have an Angular decorator are no longer supported.

# RxJS

Use **Async** **Pipe** as much as possible — it reduces boilerplate. But if you can’t, remember to unsubscribe any observables that may still be running in **ngOnDestroy,** so use [@ngneat/until-destroy](https://www.npmjs.com/package/@ngneat/until-destroy).

See [Strongbrew RxJS best practices in Angular](https://blog.strongbrew.io/rxjs-best-practices-in-angular/).

Gotcha: remember multiple Async pipes for the same API request (or any Cold Observable) will trigger the observable afresh on each pipe; so it will call an API multiple times.

# State Management

Use NgRx — now that it’s the recommended state management tool for Angular

Always create a lot of Actions. Use them as specific event labels, rather than utility commands. See [Good Action Hygiene with NgRx — Mike Ryan](https://www.youtube.com/watch?v=JmnsEvoy-gY#action=share).

Create a State feature for each feature module. This helps reduce massive lists of actions inside one Domain state tree.

Wherever you have arrays (or tables) of records to store in the application state tree, and you often focus actions on a ‘selected’ record in the array/table, don’t use arrays! Use [@ngrx/entity](https://ngrx.io/guide/entity). The benefits of reduced boilerplate, reduced bug-opportunity and improved performance outweigh the [learning curve](https://blog.angular-university.io/ngrx-entity/).

In some cases, [@ngrx/data](https://ngrx.io/guide/data) can be used to replace [@ngrx/entity](https://ngrx.io/guide/entity) to reduce boilerplate still further.

# Code Management

Use **git rebase [trunk]** on your feature branch regularly to avoid nasty merge conflicts.

Use **git mv** when possible to move and rename files to avoid unnecessary noise in PRs.

Always run any tests available before merging a PR.
