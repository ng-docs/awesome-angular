# Angular 9 - 新增与改变

> 来自：<https://www.youtube.com/watch?v=TcdhAxDWWxM>

0:00:00.310,0:00:05.040
Angular 9 was released. Now. What does this mean for you and your project in this video?

Angular 9 已经发布了。本视频将告诉你这对于你和你的项目意味着什么。

0:00:05.040,0:00:09.719
I'll walk you through the most important changes and what they mean for you and the angular landscape

我将带你遍历一些最重要的改动，以及它们对你和 Angular 生态圈意味着什么。

0:00:12.260,0:00:17.350
So, let's have a look at the new things angle or 9 brought to us and there is one big

好，我们先看看 Angular 9 带给我们的一些新东西，Angular 9 中有一个重大的新特性

0:00:17.810,0:00:21.730
the main new feature in angular 9 and that is

这个新特性就是 Ivy。

0:00:22.250,0:00:27.729
IV now in case you don't know what obvious it's their new internal view rendering engine

如果你还不知道它是什么，一句话概括它就是新的内部渲染引擎。

0:00:27.739,0:00:34.899
Which means it's the logic that brings your angular app to life. You could almost say it's the thing which

这意味着它就是给你的 Angular 应用带来生命的那部分逻辑。你可以这样来形象地理解它：

0:00:35.450,0:00:41.229
uses your components or templates and which in the end turns all of that all of the

它使用你的组件或模板，并最终把你写的所有

0:00:41.480,0:00:48.670
Component and template logic you write into instructions that run in the browser when you ship your finished angular

组件和模板逻辑都转换成一些计算机命令，当你发布 Angular 应用时，浏览器会执行它们。

0:00:49.160,0:00:53.410
Application. These are the instructions that really change the Dom

这些计算机命令才会真正修改 DOM。

0:00:53.410,0:00:57.459
they're after updated Dom render stuff to the page ends on and

更新完 DOM 之后，这些内容就会被渲染到页面上。

0:00:58.040,0:01:00.909
Therefore the fact that we have a new rendering engine

总之，我们有了一个新的渲染引擎

0:01:01.610,0:01:09.489
Means that it's a under the hood change the API the syntax you work with the way you create

这意味着，API 的幕后实现发生了变化，而你创建 Angular 应用时所用的语法

0:01:09.740,0:01:16.210
Angular applications components modules and so on that has all not changed

包括组件、模块等等，都没有发生任何变化。

0:01:16.210,0:01:18.249
It's still the same as before so

它们仍然跟以前一样。

0:01:18.859,0:01:25.149
Everything you learned about angular still is valid and relevant because that is under the hood change

你学会的关于 Angular 的一切都仍然有效，这是因为发生改变的只是其幕后实现

0:01:25.460,0:01:29.499
Still it isn't important under the hood change now

而目前来讲，这些幕后的变化对你来说并不重要

0:01:29.499,0:01:31.689
What's the cool thing about this new rendering engine?

这个新的渲染引擎有哪些激动人心的东西呢？

0:01:31.969,0:01:39.219
It already offers smaller bundles for most angular apps not necessarily for all but the team is working on making

对于大多数 Angular 应用来说，它已经提供了更小的打包尺寸。它虽然还不是所有应用都能看到效果，不过开发组仍在努力让

0:01:39.350,0:01:44.259
Every angular app smaller and especially for very large apps the size

每个 Angular 应用都能更小一点，特别是对于超大型应用来说，体积的改进

0:01:44.509,0:01:48.519
Improvements can be very significant and over the next months and years

可能会非常明显，这种努力还会持续几个月甚至几年。

0:01:48.520,0:01:53.950
Of course the angular team continues to work on Ivy and ensure that we get smaller and smaller

当然，Angular 开发组会继续改进 Ivy，以确保我们的打包尺寸越来越小

0:01:54.380,0:01:57.369
bundles and therefore less code our users have to download

最终，我们的用户要下载的代码也越来越少

0:01:58.219,0:02:01.178
So since the code we write hasn't changed

而既然我们写的代码并没有改变

0:02:01.179,0:02:08.139
It's basically a free win we get here where we magically now get smaller bundles. Thanks to this new rendering engine

说到底，这是一场免费的胜利，我们魔术般的得到了更小的打包尺寸。这多亏了新的渲染引擎！

0:02:08.840,0:02:16.330
smaller bundles of course are always great because it means our users have to download less code until our app starts up and in

