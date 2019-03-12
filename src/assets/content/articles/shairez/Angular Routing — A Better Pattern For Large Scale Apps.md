# Angular Routing — A Better Pattern For Large Scale Apps

[![Go to the profile of Shai Reznik](https://cdn-images-1.medium.com/fit/c/100/100/1*C2ZvPywplWjtVFvu2qDE-Q.jpeg)](https://medium.com/@shairez?source=post_header_lockup)

[Shai Reznik](https://medium.com/@shairez)BlockedUnblockFollowFollowing

Sep 21, 2018

It’s been a while since my last post because I’ve been busy cooking you people some pretty interesting Angular testing learning material.

But today, I read the following tweet:

And it got me inspired to share my pattern of configuring routes in large scale Angular apps.

Since the beginning, when I read the [Angular Routing](https://angular.io/guide/router) docs, and saw the “Routing Module” pattern suggestion, I was confused.

“Why do I need a separate module for routing?” I asked.

Nobody answered because I was alone. 🙁

But then I said: “What the hell, let’s try it!” 😎

And I started applying this pattern in one of the Angular 2 (yeah it was a while ago) apps I was beginning from scratch.

Some time went by, and the app grew.

To keep things clean we started separating larger modules into smaller nested modules, but then, I started noticing a HUGE shortcoming when it came down to using nested routes.

### Problem #1 — Redundant URL Prefixes

Let’s say we have the following folder structure:

    app/  app.module.ts  app.routing.module.ts  settings/    settings.module.ts    settings.routing.module.ts      account        account.module.ts        account.routing.module.ts          details            details.module.ts            details.routing.module.ts

Take `details.routing.module.ts` for example.

With the “Routing Module” approach we always begin our route URLs from the base URL.

So every route in `details.routing.module.ts` will need to have the previous routes URLs (“settings/account” ) as its prefix:

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

BECAUSE…

for medium to large size apps, these routes will repeat themselves over and over again.

It could slow us down if we ever need to refactor parts of the apps which involve the routes.

We cannot just “plug” a module on top of a different module and expect it to work…

And if you’re thinking “but I can’t just move modules around anyway, it will break my app…”

I got 2 things to say:

1. **Router testing** — which I’ll talk about in the future.
1. **Variable based routerLinks** — which I’ll talk about later in this post.

### Problem #2— Lazy Loading

If for example, we needed to turn `details.module.ts` into a lazy loaded module, we would have to go ahead and remove all those prefixes from all the details’ routes.

    details.routing.module.ts (LAZY)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    @NgModule({

      imports: [

        RouterModule.forChild([      {         path: 'details', // <-- no more prefix        component: DetailsComponent      },

          {         path: 'details/some-other-route',         component: SomeOtherComponent      }        ])  ],  declarations: [DetailsComponent, SomeOtherComponent]

      exports: [RouterModule]})

    export class DetailsRoutingModule{ }

**Why?** because routes of lazy loaded modules become the `children` of the parent loading route.

WAT?

Yeah, you can imagine the child routes of the lazy loaded module “stacking” on top of the parent loading route.

![](https://cdn-images-1.medium.com/max/1600/1*FAMyCqV-JtlGasWp7-HRDQ.png)

By the way, that’s why we use `loadChildren` to load lazy loaded modules, as if to say: “Set this sucker’s routes as the loading route’s children”

#### “Again, why is that a problem Shai?”

In one word: inconsistency.

( In two words: in-consistency 👏 👏 👏 “good job Shai!”)

When we scale up our apps, we want things to be consistent.

We want to reduce the amount of decisions we need to make, so every inconsistency creates unnecessary noise.

“Should I remove the prefix here or leave it? why can’t it just be the same as the other routes…?”

We want to reduce these 👆 questions.

#### Demo Project To Show The Problem:

Here is an example project that I created for you to see what I’m talking about:

[**angular-routing-module-pattern-issues - StackBlitz**  
*Project that shows issues with current routing module pattern*stackblitz.com](https://stackblitz.com/edit/angular-routing-module-pattern-issues?embed=1&file=src/app/app-routing.module.ts "https&#x3A;//stackblitz.com/edit/angular-routing-module-pattern-issues?embed=1&file=src/app/app-routing.module.ts")[](https://stackblitz.com/edit/angular-routing-module-pattern-issues?embed=1&file=src/app/app-routing.module.ts)

### SOLUTION: The “routes.ts” pattern.

To solve these problems I’ve separated the routes array into its own `routes.ts` file (and removed the `routing.module.ts` files)

    app/  app.module.ts  app.routes.ts  settings/    settings.module.ts    settings.routes.ts      account        account.module.ts        account.routes.ts          details            details.module.ts            details.routes.ts

Now, for the eager loaded routes, to achieve the same behavior as the lazy loaded routes (meaning, to stack them up on top their parent route without knowing its prefix) I use this simple trick:

I load the nested routes as the value of the `children` property under their parent loading route.

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

I do this for **all**the eager loaded routes.

### “But what about the lazy loaded module routes?”

Good question!

Let’s say we wanted to turn `details.module.ts` into a lazy loaded module.

The beautiful thing about this pattern is that it doesn’t require a whole lot of changes to do so.

Instead of loading the `DETAILS_ROUTES` array in the parent route’s `children` property, we can just load it in the`forChild` of the `details.module.ts`

Like so:

    details.module.ts~~~~~~~~~~~~~~~~~

    @NgModule({

      imports: [    RouterModule.forChild(DETAILS_ROUTES)  ]})

    export class DetailsModule { }

And from the `account.routes.ts` we change the `children` into `loadChildren` and load the module itself:

    account.routes.ts~~~~~~~~~~~~~~~~~

    export const ACCOUNT_ROUTES = [

      { path: '', component: AccountComponent },

      {     path: 'details',     loadChildren: './details/details.module#DetailsModule'  }

    ];

That it!

Everything else stays the same. 🎉 🎉

This way, it’s easy peasy to turn eager modules into lazy ones and still keep the same convention and consistency across your code base.

### BONUS: Variables instead of URL strings

I HATE duplicated strings!

![](https://cdn-images-1.medium.com/max/1600/0*jM2Vs_6CIRNB6uoL.jpg)

Some guy that probably hates duplicated strings as well… who happens to also wear a squirrel suit.

Maybe because I always encounter bugs whenever I use two exact strings in several places throughout my large apps.

So following a widely used pattern from the Java world, I started using variables instead plain strings for route URLs .

That means that alongside each `routes.ts` file, I now also have a `routes.names.ts` file which looks like this:

    export const accountRoutesNames = {

      DETAILS: 'details'

    }

And I use it both in my `routes.ts` file :

    account.routes.ts~~~~~~~~~~~~~~~~~

    import { accountRoutesNames } from './account.routes.names';

    export const ACCOUNT_ROUTES = [

    { path: '', component: AccountComponent },

    {     path: accountRoutesNames.DETAILS,     loadChildren: './details/details.module#DetailsModule'  }

    ];

And in my component files:

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

Here is a project which demonstrates the solution:

[**angular-routes-pattern-solution - StackBlitz**  
*Project that shows a new routing pattern*stackblitz.com](https://stackblitz.com/edit/angular-routes-pattern-solution?embed=1&file=src/app/app.routes.ts "https&#x3A;//stackblitz.com/edit/angular-routes-pattern-solution?embed=1&file=src/app/app.routes.ts")[](https://stackblitz.com/edit/angular-routes-pattern-solution?embed=1&file=src/app/app.routes.ts)

### To Summarize:

1. The `routing.module` pattern has a few downsides: redundant url prefixes and inconsistency in lazy loaded modules routes.
1. The solution: to use `routes.ts` files and load them either as `children` or in `forChild` in combination with `loadChildren`
1. **BONUS**: use variable names to refer to URLs for better refactoring abilities.

This is the way I’ve been configuring my routes for quite sometime now and I find it to be very consistent and scalable.

I hope this pattern / convention will serve you as well as it has served me and my clients.

Let me know if you have any questions / suggestions in the comments below.

And stay tuned for some exciting news about Angular and Testing… 💪

Shai

[Follow me on Twitter](https://twitter.com/shai_reznik)

Or watch 👇 my Angular courses (especially on Testing):

[school.HiRez.io](https://school.hirez.io)

Simply awesome! It hepls me a lot to play with nested routings with lazy loading.

Much appriciated. 😀 😝

Thanks buddy! great to hear!

Thanks for sharing..it’s very helpful article Routing in Angular

If I am not wrong, the routes const should be type &lt;Routes> from “@angular/router”. In and is good practice to put routes in const, well done

Yep, you’re right, I just saved some space in the examples

In two words: Good Job

Way to go! Awesome article that adds insight to the Routing concept in Angular.

Thanks Mark!

One other thing that is different (from what I can see in my experimentation) between the static routes and the lazy-loaded routes is that for lazy-loaded routes you do \_not need\_ to `import` the Child module into the Parent module. So, you added the `loadChildren` setting and then remove the `import` . In your example, you need to import the…

Thanks for the feedback Ben!

Yeah, I don’t see a way to get around the need to import the module you need to load, and not importing the lazy loaded one, even with the “routing module” pattern you still have this limitation.

Interesting.

You could, presumably, use the ‘Bonus’ similarly using the routing module (i.e. use variables for the route ‘prefixes’)

And sure, changing from eager to lazy for a route using a routing module means some changes (find/replace.. done) but generally that’s going to happen once or less per…

Thanks for the feedback!

Yep, you could still use variables for the prefixes, but think about how messy that would be if you have a large scale app…

And yes, you will have hard refactoring tasks, the goal here is to reduce those tasks to the minimum and not to have yet another thing to worry about.

Exactly what I was looking for.  
Perfect solution.

Thank you very much.

Now that I was implementing it, one thing I prefer to do is instead of having a dedicated file for RoutesNames, I export that Constant from the respective Routes file itself.

E.G.:

File: settings.routes.ts  
— — —

Thanks for the feedback.

At first I tried to put everything in the same routes file.  
But it turned out to be a problem of circular dependency -

For example — If I want to use a route’s name inside a component (Let’s say for using as a \`routerLink\` value) — now if my routes…

It’s not clear what is inconsistent here

Sometimes you use a prefix, sometimes you don’t

I had the same question too and it seems you don’t \*need\* to do it like this: https&#x3A;//angular.io/guide/router#do-you-need-a-routing-module

Yep, it’s only a suggestion, but people take it as “the way”
