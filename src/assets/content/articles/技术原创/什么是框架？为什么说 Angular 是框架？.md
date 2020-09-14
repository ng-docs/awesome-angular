# 什么是框架？为什么说 Angular 是框架？

先摘录并翻译一段 wiki：

> In [computer programming](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Computer_programming), a **software framework** is an [abstraction](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Abstraction_%28computer_science%29) in which [software](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Software) providing generic functionality can be selectively changed by additional user-written code, thus providing application-specific software. A software framework provides a standard way to build and deploy applications. A software framework is a universal, reusable [software environment](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Software_environment_%28disambiguation%29) that provides particular functionality as part of a larger [software platform](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Software_platform) to facilitate development of [software applications](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Software_application), products and solutions. Software frameworks may include support programs, compilers, code libraries, tool sets, and [application programming interfaces (APIs)](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Application_programming_interface) that bring together all the different [components](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Software_component) to enable development of a [project](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Software_project) or [system](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Software_system).  
>   
> 在编程领域，软件框架是指一种抽象形式，它提供了一个具有通用功能的软件，这些功能可以由使用者编写代码来有选择的进行更改，从而提供服务于特定应用的软件。软件框架提供了一种标准的方式来构建并部署应用。  
> 软件框架是一种通用的、可复用的软件环境，它提供特定的功能，作为一个更大的软件平台的一部分，用以促进软件应用、产品和解决方案的开发工作。软件框架可能会包含支撑程序、编译器、代码、库、工具集以及 API，它把所有这些部件汇集在一起，以支持项目或系统的开发。  
>   
> Frameworks have key distinguishing features that separate them from normal [libraries](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Library_%28computing%29):  
>   
> 框架和普通的库在特性上具有一些关键性的区别：  
>   
> 1. [inversion of control](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Inversion_of_control)_: In a framework, unlike in libraries or in standard user applications, the overall program's [flow of control](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Control_flow) is not dictated by the caller, but by the framework.[[1]](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Software_framework%23cite_note-1)  
>
>    控制反转：与库或普通的应用不同，在框架中，应用的宏观控制流程不是由调用者决定的，而是由框架本身。  
>   
> 2. [extensibility](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Extensibility)_: A user can extend the framework - usually by selective overriding; or programmers can add specialized user code to provide specific functionality.  
>
>    可扩展性：用户可以扩展该框架 —— 通常是有选择的进行改写（Override）或者由程序员添加专门的用户代码来提供特定的功能。  
>   
> 3. [non-modifiable framework code](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Open/closed_principle)_: The framework code, in general, is not supposed to be modified, while accepting user-implemented extensions. In other words, users can extend the framework, but should not modify its code.  
>
>    不可修改框架代码：通常，框架代码都不打算让你修改，而是接受由用户自己实现的某些扩展。换句话说，用户可以扩展该框架，但是不应该修改它的代码。

形象点比喻（但不够严谨），框架就是条生产线，这条生产线上有很多工人（代码）在工作。生产线的管理者（程序员）负责管理这条生产线，比如说有的工序是空的，那么你就可以安排自己的工人进去，让他去达成你的目标。有些工序上的工人干的工作和你预期的不同，你也可以安排自己的工人把他替换掉。

但是无论如何，你的工人除了执行你的意志之外，还要遵守那个工序的强制性要求，他想磨洋工或粗制滥造是不行的，因为这个流水线上的下一个工序可能有超时检查或质量检查，出了错直接就把这个流水线给你停掉，甚至对于一些强制性检查，你作为管理者都无权忽略它。

可以想见，一条好的生产线的价值有多大。生产线绝不仅仅是一组机器而已，它是很多年的管理经验的结晶，这些才是最值钱的，否则光靠那些机器能值几个钱？有了生产线，对工人（代码）的要求大大降低了，甚至对管理者（程序员）的要求也大大降低了。当然，如果你只想生产个“能穿”的鞋子，那么这条生产线几乎没有附加价值，甚至会提高你的成本。但是如果你想生产一个“高质量”的鞋子，那么这条生产线是别人的鞋子卖10块而你的鞋子能卖到1000块的根本保障。

总体来说，建立生产线的目标就是制定规矩，保障品质，让高品质可以用较低的代价进行复制。框架也是如此。