更小的打包尺寸显然是极好的，因为它意味着我们的用户只需要在应用启动时下载更少的代码。

0:02:16.400,0:02:21.250
Addition ivy also is written a way that offers an amazing runtime performance

另外，Ivy 还提供了惊人的运行时性能

0:02:21.440,0:02:28.630
so the idea basically is that with this new engine our apps startup fair and once they did startup they also are

所以，简单来说，使用这个新的引擎，我们的应用可以更干净利落地启动，并且启动完之后，它们还

0:02:28.970,0:02:31.270
Extremely fast all thanks to ivy

运行得超级快。感谢 Ivy！

0:02:32.210,0:02:37.899
Another thing that changed with angular 9. Is that when you build your app for development?

Angular 9 改变的另一件事情是在开发期间你何时构建应用。

0:02:37.900,0:02:40.270
So when you run ng serve in your application

当你在应用中运行 ng serve 时

0:02:40.270,0:02:45.790
It will by default use ahead of time compilation and in the past in older angular versions

它将默认使用 AOT 预先编译模式，而在以前的老版本应用中

0:02:45.790,0:02:48.129
It used just-in-time compilation there

它使用 JIT 即时编译模式

0:02:48.290,0:02:51.279
Now, of course, technically that should give you the same app

虽然，理论上你最终得到的都是同一个应用。

0:02:51.280,0:02:57.820
But because of the way it does compile your code there actually can be some differences or bugs

但是因为你的代码的编译途径不同，这两种版本实际上会有一些差异或 BUG。

0:02:57.950,0:03:04.000
In the content it spits out notice already could lead to some errors being thrown during ahead of time compilation

它们在内容处理方式上的差异，可能会导致在 AOT 编译期间抛出一些错误。

0:03:04.430,0:03:07.239
Which you wouldn't get during just-in-time compilation

而在 JIT 编译期间，这些错误却不会出现。

0:03:07.850,0:03:15.790
but one important new feature that was also held with angular 9 is that you can configure how your templates should be checked

但是 Angular 9 还有另一项重要的特性，就是你可以配置如何对模板进行检查

0:03:15.790,0:03:23.409
So how the types you're using in your templates should be checked some basic support was available in the past too now

也就是说，你将如何对模板进行类型检查。以前的版本只有一些基本的支持，而现在

0:03:23.410,0:03:24.910
It's a bit more detailed

它更详尽了。

0:03:24.910,0:03:31.089
You can switch between three different modes the basic mode the full mode and the strict mode

你可以在三种不同的模式之间切换：基本模式、完全模式、严格模式。

0:03:31.340,0:03:34.510
This simply determines how angular will parse your

它会决定 Angular 将如何解析你的

0:03:34.850,0:03:40.629
component templates and which things it will check and for which things it will throw errors and

组件模板，以及要检查哪些东西，并抛出错误。

0:03:41.180,0:03:45.700
Dispatch on the official docs indeed is the best way to learn all about the differences

阅读官方文档是了解这些差异的最好方式

0:03:46.010,0:03:53.139
Generally and probably as no surprise the strict mode is well the strictest mode of all of them

一般来说，严格模式可能是这三种模式中最严格的。

0:03:53.140,0:03:57.220
Which does the most checks and I want to show you where the strict mode

它会做最多的检查。接下来我要给你展示严格模式与

0:03:57.500,0:04:02.769
Differs from the full mode which already existed in the past now, first of all, let's check that

现有的完全模式之间的一些差异。首先，我们先看看

0:04:02.769,0:04:08.739
It's not turned on right now in TS config dot. Jason or in the TS config app dot

在 tsconfig.json 或 tsconfig.app.json 中是否打开了严格模式

0:04:08.930,0:04:12.940
Jason, which in the end inherits from that master. Jason file here

tsconfig.app.json 从 tsconfig.json 中继承了设置

0:04:13.070,0:04:20.559
You can turn on the template type checks with full template type check set to true inside of the angular compiler

你可以在 angularCompilerOptions 中把 fullTemplateTypeCheck 设置为 true 来打开模板类型检查。

0:04:20.810,0:04:24.070
Options and this is an option. You already could use in the past

你以前可能用过它了。

0:04:24.350,0:04:29.109
This will check your templates for a lot of different things and catch a lot of errors

这将会对你的模板做大量检查，并捕获大量错误

