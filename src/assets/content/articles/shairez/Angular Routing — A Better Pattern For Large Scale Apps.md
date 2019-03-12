# Angular Routing — A Better Pattern For Large Scale Apps

# Angular Routing - 大规模应用的更好模式


[![Go to the profile of Shai Reznik](https://cdn-images-1.medium.com/fit/c/100/100/1*C2ZvPywplWjtVFvu2qDE-Q.jpeg)](https://medium.com/@shairez?source=post_header_lockup)

[![转到Shai Reznik的个人主页](https://cdn-images-1.medium.com/fit/c/100/100/1*C2ZvPywplWjtVFvu2qDE-Q.jpeg)](https://medium.com/@shairez?source=post_header_lockup)


[Shai Reznik](https://medium.com/@shairez)BlockedUnblockFollowFollowing

[Shai Reznik](https://medium.com/@shairez) BlockedUnblockFollow以下


Sep 21, 2018

2018年9月21日


It’s been a while since my last post because I’ve been busy cooking you people some pretty interesting Angular testing learning material.

自从我上一篇文章发表以来已经有一段时间了，因为我一直在忙着为人们烹饪一些非常有趣的Angular测试学习资料。


But today, I read the following tweet:

但今天，我读了下面的推文：


And it got me inspired to share my pattern of configuring routes in large scale Angular apps.

让我受到鼓舞，分享了在大型Angular应用中配置路由的模式。


Since the beginning, when I read the [Angular Routing](https://angular.io/guide/router) docs, and saw the “Routing Module” pattern suggestion, I was confused.

从一开始，当我读到[Angular Routing](https://angular.io/guide/router)文档时，就看到了“路由模块”的模式建议，我很困惑。


“Why do I need a separate module for routing?” I asked.

“为什么我需要一个单独的模块进行路由？”我问道。


Nobody answered because I was alone. 🙁

没人接，是因为我独自一人。 🙁


But then I said: “What the hell, let’s try it!” 😎

但后来我说：“到底是怎么回事，让我们来试试吧！”😎


And I started applying this pattern in one of the Angular 2 (yeah it was a while ago) apps I was beginning from scratch.

我开始在Angular 2中使用这种模式（是的，不久之前），这些应用就是从头开始的。


Some time went by, and the app grew.

一段时间过去了，应用越来越多了。


To keep things clean we started separating larger modules into smaller nested modules, but then, I started noticing a HUGE shortcoming when it came down to using nested routes.

为了保持清洁，我们开始把更大的模块拆分成更小的嵌套模块，但是当我开始使用嵌套路由时，我开始注意到一个巨大的缺点。


### Problem #1 — Redundant URL Prefixes

### 问题＃1 - 多余的URL前缀


Let’s say we have the following folder structure:

假设我们有以下文件夹结构：


    app/  app.module.ts  app.routing.module.ts  settings/    settings.module.ts    settings.routing.module.ts      account        account.module.ts        account.routing.module.ts          details            details.module.ts            details.routing.module.ts

Take `details.routing.module.ts` for example.

以`details.routing.module.ts`为例。


With the “Routing Module” approach we always begin our route URLs from the base URL.

通过“路由模块”的方法，我们总是从基本URL开始路由URL。


So every route in `details.routing.module.ts` will need to have the previous routes URLs (“settings/account” ) as its prefix:

因此， `details.routing.module.ts`所有路由都需要先前的路由URL（“settings / account”）作为前缀：


    details.routing.module.ts~~~~~~~~~~~~~~~~~~~~~~~~~

    @NgModule({

      imports: [

        RouterModule.forChild([

          {         path: 'settings/account/details',         component: DetailsComponent      },      {         path: 'settings/account/details/some-other-route',         component: SomeOtherComponent      }

        ])

      ],  declarations: [DetailsComponent, SomeOtherComponent]

      exports: [RouterModule]

    })

    export class DetailsRoutingModule{ }

#### “Why is that a problem Shai?”

#### “为什么这是沙伊的问题？”


BECAUSE…

因为......


for medium to large size apps, these routes will repeat themselves over and over again.

对于大中型应用来说，这些路由会一遍又一遍地重复着。


It could slow us down if we ever need to refactor parts of the apps which involve the routes.

如果我们需要重构涉及这些路由的部分应用，它可能会减慢我们的速度。


We cannot just “plug” a module on top of a different module and expect it to work…

我们不能把模块“插入”不同的模块之上，而是希望它能正常工作......


And if you’re thinking “but I can’t just move modules around anyway, it will break my app…”

如果你正在考虑“但我无论如何都要移动模块，它会破坏我的应用......”


I got 2 things to say:

我有两件事要说：


1. **Router testing** — which I’ll talk about in the future.

   **路由器测试** - 我将在后面讨论这个问题。

1. **Variable based routerLinks** — which I’ll talk about later in this post.

   **基于变量的routersLinks** （本文稍后将在后面讲）。


### Problem #2— Lazy Loading

### 问题＃2-惰性加载


If for example, we needed to turn `details.module.ts` into a lazy loaded module, we would have to go ahead and remove all those prefixes from all the details’ routes.

例如，如果我们需要把`details.module.ts`变成一个惰性加载的模块，我们就得继续从所有细节的路由中删除那些前缀。


    details.routing.module.ts (LAZY)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    @NgModule({

      imports: [

        RouterModule.forChild([      {         path: 'details', // <-- no more prefix        component: DetailsComponent      },

          {         path: 'details/some-other-route',         component: SomeOtherComponent      }        ])  ],  declarations: [DetailsComponent, SomeOtherComponent]

      exports: [RouterModule]})

    export class DetailsRoutingModule{ }

**Why?** because routes of lazy loaded modules become the `children` of the parent loading route.

**为什么？**因为惰性加载模块的路由会成为父加载路由的`children`组件。


WAT?

WAT？


Yeah, you can imagine the child routes of the lazy loaded module “stacking” on top of the parent loading route.

是的，你可以把惰性加载模块的子路由想象成“堆叠”在父加载路由之上。


![](https://cdn-images-1.medium.com/max/1600/1*FAMyCqV-JtlGasWp7-HRDQ.png)

![](https://cdn-images-1.medium.com/max/1600/1*FAMyCqV-JtlGasWp7-HRDQ.png)


By the way, that’s why we use `loadChildren` to load lazy loaded modules, as if to say: “Set this sucker’s routes as the loading route’s children”

这就是为什么我们使用`loadChildren`来加载惰性加载模块的原因，好像这样说：“把这个吸盘的路由设置为加载路由的子路由”


#### “Again, why is that a problem Shai?”

#### “再说一次，为什么Shai会出问题？”


In one word: inconsistency.

总之用一句话：不一致。


( In two words: in-consistency 👏 👏 👏 “good job Shai!”)

（用两个词来说：一致性👏👏👏“干得好！”）


When we scale up our apps, we want things to be consistent.

当我们扩展应用时，我们希望事情保持一致。


We want to reduce the amount of decisions we need to make, so every inconsistency creates unnecessary noise.

我们希望减少需要做出的决策，因此每次不一致都会产生不必要的噪音。


“Should I remove the prefix here or leave it? why can’t it just be the same as the other routes…?”

“我应该在这里删除这个前缀还是留下它？为什么不能和其他路线一样......？“


We want to reduce these 👆 questions.

我们希望减少这些问题。


#### Demo Project To Show The Problem:

#### 演示项目Demo Project：


Here is an example project that I created for you to see what I’m talking about:

这是一个我为你创建的示例项目，看看我在说什么：


[**angular-routing-module-pattern-issues - StackBlitz**  
*Project that shows issues with current routing module pattern*stackblitz.com](https://stackblitz.com/edit/angular-routing-module-pattern-issues?embed=1&file=src/app/app-routing.module.ts "https&#x3A;//stackblitz.com/edit/angular-routing-module-pattern-issues?embed=1&file=src/app/app-routing.module.ts")[](https://stackblitz.com/edit/angular-routing-module-pattern-issues?embed=1&file=src/app/app-routing.module.ts)

[**angular-routing-module-pattern-issues - StackBlitz**  
*该程序用于显示当前路由模块* patternblitz.com的问题](https://stackblitz.com/edit/angular-routing-module-pattern-issues?embed=1&file=src/app/app-routing.module.ts "https&#x3A;//stackblitz.com/edit/angular-routing-module-pattern-issues?embed=1&file=src/app/app-routing.module.ts") [](https://stackblitz.com/edit/angular-routing-module-pattern-issues?embed=1&file=src/app/app-routing.module.ts)


### SOLUTION: The “routes.ts” pattern.

### SOLUTION：“routes.ts”模式。


To solve these problems I’ve separated the routes array into its own `routes.ts` file (and removed the `routing.module.ts` files)

为了解决这些问题，我把routes数组分成了自己的`routes.ts`文件（并删除了`routes.ts`文件）


    app/  app.module.ts  app.routes.ts  settings/    settings.module.ts    settings.routes.ts      account        account.module.ts        account.routes.ts          details            details.module.ts            details.routes.ts

Now, for the eager loaded routes, to achieve the same behavior as the lazy loaded routes (meaning, to stack them up on top their parent route without knowing its prefix) I use this simple trick:

对于急切加载的路由来说，要实现与惰性加载路由一样的行为（也就是说，要把它们叠加在父路由之上而不知道它的前缀），我就会用到这个简单的技巧：


I load the nested routes as the value of the `children` property under their parent loading route.

我把这些嵌套的路由作为其父路由下的`children`属性的值加载。


    details.routes.ts~~~~~~~~~~~~~~~~~

    export const DETAILS_ROUTES = [

      { path: '', component: DetailsComponent },

      { path: 'some-other-route', component: SomeOtherComponent },

    ];

    account.routes.ts~~~~~~~~~~~~~~~~~

    import { DETAILS_ROUTES } from './details/details.routes';

    export const ACCOUNT_ROUTES = [

      { path: '', component: AccountComponent },

      { path: 'details', children: DETAILS_ROUTES }

    ];

That way, I keep everything modular and pluggable.

我保持模块化和可插拔的一切。


I do this for **all**the eager loaded routes.

我为**所有**急切的路由做了这个。


### “But what about the lazy loaded module routes?”

### “那些惰性加载的模块路由呢？”


Good question!

好问题！


Let’s say we wanted to turn `details.module.ts` into a lazy loaded module.

假设我们想把`details.module.ts`变成一个惰性加载的模块。


The beautiful thing about this pattern is that it doesn’t require a whole lot of changes to do so.

这种模式的美妙之处在于，它不需要进行太多的修改。


Instead of loading the `DETAILS_ROUTES` array in the parent route’s `children` property, we can just load it in the`forChild` of the `details.module.ts`

我们不用在`DETAILS_ROUTES`路由的`children`属性中加载`DETAILS_ROUTES`数组，而只需把它加载到`forChild` 。


Like so:

喜欢这样：


    details.module.ts~~~~~~~~~~~~~~~~~

    @NgModule({

      imports: [    RouterModule.forChild(DETAILS_ROUTES)  ]})

    export class DetailsModule { }

And from the `account.routes.ts` we change the `children` into `loadChildren` and load the module itself:

从`account.routes.ts`我们`loadChildren`组件改成`loadChildren`并加载模块本身：


    account.routes.ts~~~~~~~~~~~~~~~~~

    export const ACCOUNT_ROUTES = [

      { path: '', component: AccountComponent },

      {     path: 'details',     loadChildren: './details/details.module#DetailsModule'  }

    ];

That it!

那个！


Everything else stays the same. 🎉 🎉

其他一切都保持不变。 🎉🎉


This way, it’s easy peasy to turn eager modules into lazy ones and still keep the same convention and consistency across your code base.

很容易让eager模块变成惰性模块，同时在代码库中保持相同的约定和一致性。


### BONUS: Variables instead of URL strings

### BONUS：变量而非URL字符串


I HATE duplicated strings!

我讨厌重复的字符串！


![](https://cdn-images-1.medium.com/max/1600/0*jM2Vs_6CIRNB6uoL.jpg)

![](https://cdn-images-1.medium.com/max/1600/0*jM2Vs_6CIRNB6uoL.jpg)


Some guy that probably hates duplicated strings as well… who happens to also wear a squirrel suit.

有些人可能会讨厌那些重复的字符串......谁碰巧还穿着松鼠服。


Maybe because I always encounter bugs whenever I use two exact strings in several places throughout my large apps.

也许是因为每当我在大型应用中的几个地方使用两个完全字符串时，我总会遇到bug。


So following a widely used pattern from the Java world, I started using variables instead plain strings for route URLs .

因此，遵循Java世界中广泛使用的模式，我开始使用变量而不是路由URL的普通字符串。


That means that alongside each `routes.ts` file, I now also have a `routes.names.ts` file which looks like this:

这意味着，除了每个`routes.ts`文件之外，我现在还有一个`routes.names.ts`文件，如下所示：


    export const accountRoutesNames = {

      DETAILS: 'details'

    }

And I use it both in my `routes.ts` file :

我在的`routes.ts`文件中都使用它：


    account.routes.ts~~~~~~~~~~~~~~~~~

    import { accountRoutesNames } from './account.routes.names';

    export const ACCOUNT_ROUTES = [

    { path: '', component: AccountComponent },

    {     path: accountRoutesNames.DETAILS,     loadChildren: './details/details.module#DetailsModule'  }

    ];

And in my component files:

在我的组件文件中：


    account.components.ts~~~~~~~~~~~~~~~~~~~~~

    import { Component } from '@angular/core';

    import { accountRoutesNames } from './account.routes.names';

    @Component({  selector: 'app-account',  template: `

        <a routerLink="{{detailsLink}}">Go To Details</a>

      `})

    export class AccountComponent {

      detailsLink = `./${accountRoutesNames.DETAILS}`;

    }

That way I could refactor with ease, and it won’t ever affect my router links or router tests as long as I keep using variables whenever I need a route URL string.

这样我就可以轻松地进行重构，只要每当我需要一个路由URL字符串时，就会继续使用变量，它就不会影响我的路由器链接或路由器测试。


Here is a project which demonstrates the solution:

这是一个展示解决方案的项目：


[**angular-routes-pattern-solution - StackBlitz**  
*Project that shows a new routing pattern*stackblitz.com](https://stackblitz.com/edit/angular-routes-pattern-solution?embed=1&file=src/app/app.routes.ts "https&#x3A;//stackblitz.com/edit/angular-routes-pattern-solution?embed=1&file=src/app/app.routes.ts")[](https://stackblitz.com/edit/angular-routes-pattern-solution?embed=1&file=src/app/app.routes.ts)

[**angular-routes-pattern-solution - StackBlitz**  
*该项目展示了一种新的路由模式* stackblitz.com](https://stackblitz.com/edit/angular-routes-pattern-solution?embed=1&file=src/app/app.routes.ts "https&#x3A;//stackblitz.com/edit/angular-routes-pattern-solution?embed=1&file=src/app/app.routes.ts") [](https://stackblitz.com/edit/angular-routes-pattern-solution?embed=1&file=src/app/app.routes.ts)


### To Summarize:

### 总结一下：


1. The `routing.module` pattern has a few downsides: redundant url prefixes and inconsistency in lazy loaded modules routes.

   `routing.module`模式有一些缺点：冗余的url前缀和惰性加载的模块路由不一致。

1. The solution: to use `routes.ts` files and load them either as `children` or in `forChild` in combination with `loadChildren`

   该解决方案：要使用`routes.ts`文件，并把它们当作`children`加载，或者加载到`forChild`中，并与`loadChildren`一起`loadChildren`

1. **BONUS**: use variable names to refer to URLs for better refactoring abilities.

   **BONUS** ：使用变量名来引用URL，以获得更好的重构能力。


This is the way I’ve been configuring my routes for quite sometime now and I find it to be very consistent and scalable.

这是我在很长一段时间内配置路由的方式，并且发现它非常一致且可伸缩。


I hope this pattern / convention will serve you as well as it has served me and my clients.

我希望这种模式/惯例能为你和我的客户提供服务。


Let me know if you have any questions / suggestions in the comments below.

如果您对以下评论中有任何疑问/建议，请与我们联系。


And stay tuned for some exciting news about Angular and Testing… 💪

敬请关注Angular和Testing的一些令人兴奋的新闻......💪


Shai

邵


[Follow me on Twitter](https://twitter.com/shai_reznik)

[在Twitter上跟我来](https://twitter.com/shai_reznik)


Or watch 👇 my Angular courses (especially on Testing):

或者看看我的Angular课程（尤其是考试）：


[school.HiRez.io](https://school.hirez.io)

[school.HiRez.io](https://school.hirez.io)


Simply awesome! It hepls me a lot to play with nested routings with lazy loading.

简直棒极了！它让我在惰性加载的嵌套路由中玩得很开心。


Much appriciated. 😀 😝

非常感兴趣。 😀😝


Thanks buddy! great to hear!

谢谢哥们！很高兴听到！


Thanks for sharing..it’s very helpful article Routing in Angular

谢谢你的分享..这是一篇非常有用的文章Routing in Angular


If I am not wrong, the routes const should be type &lt;Routes> from “@angular/router”. In and is good practice to put routes in const, well done

如果没错的话，路由const应该是“@ angular / router”中的&lt;Routes>类型。在const中把路由放进去是很好的做法，做得很好


Yep, you’re right, I just saved some space in the examples

是的，你是对的，我刚才在例子里保存了一些空间


In two words: Good Job

用两个词来说：好工作


Way to go! Awesome article that adds insight to the Routing concept in Angular.

怎么样！这篇很棒的文章为Angular中的Routing概念增添了深刻见解。


Thanks Mark!

谢谢Mark！


One other thing that is different (from what I can see in my experimentation) between the static routes and the lazy-loaded routes is that for lazy-loaded routes you do \_not need\_ to `import` the Child module into the Parent module. So, you added the `loadChildren` setting and then remove the `import` . In your example, you need to import the…

静态路由和惰性加载路由之间的另一个不同之处（就是我在实验中看到的）是，对于惰性加载的路由，你不需要把Child模块导入到Parent模块中。所以，你添加了`loadChildren`设置，然后删除了`import` 。在你的例子中，你需要导入...


Thanks for the feedback Ben!

谢谢Ben的反馈！


Yeah, I don’t see a way to get around the need to import the module you need to load, and not importing the lazy loaded one, even with the “routing module” pattern you still have this limitation.

是的，我没有办法解决导入你需要加载的模块的问题，也没有办法导入惰性加载模块，即使使用“路由模块”模式，你仍然有这个限制。


Interesting.

很有意思。


You could, presumably, use the ‘Bonus’ similarly using the routing module (i.e. use variables for the route ‘prefixes’)

据推测，你可以使用路由模块来类似地使用'Bonus'（比如使用路由'前缀'的变量）


And sure, changing from eager to lazy for a route using a routing module means some changes (find/replace.. done) but generally that’s going to happen once or less per…

当然，使用路由模块从路由器的急切变为懒惰意味着需要进行一些修改（查找/替换..完成），但一般情况下这种情况每次都会发生一次或更少......


Thanks for the feedback!

谢谢你的反馈！


Yep, you could still use variables for the prefixes, but think about how messy that would be if you have a large scale app…

是的，你仍然可以使用变量作为前缀，但想想如果你拥有一个大规模的应用，那会有多么混乱......


And yes, you will have hard refactoring tasks, the goal here is to reduce those tasks to the minimum and not to have yet another thing to worry about.

是的，你会有很多重构任务，这里的目标是把这些任务减少到最低限度，而不用再为此担心了。


Exactly what I was looking for.  
Perfect solution.

正是我在寻找的东西。  
完美解决方案


Thank you very much.

非常感谢你。


Now that I was implementing it, one thing I prefer to do is instead of having a dedicated file for RoutesNames, I export that Constant from the respective Routes file itself.

现在，我正在实现它，我更喜欢做的一件事是，而不是为RoutesNames提供一个专门的文件，而是从各自的Routes文件中导出那个Constant。


E.G.:

EG：


File: settings.routes.ts  
— — —

文件：settings.routes.ts  

* * *


Thanks for the feedback.

谢谢你的反馈。


At first I tried to put everything in the same routes file.  
But it turned out to be a problem of circular dependency -

起初我尝试把所有东西放在同一个routes文件中。  
但事实证明这是一个循环依赖的问题 -


For example — If I want to use a route’s name inside a component (Let’s say for using as a \`routerLink\` value) — now if my routes…

比如 - 如果我想在一个组件里面使用路由的名字（让我们假设它用作\`routerLink\`值） - 现在，如果我的路由......


It’s not clear what is inconsistent here

目前还不清楚这里有何不一致之处


Sometimes you use a prefix, sometimes you don’t

有时你使用的是前缀，有时却不是


I had the same question too and it seems you don’t \*need\* to do it like this: https&#x3A;//angular.io/guide/router#do-you-need-a-routing-module

我也遇到过同样的问题，看来你不需要这样做：https：//angular.io/guide/router#do-you-need-a-routing-module


Yep, it’s only a suggestion, but people take it as “the way”

是的，这只是一个建议，但人们会把它当成“路”。

