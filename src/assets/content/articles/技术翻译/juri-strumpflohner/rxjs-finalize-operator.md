# RxJS finalize operator to execute logic on Observable termination

# 用 RxJS 的 finalize 操作符在 Observable 终止时执行逻辑

> In this article we’re going to have a look at the RxJS `finalize` operator. To have a practical use case, let’s take a look at disabling/enabling a form submit button during an HTTP request.
>
> 在本文中，我们要介绍 RxJS 的 `finalize` 操作符。作为范例，我们来实现一个 HTTP 请求期间禁用/启用表单提交按钮的功能。
>

## TL;DR: Here’s the corresponding Egghead lesson

## 太长不读版：它对应于 Egghead 上的课程


[View on Egghead.io](https://egghead.io/lessons/angular-execute-code-when-the-rxjs-observable-terminates-with-the-finalize-operator)

[在 Egghead.io 上查看](https://egghead.io/lessons/angular-execute-code-when-the-rxjs-observable-terminates-with-the-finalize-operator)


## Disabling/enabling a button during an Angular HTTP request

## 在 Angular HTTP 请求期间禁用/启用某个按钮


Let’s take a look at an RxJS `Observable` subscription:

来看看 RxJS 的 `Observable` 订阅：


```typescript
this.someService.fetchDataFromApi()
  .subscribe(
    result => {
      // success
    },
    err => {
      // some error happened
    }
  )
```

Assume this call is triggered by a button click on our form. Many people still double-click on those buttons and we definitely want to prevent 2 calls being sent to our backend API. There are different ways to avoid that of course, but for the purpose of this exable, let’s go the route of disabling the button once it has been clicked, and re-enable it when the http call terminates.

假设我们表单上的某个按钮会触发这个调用。很多人还可能双击那些按钮，而我们肯定不希望往后端 API 发送两个调用。当然，有多种方法可以避免这种情况，我们这里要用的方案是：一旦点击某个按钮，就禁用它，并在 http 调用结束时重新启用它。


```typescript
this.isLoading = true;
this.someService.fetchDataFromApi()
  .subscribe(
    result => {
      // success
      this.isLoading = false;
    },
    err => {
      // some error happened
      this.isLoading = false;
    }
  )
```

Whenever `isLoading` is set, we disable our button on the form. Now as in the example before, the `isLoading = false` instruction is duplicated, because we want to re-enable the button in both, success and error cases.

无论何时设置了 `isLoading`，我们都会禁用表单上的按钮。就像之前的例子中一样，`isLoading = false` 这段代码写了两次，因为无论成功还是失败，我们都要重新启用该按钮。


### Option 1: Using the `tap` operator?

### 选项 1：使用 `tap` 操作符？


One option could be the `tap` operator. For instance:

第一个选项是 `tap` 操作符。例如：


```typescript
this.isLoading = true;
this.someService.fetchDataFromApi()
  .pipe(
    tap(_ => {
      this.isLoading = false;
    })
  )
  .subscribe(
    result => {
      // success
    },
    err => {
      // some error happened
    }
  )
```

Using `tap` like this however, will only execute in case of a success and not when the observale throws an exception & terminates (such as in a failed Http call in Angular).

不过如果像这样使用 `tap`，它只会在成功的情况下执行，而不会在 Observable 抛出异常而终止时调用（例如在 Angular 中失败的 Http 调用）。

The operator however takes a config object that allows us to hook onto the `next`, `error` and `complete` event state of an Observable, very much like we can do in the `subscribe`.

不过，该操作符需要一个 config 对象，它允许我们挂钩一个 Observable 的 `next`、`error` 和 `complete` 事件状态，就像我们在 `subscribe` 中所做的那样。

```typescript
this.someService.fetchDataFromApi()
  .pipe(
    tap({
      next: (x) => {
        console.log('tap success', x);
        this.isLoading = false;
      },
      error: (err) => {
        console.log('tap error', err);
        this.isLoading = false;
      },
      complete: () => console.log('tap complete')
    }),
  )
  .subscribe(x => {
    console.log('Got result', x);
  }, (err) => {
    console.error('Got error', err);
  })
```

Here’s an example of using `tap` like that:

下面是一个使用 `tap` 的例子：

[点此打开](https://stackblitz.com/edit/rxjs-finalize-operator-aabtcm)

### Option 2: Using the `finalize` operator!

### 选项 2：使用 `finalize` 操作符！


Another option is to use the `finalize` operator. It’s like in the `try-catch-finally` programming construct which is present in most C based programming languages. Hence, we can modify our example from before to the following:

另一种选择是使用 `finalize` 操作符。就像在大多数基于 C 的编程语言中存在的 `try-catch-finally` 结构一样。这样，我们就可以修改前面的例子：

```typescript
this.isLoading = true;
this.someService.fetchDataFromApi()
  .pipe(
    finalize(() => {
      this.isLoading = false;
    })
  )
  .subscribe(
    result => {
      // success
    },
    err => {
      // some error happened
    }
  )
```

How does `finalize` work? It basically adds a callback to the teardown of the Observable, via `subscription.add(fn)`. This guarantees it will be called on `error`, `complete`, and `unsubscription`.

`finalize` 如何工作？它其实是通过 `subscription.add(fn)` 为这个 Observable 添加一个 teardown 回调函数。这样就可以保证它会在 `error`，`complete` 和 `unsubscription` 时被调用。

[点此打开在线例子](https://stackblitz.com/edit/rxjs-finalize-operator)

## Conclusion

## 结论


Note, the `finalize` operator is executed whenever **our Observable terminates**. This is important! For Angular HTTP this works perfectly, because the `Observable` returned by the Angular HTTP service “completes” once the request is done. That might not be the case if you have a custom Observable.

注意，只要**我们的 Observable 终止**，就会执行 `finalize` 操作符 。这很重要！对于 Angular HTTP 来说，这是完美的选择，因为一旦请求完成，Angular HTTP 服务返回的 `Observable` 就会 “完成（complete）”。如果你有自定义的 Observable，情况可能并非如此。


Check out [my corresponding video explaining the finalize operator](https://egghead.io/lessons/angular-execute-code-when-the-rxjs-observable-terminates-with-the-finalize-operator) or play directly with this Stackblitz code sample.

查看[我解释 finalize 操作符的视频](https://egghead.io/lessons/angular-execute-code-when-the-rxjs-observable-terminates-with-the-finalize-operator)或者直接看这个 Stackblitz 代码示例。


Happy coding!

编码快乐！


*Thx [Ben Lesh](https://mobile.twitter.com/BenLesh) for suggesting updates on the article*

*感谢 [Ben Lesh](https://mobile.twitter.com/BenLesh) 对这篇文章提出的修改建议*
