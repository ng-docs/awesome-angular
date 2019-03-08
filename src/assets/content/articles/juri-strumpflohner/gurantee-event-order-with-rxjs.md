# Guarantee Event Order with RxJS 

> use concatMap to guarantee ordering of events

When you create dynamic UIs, you have to deal with async stuff a lot. Most often they are triggered by some user interaction. Things usually get tricky when you need to guarantee certain operations are executed in order. Since they are async we might not know which one returns first. Let's see how RxJS can help a lot here.

In order to illustrate **the problem** I created an example use case, simplified of course, but still it represents a potential real world use case.

**Table of contents**

- [TL;DR: Here’s the corresponding Egghead lesson](#tl-dr-here-s-the-corresponding-egghead-lesson)

- [The Problem](#the-problem)

- [We need to guarantee ordering](#we-need-to-guarantee-ordering)

  - [A short note on wrapping `setTimeout` as Observable](#a-short-note-on-wrapping-settimeout-as-observable)
  - [The entire `concatMap` example](#the-entire-concatmap-example)

- [Optimizing with `switchMap`](#optimizing-with-switchmap)

- [`switchMap` - potential race conditions](#switchmap-potential-race-conditions)

- [Conclusion](#conclusion)

We basically have the following user interface:

![](/blog/assets/imgs/rxjs-order-guarantee.png)

When the user **checks** some option, an http request is made to retrieve some value and once the request returns, the response is added to a list visualized below.

> For the sake of simplicity, in this fake example I simply use a `setTimeout(..)` to simulate the asyncronous request.

When the user again **deselects** the option, the corresponding value is removed from the list below (without any async request).

## TL;DR: Here’s the corresponding Egghead lesson

 [View on Egghead.io](https://egghead.io/lessons/angular-guarantee-ordering-of-events-with-rxjs)

## The Problem

The async request made when checking an option might take a while before coming back of course. That said, what happens when the user double-clicks 😕?

Well, try by yourself:

As you can see, we might get an inconsistent state. When - for instance - quickly double-clicking on “Option 1” we get the option selected & then unselected again, but the async call coming later still adds the option to the list.

The issue is quite clear by looking at what happens in the checkbox selection event:

```typescript
...
if(data.checkboxEvent.checked) {
    // simulate async call
    setTimeout(() => {
      // add the record
      this.records.push(data.option)
    }, 1500)
} else {
    // remove the record given by the id (if present)
    this.records = this.records.filter(x => x.value !== id );
}
```

The slower async call comes back later, thus it adds the record, regardless of whether we unchecked it again in the meantime.

## We need to guarantee ordering

We somehow need to guarantee ordering of the events. Thus, when double-clicking, we need to make sure that the logic for “unchecking” is executed only after a potential async call returns. Implementing this can be quite tricky. You could check whether the corresponding option is still checked when the async call returns and only in that case execute the logic. Alternatively, you could hold some flag, blocking other logic to be executed while an async call is running…  
Not really satisfying and hacky.., and again, this is just a small simple fake example.

Well, turns out that if you know RxJS, this is quite easily achievable: using the `concatMap` operator.

> `concatMap` - Map values to inner observable, subscribe and emit in order.

**The idea is to pipe the events** from the checking/unchecking into a RxJS subject and then process them one after the other.

```typescript
private selectionSubject = new Subject<SelectionEvent>();
...
this.selectionEvent
  .pipe(
    concatMap(data => {
      ...
    })
  ).subscribe(action => {
    ...
  })
```

Inside the `concatMap` we implement the logic of handling the actions.

```typescript
...
.concatMap(data => {
  const id = data.option.value;

  if (data.checkboxEvent.checked) {
    /*
      do the async call and then return
      an action object like
      {
        type: 'ADD',
        data: ...
      }
    */
  } else {
    /*
      Nothing to call, just remove
      the corresponding record, thus return
      a "remove" action
      {
        type: 'REMOVE',
        data: id
      }
    */
  }
})
...
```

When we receive a checked event, then we execute the async call, otherwise we trigger an action for removing the item from the list. We need to always return an Observable for that. `concatMap` subscribes to that “inner Observable” and proceeds with the next only once the previous one “completes”, thus **guaranteeing ordering of our events**.

> An Observable “completes” once it is done. It is similar to the `resolve(..)` of a `Promise`.

#### A short note on wrapping `setTimeout` as Observable

You remember we use `setTimeout` to simulate an async call. Well, we need to wrap it into an Observable. There are two ways of doing it.

**Using the `timer` observable** - we can simply use the existing `timer(..)` which the RxJS exposes for us:

```typescript
timer(1500)
  .pipe(
    map(_ => ({
      type: 'ADD',
      data: ...
    }))
  )
```

Alternatively, we **can create an Observable by ourselves** with `Observable.create(...)`:

```typescript
return Observable.create((observer) => {
  const timeout = setTimeout(() => {
    console.log('Returning data');
    observer.next({
      type: 'ADD',
      data: data.option
    });
    
    // complete the observable
    observer.complete();
  }, 1500);

  // cancel timeout on unsubscribe
  return () => clearTimeout(timeout);
});
```

### The entire `concatMap` example

Alright, now that we know how to wrap our `setTimeout` as an observable, let’s continue with the implementation of the `concatMap` logic.

```typescript
concatMap(data => {
  const id = data.option.value;

  if (data.checkboxEvent.checked) {
    // simulate async call
    return Observable.create((observer) => {
      const timeout = setTimeout(() => {
        console.log('Returning data');
        observer.next({
          type: 'ADD',
          data: data.option
        });
        observer.complete();
      }, 1500);

      return () => clearTimeout(timeout);
    });
  } else {
    return of({
      type: 'REMOVE',
      data: id
    });
  }
})
```

In the `.subscribe(...)` of our `selectionObject` we then effectively parse the action and cause the side-effect on our result list:

```typescript
 this.selectionSubject
    .pipe(
      concatMap(data => {
        ...
      })
    ).subscribe((action: any) => {
      if (action.type === 'ADD') {
        this.records.push(action.data)
      } else {
        this.records = this.records.filter(x => x.value !== action.data);
      }
    });
```

Awesome! Now, whenever the user clicks a checkbox, in the according event handler, we don’t implement the logic, but rather we just need to pipe it into the `selectionSubject`.

```typescript
onCheckListChange(data: SelectionEvent) {
  this.selectionSubject.next(data);
}
```

Here’s the according Stackblitz example to play around with. Check it out, double-clicking works perfectly now!

## Optimizing with `switchMap`

But can do even better. In the current `concatMap` example, when the user double-clicks, we effectively wait until the async call comes back and then remove it again. But why even execute the async logic. When the user double-clicks we can just abort the previous action and not even execute it, thus save time.

That’s what `switchMap` does. In contrast to `concatMap`, it doesn’t execute the actions (our Observable events) in sequence, but rather it cancels the previous Observable.

> **Watch out!!** While for this use-case *cancelling* was an option, this might not always be the case. So be careful to evaluate between using `concatMap` or `switchMap`.

Here’s a Stackblitz example. Pay particular attention to the console log. In the `setTimeout(..)` a log is written (`console.log('Returning data');`). If you double-click, that log doesn’t even appear, proving that the async action is not even executed.

## `switchMap` - potential race conditions

Ok, so we’ve learned, that with `switchMap` we can optimize our `concatMap` approach in that we cancel the previous observable, thus preventing from even executing that (possibly costly logic) in case when the user double-clicks on one of our checkboxes. But there’s a caveaut here: **what if the user quickly clicks the 1st and then 2nd checkbox?** We would actually cancel the click of the 1st checkbox, thus preventing it from being properly activated. Let’s see how to fix that.

[Kwinten](https://mobile.twitter.com/KwintenP) suggested to use `mergeMap` in this case and then handling the “cancelling” optimization by using the `takeUntil` operator, verifying whether a second event from the same checkbox comes in. Here’s how to achieve that:

```typescript
this.selectionSubject
  .pipe(
    mergeMap(data => {
      const id = data.option.value;

      if (data.checkboxEvent.checked) {
        return Observable.create((observer) => {
          ...
        }).pipe(
          takeUntil(this.selectionSubject.pipe(
            filter(data => data.option.value === id),
          ))
        );
      } else {
        return of({
          type: 'REMOVE',
          data: id
        });
      }
    }
    )
  ).subscribe((action: any) => {
    ...
  });
```

As you can see the “async” observable has a `takeUntil` that stops that Observable the moment a new event comes in on our `selectionSubject` with the same id we’re currently processing. Because that’s the scenario of a double-click on the same checkbox. In any other case, we just complete the observable and let it go on without terminating it, thus solving the potential issue of quickly clicking multiple different checkboxes 😃.

And here’s the according modified Stackblitz to play around with.

## Conclusion

This article demonstrates some pratical use cases for `concatMap` as well as `switchMap`. RxJS is powerful, and we see in this example how to solve the “ordering” problem in a very elegant and maintainable way.

RxJS has its learning curve, though. I highly believe the best way to learn it is not by learning its operators, but rather by real-world use cases and how to solve them with RxJS. Stay tuned for further articles like this one.

*(@rxjs experts: nothing for you here, I’m sorry 😉)*
