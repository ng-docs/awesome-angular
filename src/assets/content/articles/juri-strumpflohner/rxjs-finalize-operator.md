# RxJS finalize operator to execute logic on Observable termination

# RxJS finalize运算符在Observable终止时执行逻辑


> 原文：<https://juristr.com/blog/2019/04/rxjs-finalize-operator/>
>
> 原文： [https](https://juristr.com/blog/2019/04/rxjs-finalize-operator/) ： [//juristr.com/blog/2019/04/rxjs-finalize-operator/](https://juristr.com/blog/2019/04/rxjs-finalize-operator/)
>
>
> 原作者：[Juri Strumpflohner](/authors/juristr)
>
> 原作者： [Juri Strumpflohner](/authors/juristr)
>
>
> In this article we’re going to have a look at the RxJS `finalize` operator. To have a practical use case, let’s take a look at disabling/enabling a form submit button during an HTTP request.
>
> 在本文中，我们来看看RxJS的`finalize`操作符。为了得到一个实际的用例，让我们来看一下HTTP请求期间是否禁用/启用表单提交按钮。
>

## TL;DR: Here’s the corresponding Egghead lesson

## TL; DR：这是相应的Egghead课程


 [View on Egghead.io](https://egghead.io/lessons/angular-execute-code-when-the-rxjs-observable-terminates-with-the-finalize-operator)

[在Egghead.io上查看](https://egghead.io/lessons/angular-execute-code-when-the-rxjs-observable-terminates-with-the-finalize-operator)


## Disabling/enabling a button during an Angular HTTP request

## 在Angular HTTP请求期间禁用/启用某个按钮


Let’s take a look at an RxJS `Observable` subscription:

来看看RxJS的`Observable`订阅：


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

假设我们的表单上有一个按钮，就会触发这个调用。很多人还是会双击那些按钮，我们肯定要阻止2个调用被发送到我们的后端API。当然，有不同的方法可以避免这种情况，但是为了达到这个目的，让它一路走来，一旦点击它就会禁用该按钮，并在http调用终止时重新启用它。


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

无论何时设置了`isLoading` ，我们都会禁用表单上的按钮。就像之前的例子中一样， `isLoading = false`指令是重复的，因为我们要在成功和错误两种情况下重新启用该按钮。


### Option 1: Using the `tap` operator?

### 选项1：使用`tap`操作符？


One option could be the `tap` operator. For instance:

一个选项可能是`tap`操作符。例如：


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

但是，像这样使用`tap` ，只会在成功的情况下执行，而不是在observale抛出异常并终止时（例如在Angular中失败的Http调用中）。


The operator however takes a config object that allows us to hook onto the `next`, `error` and `complete` event state of an Observable, very much like we can do in the `subscribe`.

但是，该运算符需要一个config对象，它允许我们挂钩一个Observable的`next` ， `error`和`complete`事件状态，就像我们在`subscribe`做的那样。


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

这是一个使用`tap`这样的例子：


### Option 2: Using the `finalize` operator!

### 选项2：使用`finalize`操作符！


Another option is to use the `finalize` operator. It’s like in the `try-catch-finally` programming construct which is present in most C based programming languages. Hence, we can modify our example from before to the following:

另一种选择是使用`finalize`操作符。就像在`try-catch-finally`编程结构中一样，它存在于大多数基于C语言的编程语言中。因此，我们可以修改前面的例子：


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

如何`finalize`工作？它基本上通过`subscription.add(fn)`为这个Observable的拆机添加一个回调函数。这样就可以保证它在`error` ， `complete`和`unsubscription`上被调用。


## Conclusion

## 结论


Note, the `finalize` operator is executed whenever **our Observable terminates**. This is important! For Angular HTTP this works perfectly, because the `Observable` returned by the Angular HTTP service “completes” once the request is done. That might not be the case if you have a custom Observable.

注意，只要**我们的Observable终止，**就会执行`finalize`运算**符** 。这很重要！对于Angular HTTP来说，这是完美的，因为一旦请求完成，Angular HTTP服务返回的`Observable` “完成”。如果你有自定义的Observable，情况可能并非如此。


Check out [my corresponding video explaining the finalize operator](https://egghead.io/lessons/angular-execute-code-when-the-rxjs-observable-terminates-with-the-finalize-operator) or play directly with this Stackblitz code sample.

查看[我的相应视频，解释finalize操作符，](https://egghead.io/lessons/angular-execute-code-when-the-rxjs-observable-terminates-with-the-finalize-operator)或者直接看这个Stackblitz代码示例。


Happy coding!

快乐的编码！


*Thx [Ben Lesh](https://mobile.twitter.com/BenLesh) for suggesting updates on the article*

*Thx [Ben Lesh](https://mobile.twitter.com/BenLesh)建议对这篇文章进行更新*