从代码结构上看，框架在宏观层面使用的都是注册、回调机制。这种机制有一个形象的名称，叫做好莱坞法则，为什么叫好莱坞法则呢？因为好莱坞想要成名的演员太多了，都想去找导演，这样下去导演的工作效率势必会受到严重的影响。于是导演就立下了“规矩”，不要打给我们(Don't call us)，等我们打给你（We'll call you!）。由于这个 call 和程序调用的 call 是同一个词，于是编程界就把这句话搬过来，变成了回调（callback）的形象代言人。

比如在 Java 的 Spring 框架中，你只要给一个类加上 @Service 注解，它就会自动被 Spring 作为服务管理起来，当 Spring 认为需要的时候，就会创建这个类并且把它的实例传给需求方。在 Angular 中也是一样，你只要给一个类加上 @Component 注解（装饰器），它就会自动被 Angular 当做组件管理起来，当 Angular 认为需要的时候，就会创建这个类，并且把它的实例传给需求方（比如路由器）。

这些注解中还可以带一些额外信息，被称为元数据。所谓“元数据”就是 metadata，指的是关于数据的数据，这不是 Angular 自创的名词，其它编程领域已经使用了几十年了。当 Angular 准备创建一个组件的时候，它就会找到这些元数据，从中找出这个组件的模板（因为组件本身是纯类，没有携带任何模板信息），然后据此对 DOM 进行操纵。

而你写的这些组件类和模板，其实就是“由程序员添加专门的用户代码来提供特定的功能”，因为框架是不会关心你的组件的外观和逻辑的，它唯一关心的就是你必须遵循它的规范来工作，否则它就会给你报错（比如，“连模板都没有还敢说自己是 Angular 组件？”）。

而库则跟框架相反，宏观上说，它是等着你调用的，你要什么功能它就给你什么函数，然后你调用这个函数，把所需的参数传进去就行了，而不是让你遵守它的那么多规矩。所以你很自由，但是你也要自己为整件事负责。你要自己创建组件、创建服务等，自己来驱动整个流程，自己做必要的检查，当然也可以不做，反正对十块钱的鞋子别人可能只希望能穿一个月就行了。

那么，问题来了，框架一定会比库高级吗？显然不是，甚至连框架的功能都不一定比库多。它们只是定位不同、设计理念不同而已。对于 Angular 来说，它会更希望你遵守一些规矩，这样当系统需要长期维护、甚至要经历很多人员更迭的时候，才不至于腐化。它希望每个开发人员都不必了解应用的全貌就能很好地完成工作（因为有当前工序的操作手册和检查点）。当然，它也不会干涉那些它不需要关心的事情，比如组件模板中你放 h1 还是放 div 它是不在乎的。这些目标用库也能达到，不过对人员的架构观和做事的自律性会有相应的要求，毕竟没人管了，那你自己就不能放任自流。

然而，在现实中，很多应用的整个生命周期可能都不会超过一年，甚至还有很多生命周期几天的活动页，那么，这些应用和页面的可维护性其实并不重要，甚至连是否能让不同的人协作都无所谓。那么点功能，能出什么 bug？一次性的需求，管什么可扩展性？这时候，学习成本就会成为一个很重要的参考因素。

学习 Angular 最难的就是遵守并理解规矩。然而大部分人天生是不愿遵守规矩的，特别是有些规矩可能他都无法理解为什么（虽然这可能是前人根据血的教训总结出来的）。可是，一旦遵守并理解了这些规矩，那么一扇新的大门就对你敞开了，你会发现跨上这个台阶之后，无论前端技术还是后端技术还是移动端技术，都遵循着很多相同的理念，即使出现了新的挑战，你也可以套用这些理念去解决。

规矩即自由。孔子把“从心所欲，不逾矩”当做自己的最佳状态，其实很多事都是这样。一旦深刻理解了设计和使用框架的思维模式，你将迎来一个实质性的提升。

在我工作的前五年，编程时很“聪明”，用技巧解决了很多问题，但之后的十五年（恰好在那一年我知道了框架的概念），我爱上了规矩，不但自己给自己（根据血泪教训）立各种规矩，而且从别人那里借鉴了很多规矩，无论是宏观的还是微观的。可以说，规矩就是固化的好习惯，虽然有时候也会成为阻碍，但是如果你想在编程领域工作到退休，那么这些规矩就是你表面上最大的资产，而对这些规矩的来龙去脉的理解和领悟，则是你深层次中最大的资产。