0:04:29.330,0:04:34.599
for example with this mode already if I go to my app component template where I

比如在这种模式下，如果我的组件模板中

0:04:35.180,0:04:41.890
Have my user property here in the app component if I try to use user dot

有一个 user 属性，如果我尝试使用 user.hobbies

0:04:42.890,0:04:47.919
Hobbies here a key which does not exist in my user object there

而这个 hobbies 并不存在于 user 对象中。

0:04:47.920,0:04:55.089
I already get an error if I try to save this, it does compile but it also shows me this error in the end

如果我尝试保存它，立刻就能得到一个错误，它还没有编译，就已经向我报告了错误。

0:04:55.090,0:04:56.990
So that's some check I already have in place

也就是说我已经获得了一些就地检查信息

0:04:56.990,0:05:03.640
I can for example access user dot H, though because we have an H property in that user object

比如，我可以访问 user.age，因为我们的 user 对象中有一个 age 属性。

0:05:04.160,0:05:07.600
Now nonetheless. This actually should also yield an error

尽管如此，这实际上还是会抛出一个错误

0:05:07.880,0:05:11.679
Why because if we have a look at the user component, which I'm using here?

为什么呢？如果看看 user 组件就会看到我们正在用哪一个。

0:05:11.720,0:05:14.799
We see that the name property to which I'm binding

可以看到，我们正在绑定到的 name 属性

0:05:15.230,0:05:19.569
Actually is of type string and if we take a closer look at the user object

实际上是 string 类型的，而如果我们仔细看 user 对象

0:05:19.570,0:05:24.640
We see that the H property there is a number so I'm actually passing a number

就会发现它的 age 属性是一个数字，所以，我实际上是在把一个数字传给

0:05:25.040,0:05:27.399
into this name property

name 属性

0:05:27.740,0:05:35.590
It's not a string now with angular 9 we can go back to that TS config dot JSON file and add a new option here

age 不是 string，在 Angular 9 中，我们可以回到 tsconfig.json 文件中，并且在此添加一个新的选项

0:05:35.870,0:05:42.010
Strict templates and set this to true and if we do this it will take this into account

strictTemplates，并且把它设为 true，然后编译器就会考虑这一点

0:05:42.230,0:05:47.890
Let's restart ng surf to make sure it picks up the new configuration and let's see what this gives us now

重启 ng serve，以便让它使用新的配置。让我们看看它会带给我们什么

0:05:49.589,0:05:53.488
This will now compile the application and it now gives us an error

它现在会编译该应用，并且给我们汇报一个错误。

0:05:53.919,0:06:01.079
It gives us an error that type number is not assignable to type string you see at the least of point of time I'm recording this

它告诉我们，number 类型不能赋值给 string 类型。至少在我录制本视频的时候是这样的。

0:06:01.079,0:06:07.888
I'm not getting an error in my IDE here because Visual Studio code and the angular language service

我在 IDE 中没有看到错误，是因为 VSCode 和它使用的 Angular 语言服务

0:06:07.889,0:06:12.359
Which gets used by Visual Studio code does not know about this new setting yet

尚未支持这个新设置。

0:06:12.519,0:06:16.259
But I get an error here in a compiler and it catches this

但是我在编译器中得到了这个错误，并且它捕获了这个

0:06:16.539,0:06:22.738
Unnecessary error where I'm passing the wrong type of data into this component once I switch this to dot name

非必要错误：我把错误的数据类型传给了该组件。一旦我把它改成 .name

0:06:22.809,0:06:29.039
Which refers to this name, which is a string which therefore has two data type. I expect here this of course goes away

它就会引用用户名，用户名是 string，也就不再是两个不同的类型了。我认为这个问题应该解决了。

0:06:29.139,0:06:34.019
So after making this change here you see if I restart this to show you that it

所以，在做完这次修改之后，你会看到它

0:06:34.269,0:06:38.039
Recompiles without errors it will do so without any errors

重新编译，而不再有任何错误

0:06:38.859,0:06:41.729
Here it is running the way it should so that's an average

它运行得很正常。Angular 9 在传统的检查之外，

0:06:42.129,0:06:49.498
Tradition added by angular 9 this extra checking mode and if you turn it on you can avoid unnecessary mistakes

还提供了这些额外检查，如果你打开它，就可以消除一些不必要的失误。

0:06:49.629,0:06:53.638
Which might not have necessarily crashed your application in the past?

