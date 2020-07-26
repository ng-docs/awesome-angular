# Angular Standard For 2020

# Angular 2020 编码标准

Here’s my first public airing of a recently reworked document for coding standards that I revise every year and share with all the teams I work with. It’s not just my views, I take all suggestions and criticisms. I’d welcome feedback so I can continue to improve this document.

这是我第一次公开刚重写过的关于编码标准的文档，我每年都会修改这些文档，并与我合作过的所有团队分享。这不仅是我自己的观点，还包括我收到的各种建议和批评。我非常欢迎反馈意见，以便继续改进此文档。

Hope you find it useful for your team.

希望它对你的团队有用。

## Project

## 项目

Use the [Angular CLI](https://cli.angular.io/).

使用 [Angular CLI](https://cli.angular.io/) 。

If using the Angular CLI, utilize **ng update** when possible.

如果使用 Angular CLI，请尽可能使用 **ng update** 。

Follow the [Angular Style Guide](https://angular.io/guide/styleguide), particularly the folder structure and naming conventions.

遵循 [Angular 风格指南](https://angular.io/guide/styleguide) ，特别是文件夹结构和命名约定。

Visual Studio Code is the recommended IDE.

推荐使用 Visual Studio Code 作为 IDE。

Use Prettier code formatter.

使用 Prettier 进行代码格式化。

Add **ng lint** as a build step on your pipeline; this will enforce many style guide rules on all developers and reduce bug opportunity.

在管道上添加 **lint** 作为构建步骤；这会对所有的开发者强制执行很多样式指南规则，减少出现 bug 的机会。

VS Code extensions: Use [John Papa’s Angular Essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials).

VS 代码扩展：使用 [John Papa 的 Angular Essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials) 。

The above link also contains John Papa’s recommended editor settings; for the sake of avoiding arguments, I recommend using them all.

上面的链接还包含 John Papa 推荐的编辑器设置；为了避免争吵，我建议全部采纳它们。

The Essentials extension above also includes the [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console). This simplifies CLI operations and should be used for complex scaffolding operations.

上面的 Essentials 扩展还包括 [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) 。这简化了 CLI 操作，在复杂的脚手架操作中应该用它。

Use [Nrwl Nx](https://nx.dev/) workspaces for enterprise tooling and schematics (an augmentation of Angular CLI) to promote structural separation and best practices. A lot of people think Nx is only for monorepos or large apps, it’s not; it should be used on almost any serious project, just for the improved tooling.

将 [Nrwl Nx](https://nx.dev/) 工作空间用于企业工具和原理图（Angular CLI 的扩充），以促进结构分离和最佳实践。很多人认为 Nx 只适用于 monorepos（单一代码仓）或大型应用，但事实并非如此。它应该用在几乎任何一个认真的项目中，只是为了改进工具体验。

When using an Nx workspace, work towards using [Enterprise Angular Monorepo Patterns](https://go.nrwl.io/angular-enterprise-monorepo-patterns-new-book). This will break code up into well architected, shareable-code patterns and contain and isolate areas of legacy complexity. [Other patterns are available](https://www.angulararchitects.io/en/konferenzen/sustainable-angular-architectures-with-nx-and-strategic-design-3/); choose one and stick to it for the entire enterprise.

在使用 Nx 工作空间时，要努力使 用[企业 Angular 单一仓库模式](https://go.nrwl.io/angular-enterprise-monorepo-patterns-new-book) 。这样就可以把代码分解成架构好的，可共享的代码模式，并且包含与隔离传统复杂性领域。 还有[其他模式可供选择](https://www.angulararchitects.io/en/konferenzen/sustainable-angular-architectures-with-nx-and-strategic-design-3/)；总之，选择一个并坚持下去，为整个企业服务。

Nx also gives you Cypress e2e testing out of the box. Use this to give you code coverage where you’ve been naughty and not added unit tests. Also use it to test Storybook ui components in isolation (for which there is an [Nx plugin](https://nx.dev/angular/plugins/storybook/overview))

Nx 还能为您提供开箱即用的 Cypress e2e 测试。用它可以让你在代码覆盖的地方玩耍而不必添加单元测试。也可以用它来单独测试 Storybook 的 ui 组件（这里有一个[Nx 插件](https://nx.dev/angular/plugins/storybook/overview) ）

Write unit tests as you develop (or before; TDD) - they’ll always be better quality than writing them later.

在开发过程中（或之前，如果你用的是 TDD）来编写单元测试 - 它们的质量始终比以后再编写它们更好。

## Typescript

Make use of Typescript’s advanced features when possible. ES6 and ES7 commands means less code, and clearer intent.

尽可能使用 Typescript 的高级功能。 ES6 和 ES7 的命令意味着代码更少，意图更清晰。

Never use type **any** or infer it by not defining the type for an unassigned variable definition — unless in a very rare exception, you’re forced to. In which case, you should comment why. This is because **any** creates enormous bug opportunity. There are lint rules you can turn on to enforce this.

永远不要使用类型 **any** 或对未赋值过的变量定义使用类型推断 - 除非在一个非常罕见的例外中，你被迫如此。在这种情况下，你应该注释其原因。这是因为 **any** 会造成巨大的 bug 机会。你可以使用 lint 规则来强制执行此操作。

## Angular

Utilize Component Architecture and Feature Modules.

充分利用组件架构和特性模块。

Lazy load resources whenever possible

尽可能延迟加载资源

### About Component Architecture:

### 关于组件架构：

*   Smart / Container Components: Communicate with Services and render child components

  智能组件/容器组件：与服务通信并渲染子组件

*   Dumb / Presentation Components: Accepts data via inputs Emit data change via event outputs

  哑组件/展现组件：通过 Input 接受数据，通过 Output 发送数据变更

*   Data flows down and Events emit up.

  数据流向下，事件流向上。

*   One-way dataflow promotes reusable components and can increase performance

  单向数据流可以推动组件复用，并且可以提高性能

*   There are always occasional exceptions to this rule. When you have nested dumb components, it can be more efficient to have a component service provided on the top-most dumb component that the children can use to share and communicate ui state changes via the top-most emitter. (John Papa suggested this pattern to me)

  此规则偶尔会出现例外。当你拥有嵌套的哑组件时，在最顶层的哑组件中提供一个组件服务会更有效，子组件们可以共享状态，并通过最顶层的发射器来通报 ui 状态的变化。（John Papa 向我建议了这种模式）

Use [OnPush Change Detection Strategy](https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4) with Dumb / Presentation Components wherever possible.

尽可能在哑组件/展示组件中使用 [OnPush 变更检测策略](https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4)。

Avoid doing much in the constructor of a component. Utilize the lifecycle hooks e.g. **ngOnInit** for variable initial value assignment.

避免在组件的构造函数中做很多事。利用生命周期钩子（例如 **ngOnInit** ）来为变量赋初始值。

Use [Component-provided](https://angular.io/guide/architecture-services#providing-services) Services to lift functional complexity out of all components and make it more easily testable. This means your component should contain the minimum code possible without passing the ‘**this**’ context into the service.

使用[在组件级提供的](https://angular.cn/guide/architecture-services#providing-services)服务，可以降低所有组件的功能复杂性，让它更容易测试。这意味着你的组件应尽可能包含最小代码，而不必将 `**this**` 上下文传递给服务。

Use **trackBy** option on the **\*ngFor** directive — “[Angular 2 — Improve performance with trackBy](https://netbasal.com/angular-2-improve-performance-with-trackby-cc147b5104e5)”

在 **\*ngFor** 指令上使用 **trackBy** 选项 - “[Angular 2 - 用 trackBy 提高性能](https://netbasal.com/angular-2-improve-performance-with-trackby-cc147b5104e5)”

Use [Virtual Scroll](https://material.angular.io/cdk/scrolling/overview) when lists get long

当列表变长时，使用[虚拟滚动](https://material.angular.io/cdk/scrolling/overview)

Add wildcard routes for 404 handling

为 404 处理添加通配符路由

Use Environment Variables when you have to change values for dev or prod

当需要更改 dev 或 prod 环境中的值时，请使用环境变量(environment.ts)

Gotcha: In version 10, classes that use Angular features and do not have an Angular decorator are no longer supported.

注意坑：在版本 10 中，不再支持那些使用了 Angular 特性却不带 Angular 装饰器的类。

## RxJS

Use **Async** **Pipe** as much as possible — it reduces boilerplate. But if you can’t, remember to unsubscribe any observables that may still be running in **ngOnDestroy,** so use [@ngneat/until-destroy](https://www.npmjs.com/package/@ngneat/until-destroy).

尽可能使用 **Async** **管道** - 它减少了样板代码。但是，如果你常常忘记在 **ngOnDestroy** 中取消订阅任何可能仍在运行的可观察对象，就使用 [@ngneat/until-destroy](https://www.npmjs.com/package/@ngneat/until-destroy)。

See [Strongbrew RxJS best practices in Angular](https://blog.strongbrew.io/rxjs-best-practices-in-angular/).

参见 [Strongbrew 上的Angular 中的 RxJS 最佳实践](https://blog.strongbrew.io/rxjs-best-practices-in-angular/) 。

Gotcha: remember multiple Async pipes for the same API request (or any Cold Observable) will trigger the observable afresh on each pipe; so it will call an API multiple times.

坑：记住发起同一个 API 请求（或任何 Cold Observable）的多个 Async 管道会在每个管道上都重新触发这个可观察对象。所以它会调用 API 很多次。

## State Management

## 状态管理

Use NgRx — now that it’s the recommended state management tool for Angular

使用 NgRx - 现在它是 Angular 推荐的状态管理工具

Always create a lot of Actions. Use them as specific event labels, rather than utility commands. See [Good Action Hygiene with NgRx — Mike Ryan](https://www.youtube.com/watch?v=JmnsEvoy-gY#action=share).

总是创造很多动作。把它们用作特定的事件标签，而非实用命令。参见 [NgRx 的卫生好习惯 - Mike Ryan](https://www.youtube.com/watch?v=JmnsEvoy-gY#action=share) 。

Create a State feature for each feature module. This helps reduce massive lists of actions inside one Domain state tree.

为每个特性模块创建一个状态特性。这有助于在一个 Domain 状态树中减少大量的动作列表。

Wherever you have arrays (or tables) of records to store in the application state tree, and you often focus actions on a ‘selected’ record in the array/table, don’t use arrays! Use [@ngrx/entity](https://ngrx.io/guide/entity). The benefits of reduced boilerplate, reduced bug-opportunity and improved performance outweigh the [learning curve](https://blog.angular-university.io/ngrx-entity/).

无论你想要在应用状态树中存储哪些记录数组（或表），并且你的主要操作都集中在数组/表中的“已选中”记录上，请不要使用数组！使用 [@ngrx/entity](https://ngrx.io/guide/entity)。其减少样板代码、减少错误机会和改善性能的好处超过了其[学习曲线](https://blog.angular-university.io/ngrx-entity/)。

In some cases, [@ngrx/data](https://ngrx.io/guide/data) can be used to replace [@ngrx/entity](https://ngrx.io/guide/entity) to reduce boilerplate still further.

在某些情况下，[@ngrx/data](https://ngrx.io/guide/data) 可以用来代替 [@ngrx/entity](https://ngrx.io/guide/entity)，以进一步减少样板代码。

## Code Management

## 代码管理

Use **git rebase [trunk]** on your feature branch regularly to avoid nasty merge conflicts.

定期在你的特性分支上使用 **git rebase [主干分支]** 来避免令人讨厌的合并冲突。

Use **git mv** when possible to move and rename files to avoid unnecessary noise in PRs.

尽可能使用 **git mv** 来移动和重命名文件，以免在 PR 中产生不必要的噪音。

Always run any tests available before merging a PR.

在合并 PR 之前，始终运行任何可用的测试。
