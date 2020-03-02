# Guarantee Event Order with RxJS

# 用 RxJS 保证事件顺序


> use concatMap to guarantee ordering of events
>
> 使用 concatMap 来保证事件的排序
>

When you create dynamic UIs, you have to deal with async stuff a lot. Most often they are triggered by some user interaction. Things usually get tricky when you need to guarantee certain operations are executed in order. Since they are async we might not know which one returns first. Let's see how RxJS can help a lot here.

当你创建动态界面时，经常要处理异步。它们一般是由某些用户交互触发的。当你需要保证某些操作按顺序执行时，事情往往会变得很棘手。由于它们是异步的，我们可能无法知道哪一个会先返回。让我们来看看 RxJS 在这种情况下要怎样提供帮助。


In order to illustrate **the problem** I created an example use case, simplified of course, but still it represents a potential real world use case.

为了说明**这个问题**，我创建了一个示范用例。它简化过，但也代表了一个潜在的真实用例。


**Table of contents**

**目录**


- [TL;DR: Here’s the corresponding Egghead lesson](#tl-dr-here-s-the-corresponding-egghead-lesson)

  [太长不读版：这是相应的 Egghead 课程](#tl-dr-here-s-the-corresponding-egghead-lesson)


- [The Problem](#the-problem)

  [问题](#the-problem)


- [We need to guarantee ordering](#we-need-to-guarantee-ordering)

  [我们需要保证顺序](#we-need-to-guarantee-ordering)


  - [A short note on wrapping `setTimeout` as Observable](#a-short-note-on-wrapping-settimeout-as-observable)

    [把 `setTimeout` 包装成 Observable 的简短说明](#a-short-note-on-wrapping-settimeout-as-observable)

  - [The entire `concatMap` example](#the-entire-concatmap-example)

    [完整的 `concatMap` 例子](#the-entire-concatmap-example)


- [Optimizing with `switchMap`](#optimizing-with-switchmap)

  [用 `switchMap` 进行优化](#optimizing-with-switchmap)


- [`switchMap` - potential race conditions](#switchmap---potential-race-conditions)

  [`switchMap` - 潜在的竞态条件](#switchmap---potential-race-conditions)


- [Conclusion](#conclusion)

  [结论](#conclusion)


We basically have the following user interface:

我们大致会有如下用户界面：


![](gurantee-event-order-with-rxjs_images/rxjs-order-guarantee.png)


When the user **checks** some option, an http request is made to retrieve some value and once the request returns, the response is added to a list visualized below.

当用户**选中**某个选项时，就会发出一个 http 请求来获取一些值，一旦请求返回，就会把响应添加到下面的可视化列表中。


> For the sake of simplicity, in this fake example I simply use a `setTimeout(..)` to simulate the asyncronous request.
>
> 为了简单起见，在这个伪造的例子中，我仅仅用 `setTimeout(..)` 来模拟异步请求。
>

When the user again **deselects** the option, the corresponding value is removed from the list below (without any async request).

当用户再次**取消选中**该选项时，相应的值也会从下面的列表中删除（但不需要任何异步请求）。


## TL;DR: Here’s the corresponding Egghead lesson

## 太长不读版：这里是相应的 Egghead 课程


[View on Egghead.io](https://egghead.io/lessons/angular-guarantee-ordering-of-events-with-rxjs)

[在 Egghead.io 上查看](https://egghead.io/lessons/angular-guarantee-ordering-of-events-with-rxjs)


## The Problem

## 问题


The async request made when checking an option might take a while before coming back of course. That said, what happens when the user double-clicks 😕?

选中某个选项时发出的异步请求当然要过一段时间才能返回。那么在用户双击时会发生什么？


Well, try by yourself:

[亲自试试](https://stackblitz.com/edit/blog-guarantee-order-wrong)吧。

As you can see, we might get an inconsistent state. When - for instance - quickly double-clicking on “Option 1” we get the option selected & then unselected again, but the async call coming later still adds the option to the list.

如你所见，我们可能会得到不一致的状态。例如，当快速双击“Option 1”时，我们就会选中该选项，然后再次取消选中，接下来的异步回调仍然会把该选项添加到列表中。


The issue is quite clear by looking at what happens in the checkbox selection event:

通过审视复选框选中事件中所做的事就可以看清问题之所在：


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

由于较慢的异步调用会在稍后返回，因此它仍会添加记录，而不管我们是否在此期间取消选中了它。


## We need to guarantee ordering

## 我们需要保证顺序


We somehow need to guarantee ordering of the events. Thus, when double-clicking, we need to make sure that the logic for “unchecking” is executed only after a potential async call returns. Implementing this can be quite tricky. You could check whether the corresponding option is still checked when the async call returns and only in that case execute the logic. Alternatively, you could hold some flag, blocking other logic to be executed while an async call is running…  
Not really satisfying and hacky.., and again, this is just a small simple fake example.

我们必须保证此事件的顺序。因此，当双击时，我们需要确保只有在潜在的异步调用返回后才能执行“取消选中”的逻辑。这很棘手。当异步调用返回时，你可以检查相应的选项是否仍在选中状态，并且只有在这种情况下才执行该逻辑。或者，你也可以保存一些标志，当正在执行异步逻辑期间阻塞其它逻辑……  
这无法令人满意，只是取巧罢了……而且，这还仅仅是个简单的小例子。


Well, turns out that if you know RxJS, this is quite easily achievable: using the `concatMap` operator.

好吧，是主角登场的时候了。如果你懂 RxJS，那么这很容易实现：使用 `concatMap` 操作符。


> `concatMap` - Map values to inner observable, subscribe and emit in order.
>
> `concatMap` - 按顺序将值映射为内部的 Observable，并且按顺序订阅这个内部 Observable、并且按顺序发送值。
>

**The idea is to pipe the events** from the checking/unchecking into a RxJS subject and then process them one after the other.

**其思路是把选中/取消选中的事件通过管道发送**到一个 RxJS Subject 中，然后依次处理它们。


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

我们会在 `concatMap` 中实现处理这些动作的逻辑。


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

当我们收到一个选中事件时，就会执行这个异步调用；如果没收到就触发一个从列表中删除该项的动作。我们总是要返回一个 Observable。 `concatMap` 会订阅那个“内部 Observable”，只有当前一个“完成（complete）”时才会继续执行下一个“内部 Observable”，这样就**保证了事件的顺序** 。


> An Observable “completes” once it is done. It is similar to the `resolve(..)` of a `Promise`.
>
> 一旦 Observable “完事”了就会 `complete`。这里的 `complete` 就像是 `Promise` 的 `resolve(..)`。
>

### A short note on wrapping `setTimeout` as Observable

### 对于把 `setTimeout` 包装成 Observable 的简短说明


You remember we use `setTimeout` to simulate an async call. Well, we need to wrap it into an Observable. There are two ways of doing it.

还记得如何用 `setTimeout` 模拟异步调用吧。好，我们现在要把它包装进一个 Observable 中。有两种方法可以做到这一点。


**Using the `timer` observable** - we can simply use the existing `timer(..)` which the RxJS exposes for us:

**使用 `timer` ** Observable - 我们可以简单地使用 RxJS 提供的现有 `timer(..)` 函数：


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

另外，我们还**可以用 `Observable.create(...)` 自行创建一个 Observable** ：


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

### `concatMap` 的完整例子


Alright, now that we know how to wrap our `setTimeout` as an observable, let’s continue with the implementation of the `concatMap` logic.

好，既然我们已经知道如何把 `setTimeout` 包装成一个 Observable 了，就接着看如何实现 `concatMap` 逻辑吧。


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

在 `selectionObject` 的 `.subscribe(...)` 中，我们会解析这个动作，并影响结果列表：


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

太棒了！现在，每当用户单击复选框时，我们就不在其事件处理程序中实现这个逻辑，只要把它传给 `selectionSubject` 就可以了。


```typescript
onCheckListChange(data: SelectionEvent) {
  this.selectionSubject.next(data);
}
```

Here’s the according Stackblitz example to play around with. Check it out, double-clicking works perfectly now!

下面是 Stackblitz 上的例子。看！它对双击操作处理得完美！

[在线例子](https://stackblitz.com/edit/blog-guarantee-order-switchmap?ctl=1)

## Optimizing with `switchMap`

## 用 `switchMap` 进行优化


But can do even better. In the current `concatMap` example, when the user double-clicks, we effectively wait until the async call comes back and then remove it again. But why even execute the async logic. When the user double-clicks we can just abort the previous action and not even execute it, thus save time.

但还可以更进一步。在当前的 `concatMap` 例子中，当用户双击时，我们会等到异步调用返回后再删除它。那为什么还要先执行异步逻辑呢？当用户双击时，其实我们可以直接取消上一个操作，甚至都不用执行它，更节省时间。


That’s what `switchMap` does. In contrast to `concatMap`, it doesn’t execute the actions (our Observable events) in sequence, but rather it cancels the previous Observable.

这就是 `switchMap` 所做的事。与 `concatMap` 不同，它不会等待上一个动作（也就是我们的 Observable 事件）执行完，而是会直接取消上一个 Observable。


> **Watch out!!** While for this use-case *cancelling* was an option, this might not always be the case. So be careful to evaluate between using `concatMap` or `switchMap`.
>
> **小心!!** 虽然在这个用例下*取消*是一种合理的选择，但可能并非所有情况下都是如此。所以在用 `concatMap` 或 `switchMap` 时一定要小心。
>

Here’s a Stackblitz example. Pay particular attention to the console log. In the `setTimeout(..)` a log is written (`console.log('Returning data');`). If you double-click, that log doesn’t even appear, proving that the async action is not even executed.

这是 Stackblitz 上的一个例子。要特别留意控制台日志。我们在 `setTimeout(..)` 中写了一个日志（`console.log('Returning data');`）。如果双击，该日志就不会出现，表示该异步操作甚至没有执行过。

[在线例子](https://stackblitz.com/edit/blog-guarantee-order-switchmap)。

## `switchMap` - potential race conditions

## `switchMap` - 潜在的竞态条件


Ok, so we’ve learned, that with `switchMap` we can optimize our `concatMap` approach in that we cancel the previous observable, thus preventing from even executing that (possibly costly logic) in case when the user double-clicks on one of our checkboxes. But there’s a caveaut here: **what if the user quickly clicks the 1st and then 2nd checkbox?** We would actually cancel the click of the 1st checkbox, thus preventing it from being properly activated. Let’s see how to fix that.

好，我们已经知道，可以用 `switchMap` 来优化 `concatMap` 方法，因为我们取消了前一个 Observable，以免当用户双击某个复选框的情况下执行该操作（其逻辑可能有开销）。但是，这里还有个问题： **如果用户点击了第一个复选框之后快速点击第二个，该怎么办呢？** 我们实际上会取消对第一个复选框的点击，这会阻止它被激活，这样显然是不对的。我们来看看如何解决这个问题。


[Kwinten](https://mobile.twitter.com/KwintenP) suggested to use `mergeMap` in this case and then handling the “cancelling” optimization by using the `takeUntil` operator, verifying whether a second event from the same checkbox comes in. Here’s how to achieve that:

[Kwinten](https://mobile.twitter.com/KwintenP) 建议在这种情况下使用 `mergeMap`，然后使用 `takeUntil` 操作符来处理“取消”这种优化逻辑，使其验证第二个事件是否从同一个复选框进来的。下面是实现方式：


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

如你所见，这个“异步”的 Observable 有一个 `takeUntil` 操作符，当 `selectionSubject` 上发生的新事件具有和我们曾处理的事件相同的 id 时，它就会停止那个 Observable。因为这种场景其实就是在双击同一个复选框。在所有其它情况下，我们只会完成这个 Observable，让它继续运行而不用终止它，这样就解决了快速点击多个不同复选框时的潜在问题😃。


And here’s the according modified Stackblitz to play around with.

下面是修改后的 Stackblitz 版本。

[在线例子](https://stackblitz.com/edit/blog-guarantee-order-mergemap)。

## Conclusion

## 结论


This article demonstrates some pratical use cases for `concatMap` as well as `switchMap`. RxJS is powerful, and we see in this example how to solve the “ordering” problem in a very elegant and maintainable way.

本文演示了 `concatMap` 和 `switchMap` 的一些实战用例。RxJS 非常强大，我们在这个例子中看到了如何以非常优雅和可维护的方式解决“操作顺序”的问题。


RxJS has its learning curve, though. I highly believe the best way to learn it is not by learning its operators, but rather by real-world use cases and how to solve them with RxJS. Stay tuned for further articles like this one.

不过，RxJS 也有它的学习曲线。我深信，学习它的最佳途径不是学习其运算符，而是学习实际的用例，以及如何用 RxJS 来解决这些用例。请继续关注今后的类似文章。


*(@rxjs experts: nothing for you here, I’m sorry 😉)*

*（@各位 rxjs 专家：本文对你没啥用，抱歉😉）*