以前这可能导致你的应用出现一些低级错误。

0:06:53.889,0:06:58.589
But which still might be something you want to look into and you want to fix?

但是，你可能想要研究并解决这些问题。

0:06:59.709,0:07:04.589
angular 9 also brought some minor breaking changes in deprecations and

Angular 9 还带来了一些小的破坏性变更和弃用

0:07:05.079,0:07:11.669
For that to learn more the best way really is to go to the official angular 9 update guide which you find on

欲知详情，最好的方式是到官方文档中的 Angular 9 升级指南

0:07:11.769,0:07:15.119
angular io and there you can learn more about the

在那里你会学到关于

0:07:15.519,0:07:20.459
Deprecations and changes and I can already tell there is nothing major in there

弃用和更改的更多知识。我要告诉你的是没有什么重大更改

0:07:20.459,0:07:25.138
Of course we have Ivy which is not a change where we have to change anything

当然，我们有了 Ivy，但是我们不需要为此而改变任何东西

0:07:25.139,0:07:28.769
It's just under the hood change change typescript version

它只是在幕后更改了 TypeScript 版本

0:07:28.769,0:07:35.819
Yep, that is not too hard and then some deprecations of features, which you most likely didn't use anyway

当然，那也不难，并且一些弃用的特性你可能根本没用过

0:07:35.819,0:07:42.238
So you can safely ignore that no application should be broken because of updating to angular 9

所以你可以放心的升级到 Angular 9，而不会有什么应用被破坏。

0:07:42.939,0:07:43.829
speaking of that

简单说说吧

0:07:43.829,0:07:45.359
If you have an application

如果你有一个应用

0:07:45.359,0:07:46.179
You want to update?

你要升级吗？

0:07:46.179,0:07:53.819
you can simply run ng update at angular CLI at angular core and fire the point of time you're watching this video - - next

你可以运行 ng update @angular/cli @angular/core。在我录制这个视频的时间点，可能还要加上 --next

0:07:53.819,0:08:00.208
Is not required anymore because then that next version will already be the current version angular 9

不过以后就不需要了，因为那时候 Angular 9 可能已经正式发布了

0:08:00.489,0:08:04.469
So this is a simple command you can run in angular project and it will

所以，你可以在 Angular 应用中运行这条简单的命令，它会

0:08:04.690,0:08:09.869
Automatically perform all the package updates ends on that are required to update your application

自动在想要升级的应用上执行针对所有包的升级工作。

0:08:11.590,0:08:19.260
Now one of the bigger changes we also have with angular 9 and which we actually already had with angular 8 is

现在，我们来讲讲 Angular 9 所做的一项比较大的修改，我们实际上在 Angular 8 就已经开始做了。

0:08:19.480,0:08:22.799
that when you're using at view child in your

当我们在组件中使用 @ViewChild 来从

0:08:23.050,0:08:29.550
Components to select some element from your template and work with it in your component. You have to add this extra

模板中选择某个元素，并在组件中使用它时，你不得不加上这个额外的

0:08:30.100,0:08:31.710
static option

static 选项

0:08:31.710,0:08:35.009
I got an example project here, very simple one and

这里有一个范例项目，非常简单

0:08:35.470,0:08:41.249
There in my new product component I use at view child to get access to one of my inputs

在这个新的 Product 组件中，我使用 @ViewChild 来访问我的输入框之一

0:08:41.470,0:08:47.160
Simply just to show this change not because there wouldn't be another way there would be with ng-model

这里只是为了演示这项修改，而不是因为不能用 ngModel 等方式

0:08:47.710,0:08:55.560
but here I am using at view child and an angular 8 you already had to add this second argument to add view child and

这里我要用 @ViewChild，并且在 Angular 8 中你已经被迫给 @ViewChild 加上了第二个参数，

0:08:55.750,0:08:58.590
Set static to false in most scenarios

大多数情况下它都被设置为 false

0:08:59.380,0:09:05.820
Now in angular 9 whenever static was set to false you can just get rid of this argument

现在，在 Angular 9 中，当 static 被设置为 false 时，你就可以抛掉这个参数了

0:09:05.820,0:09:12.270
You're back to the mode we had before an angular 7 and older so we can just use add view child like this

你回到了 Angular 7 或更早的模式，所以我们可以像这样使用 @ViewChild

0:09:12.340,0:09:16.560
There is just one exception if you want to use this element before

