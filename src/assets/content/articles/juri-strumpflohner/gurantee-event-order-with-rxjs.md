# Guarantee Event Order with RxJS

# 用RxJS保证事件顺序


> use concatMap to guarantee ordering of events
>
> 使用concatMap来保证事件的排序
>

When you create dynamic UIs, you have to deal with async stuff a lot. Most often they are triggered by some user interaction. Things usually get tricky when you need to guarantee certain operations are executed in order. Since they are async we might not know which one returns first. Let's see how RxJS can help a lot here.

当你创建动态用户界面时，你必须经常处理异步。大多数情况下，它们都会被某些用户交互触发当你需要保证某些操作按顺序执行时，事情通常会变得棘手。由于它们是异步的，我们可能不知道哪一个先返回。让我们来看看RxJS如何在这里提供很多帮助。


In order to illustrate **the problem** I created an example use case, simplified of course, but still it represents a potential real world use case.

为了说明**这个问题，**我创建了一个示例用例，当然简化了，但它代表了一个潜在的真实用例。


**Table of contents**

**目录**


- [TL;DR: Here’s the corresponding Egghead lesson](#tl-dr-here-s-the-corresponding-egghead-lesson)

  [TL; DR：这是相应的Egghead课程](#tl-dr-here-s-the-corresponding-egghead-lesson)


- [The Problem](#the-problem)

  [这个问题](#the-problem)


- [We need to guarantee ordering](#we-need-to-guarantee-ordering)

  [我们需要保证订购](#we-need-to-guarantee-ordering)


  - [A short note on wrapping `setTimeout` as Observable](#a-short-note-on-wrapping-settimeout-as-observable)

    [把`setTimeout`包装成Observable的简短说明](#a-short-note-on-wrapping-settimeout-as-observable)

  - [The entire `concatMap` example](#the-entire-concatmap-example)

    [整个`concatMap`例子](#the-entire-concatmap-example)


- [Optimizing with `switchMap`](#optimizing-with-switchmap)

  [用`switchMap`优化](#optimizing-with-switchmap)


- [`switchMap` - potential race conditions](#switchmap-potential-race-conditions)

  [`switchMap` - 潜在的竞争条件](#switchmap-potential-race-conditions)


- [Conclusion](#conclusion)

  [结论](#conclusion)


We basically have the following user interface:

我们基本上有以下用户界面：


![](/blog/assets/imgs/rxjs-order-guarantee.png)

![](/blog/assets/imgs/rxjs-order-guarantee.png)


When the user **checks** some option, an http request is made to retrieve some value and once the request returns, the response is added to a list visualized below.

当用户**检查**某个选项时，就会发出一个http请求来检索一些值，一旦请求返回，就会把响应添加到下面可视化的列表中。


> For the sake of simplicity, in this fake example I simply use a `setTimeout(..)` to simulate the asyncronous request.
>
> 为了简单起见，在这个假的例子中，我只是使用`setTimeout(..)`来模拟asyncronous请求。
>

When the user again **deselects** the option, the corresponding value is removed from the list below (without any async request).

当用户再次**取消选择**该选项时，相应的值也会从下面的列表中删除（不需要任何异步请求）。


## TL;DR: Here’s the corresponding Egghead lesson

## TL; DR：这是相应的Egghead课程


 [View on Egghead.io](https://egghead.io/lessons/angular-guarantee-ordering-of-events-with-rxjs)

[在Egghead.io上查看](https://egghead.io/lessons/angular-guarantee-ordering-of-events-with-rxjs)


## The Problem

## 这个问题


The async request made when checking an option might take a while before coming back of course. That said, what happens when the user double-clicks 😕?

检查选项时发出的异步请求可能需要一段时间才会回来。那就是当用户双击what时会发生什么？


Well, try by yourself:

好吧，亲自试试吧：


As you can see, we might get an inconsistent state. When - for instance - quickly double-clicking on “Option 1” we get the option selected & then unselected again, but the async call coming later still adds the option to the list.

正如你所看到的，我们可能会遇到一种不一致的状态。当 - 例如 - 快速双击“Option 1”时，我们会选择该选项，然后再次取消选中，但之后的异步调用仍会把该选项添加到列表中。


The issue is quite clear by looking at what happens in the checkbox selection event:

通过查看复选框选择事件中发生的事情可以很清楚这个问题：


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

较慢的异步调用会在稍后返回，因此它会添加记录，而不管我们是否在此期间再次取消选中它。


## We need to guarantee ordering

## 我们需要保证订购


We somehow need to guarantee ordering of the events. Thus, when double-clicking, we need to make sure that the logic for “unchecking” is executed only after a potential async call returns. Implementing this can be quite tricky. You could check whether the corresponding option is still checked when the async call returns and only in that case execute the logic. Alternatively, you could hold some flag, blocking other logic to be executed while an async call is running…  
Not really satisfying and hacky.., and again, this is just a small simple fake example.

我们不得不保证对事件的排序。因此，当双击时，我们需要确保只有在潜在的async调用返回后才能执行“取消选中”的逻辑。执行这个操作非常棘手。当异步调用返回时，你可以检查是否还检查过相应的选项，并且只在那种情况下执行该逻辑。或者，你可以持一些标志，阻止其它逻辑执行，同时异步调用正在运行......  
不是那么令人满意，而是hacky ..再次，这只是一个简单的小例子。


Well, turns out that if you know RxJS, this is quite easily achievable: using the `concatMap` operator.

好吧，事实证明，如果你知道RxJS，这很容易实现：使用`concatMap`操作符。


> `concatMap` - Map values to inner observable, subscribe and emit in order.
>
> `concatMap` - 按顺序将值映射到内部可观察对象，subscribe和emit。
>

**The idea is to pipe the events** from the checking/unchecking into a RxJS subject and then process them one after the other.

**我们的想法是把**检查/取消检查中**的事件管道输入**到一个RxJS主题中，然后依次处理它们。


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

在`concatMap`里面，我们实现了处理这些动作的逻辑。


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

当我们收到一个checked事件时，就会执行异步调用，否则就触发一个从列表中删除该项的动作。我们需要总是返回一个Observable。 `concatMap`订阅那个“内部可观察对象”，只有当前一个“完成”时才继续执行下一个“内观察”，从而**保证了对事件的排序** 。


> An Observable “completes” once it is done. It is similar to the `resolve(..)` of a `Promise`.
>
> 一段可见对象“完成”就完成了。它类似于`Promise`的`resolve(..)` 。
>

#### A short note on wrapping `setTimeout` as Observable

#### 把`setTimeout`包装成Observable的简短说明


You remember we use `setTimeout` to simulate an async call. Well, we need to wrap it into an Observable. There are two ways of doing it.

你还记得我们用`setTimeout`来模拟异步调用。好吧，我们需要将它包装进一个Observable中。有两种方法可以做到这一点。


**Using the `timer` observable** - we can simply use the existing `timer(..)` which the RxJS exposes for us:

**使用`timer`** obserservable - 我们可以简单地使用RxJS为我们公开的现有`timer(..)` ：


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

另外，我们**可以**用`Observable.create(...)` **自己创建一个Observable** ：


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

### 整个`concatMap`例子


Alright, now that we know how to wrap our `setTimeout` as an observable, let’s continue with the implementation of the `concatMap` logic.

好了，既然我们知道如何把`setTimeout`包装成一个可观察对象，让我们继续执行`concatMap`逻辑。


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

在`.subscribe(...)` ，我们会有效地解析这个动作，并在结果列表中产生副作用：


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

太棒了！现在，每当用户单击复选框时，在依据事件处理程序中，我们就不会实现这个逻辑，而是只需把它传递给`selectionSubject` 。


```typescript
onCheckListChange(data: SelectionEvent) {
  this.selectionSubject.next(data);
}
```

Here’s the according Stackblitz example to play around with. Check it out, double-clicking works perfectly now!

这是根据Stackblitz编写的例子。看看吧，双击完美搭配！


## Optimizing with `switchMap`

## 用`switchMap`优化


But can do even better. In the current `concatMap` example, when the user double-clicks, we effectively wait until the async call comes back and then remove it again. But why even execute the async logic. When the user double-clicks we can just abort the previous action and not even execute it, thus save time.

但是可以做得更好。在当前的`concatMap`例子中，当用户双击时，我们会等到异步调用回来，然后再删除它。但为什么要执行异步逻辑呢？当用户双击时，我们可以直接中止上一个操作，甚至不执行它，从而节省了时间。


That’s what `switchMap` does. In contrast to `concatMap`, it doesn’t execute the actions (our Observable events) in sequence, but rather it cancels the previous Observable.

这就是`switchMap`所做的。与`concatMap` ，它并没有按顺序执行那些动作（我们的Observable事件），而是取消了以前的Observable。


> **Watch out!!** While for this use-case *cancelling* was an option, this might not always be the case. So be careful to evaluate between using `concatMap` or `switchMap`.
>
> **小心!!**虽然对于这种用例*取消*是一种选择，但情况可能并非总是如此。所以在使用`concatMap`或`switchMap`要小心。
>

Here’s a Stackblitz example. Pay particular attention to the console log. In the `setTimeout(..)` a log is written (`console.log('Returning data');`). If you double-click, that log doesn’t even appear, proving that the async action is not even executed.

这是Stackblitz的一个例子。要特别注意控制台日志。在`setTimeout(..)`中写了一个日志（ `console.log('Returning data');` ）。如果双击，该日志就不会出现，证明该异步操作甚至没有被执行过。


## `switchMap` - potential race conditions

## `switchMap` - 潜在的竞争条件


Ok, so we’ve learned, that with `switchMap` we can optimize our `concatMap` approach in that we cancel the previous observable, thus preventing from even executing that (possibly costly logic) in case when the user double-clicks on one of our checkboxes. But there’s a caveaut here: **what if the user quickly clicks the 1st and then 2nd checkbox?** We would actually cancel the click of the 1st checkbox, thus preventing it from being properly activated. Let’s see how to fix that.

好的，我们已经了解到，使用`switchMap`我们可以优化`concatMap`方法，因为我们取消了以前的可观察对象，以免在用户双击其中一个复选框的情况下执行该操作（可能代价`concatMap`逻辑）。但是，这里有个问题： **如果用户快速点击第一个和第二个复选框，该怎么办？**我们实际上会取消第一个复选框的点击，以防止它被正确激活。让我们看看如何解决这个问题。


[Kwinten](https://mobile.twitter.com/KwintenP) suggested to use `mergeMap` in this case and then handling the “cancelling” optimization by using the `takeUntil` operator, verifying whether a second event from the same checkbox comes in. Here’s how to achieve that:

[Kwinten](https://mobile.twitter.com/KwintenP)建议在这种情况下使用`mergeMap` ，然后使用`takeUntil`操作符来处理“取消”优化，验证同一个复选框中的第二个事件是否进来。下面是如何实现的：


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

正如你所看到的那样，“async”可观察对象有一个`takeUntil` ，它会在具有我们当前处理过的相同id的`selectionSubject`上新事件发生时停止那个Observable。因为这是双击同一个复选框的场景。在任何其他情况下，我们只是完成了这个可观察对象，让它继续运行而不用终止它，从而解决了快速点击多个不同复选框的潜在问题😃。


And here’s the according modified Stackblitz to play around with.

这里是修改后的Stackblitz的修改版。


## Conclusion

## 结论


This article demonstrates some pratical use cases for `concatMap` as well as `switchMap`. RxJS is powerful, and we see in this example how to solve the “ordering” problem in a very elegant and maintainable way.

本文将演示`concatMap`和`switchMap`一些实际用例。 RxJS非常强大，我们在这个例子中看到了如何以非常优雅和可维护的方式解决“排序”问题。


RxJS has its learning curve, though. I highly believe the best way to learn it is not by learning its operators, but rather by real-world use cases and how to solve them with RxJS. Stay tuned for further articles like this one.

不过，RxJS有它的学习曲线。我深信，学习它的最佳途径不是学习它的运算符，而是学习实际的用例，以及如何用RxJS来解决它们。请继续关注这篇文章。


*(@rxjs experts: nothing for you here, I’m sorry 😉)*

*（@rxjs专家：这里没什么，对不起😉）*