这里只有一个例外，如果你要在运行变更检测之前使用该元素

0:09:16.720,0:09:21.060
Change detection ran which is typically the case in ng on in it. For example

比如，典型的是在 ngOnInit 中使用它。

0:09:21.700,0:09:27.030
You have to add static true. So static false basically never needs to be added

你就必须加上 static: true。所以永远不用加 static: false。

0:09:27.030,0:09:36.150
It's the default but static true needs to be added if you access the element you're getting access to inside of ng on in it

它是默认选项，但如果你要在 ngOnInit 中访问它，就需要加上 static: true。

0:09:36.150,0:09:38.150
So before change detection ran

这样它才能在运行变更检测之前使用

0:09:38.350,0:09:42.360
Then you need to add this you already needed to do this in angular 8

然后，你需要在 Angular 8 中添加该选项。

0:09:42.360,0:09:47.969
You still need to do it an angular 9 the difference to angular 8 justice dead in angular 8

在 Angular 9 中你仍然需要像 Angular 8 中那样做。

0:09:47.970,0:09:53.279
You also need to add this for aesthetic false in angular 9 if it's false, you can omit it

如果为 false，你仍然可以出于美观而添加它，但是你也可以省略它

0:09:53.380,0:09:57.030
so true always required false can be omitted and

所以，true 是始终需要的，而 false 可以省略。

0:09:57.580,0:10:02.340
This is already it so doesn't really sound like a lot changed does it?

这看起来也没有大量改动，不是吗？

0:10:02.620,0:10:10.260
well IV is a big change even though it's just under hood and therefore we don't see it but getting smaller bundles in our

虽然 Ivy 是一个重大升级，但它只是幕后的，所以我们不用关心它，只要享受更小的应用打包尺寸就可以了。

0:10:10.780,0:10:15.089
Applications is a huge win since we don't need to change our code to benefit from that

这是巨大的胜利，因为我们不需要修改自己的代码就可以从中获益。

0:10:15.750,0:10:20.219
And in addition when we think about angular 10 and the future of angular in general

另外，当我们思考 Angular 10 以及 Angular 的未来时

0:10:20.220,0:10:22.650
I we will most likely play a major role

我们都有可能发挥重要作用

0:10:22.650,0:10:29.429
Of course the angular team continues to work on IB and the effort will see more and more Assizes improvements and all the runtime performance

当然，Angular 开发组会持续改进 Ivy，这些努力会带来更小的打包尺寸以及更好的运行时性能

0:10:29.770,0:10:34.619
Improvements over time which we all get for free because it's the underlying rendering engine

随着时间的推移，我们将免费从中获益，因为它只是底层的改动。

0:10:34.620,0:10:39.270
so this is a huge change and in addition besides bug fixes and other improvements

所以，除了 bug 修复和其它改进之外，这还是一个巨大的变化。

0:10:39.580,0:10:44.039
we might also see new api's or new syntax

我们还可能会看到新的 API 和新的语法

0:10:44.040,0:10:46.440
We can use in angular apps to build our apps

我们可以在 Angular 应用中使用它

0:10:46.630,0:10:53.159
That is possible because of IB which does not mean that you have to relearn everything and

这些都是可能的，因为 Ivy 并不要求我们重新学习任何东西。

0:10:53.410,0:11:01.020
you will write your angular apps in a totally different way, but if some things will get easier over time, for example, if you at some point

而你将用完全不同的方式编写 Angular 应用，但是随着时间的推移，有些事情会变得更容易，比如，未来的某一天

0:11:01.560,0:11:06.900
Don't need energy modules anymore or something like that, then certainly no one would complain

你可能不需要模块或某些类似的东西，那肯定没人会抱怨的。

0:11:07.510,0:11:14.219
so we'll see improvements there will obviously get the size improvements and we might see exciting new features based on IV in

所以，我们会看到一些明显的改进，比如体积的优化，我们还会在 Angular 10 等后续版本中看到机遇 Ivy 的激动人心的新特性

0:11:14.380,0:11:21.390
Angular 10 and beyond so a huge release even though you don't directly see it, but IVs a huge change

所以，即使你无法直接看到它，它仍然是一个巨大的发布，Ivy 将带来巨大的改变。

0:11:21.580,0:11:26.879
Really helping us with our applications and we get it for free. You don't need to adjust anything

它真正为我们的应用带来帮助，并且对我们来说是免费的。你不需要对它做任何调整。
