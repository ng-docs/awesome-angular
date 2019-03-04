# NestJS，神似 Angular 的后端框架

```typescript

import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}

```

Angular？

非也。它叫 NestJS，是受 Angular 的启迪而开发出来的一个完全基于 TypeScript 的后端 NodeJS 框架。事实上，它在设计上刻意靠近 Angular，凡是能跟 Angular 对应上的概念，在写法上都尽量保持相同或相似。这就意味着对于 Angular 程序员来说，学习 NestJS 会非常容易，反之亦然。

NestJS 的作者是一位来自波兰的全栈工程师，他既是 Angular 的专家，也是 NodeJS 的专家。NestJS 的推出，正赶上了 Angular 的流行和 TypeScript 的流行两大热潮，这使它迅速走入了广大全栈工程师的视野中，并且深受人们的喜爱。多次登上 AngularConnect 的舞台，在去年的 ngChina 上也有它的身影。

虽然是个 "新" 框架，但其实它更像是一个大号的语法糖。它的各项功能的底层都是非常成熟的库或框架，比如它的 Web 服务器是基于 Express 的，而 HTTP 客户端则是对 axios 库的封装，不过其对外接口以及拦截器机制也同样设计得神似 Angular 的 HttpClient 服务。

## 全面的特性

同时，NestJS 的目标相当庞大，我们只要看看它的官方文档就知道了：

- Techniques
  - Authentication
  - Database
  - Mongo
  - File upload
  - Validation
  - Caching
  - Serialization
  - Logger
  - Security
  - Configuration
  - Compression
  - HTTP module
  - Model-View-Controller
  - Performance (Fastify)
  - Hot reload (Webpack)
- GraphQL
- WebSockets
- MicroServices
  - Basics
  - Redis
  - MQTT
  - NATS
  - RabbitMQ
  - gRPC
  - Exception filters
  - Pipes
  - Guards
  - Interceptors
- Receipts
  - TypeORM
  - Mongoose
  - Sequelize
  - CQRS
  - OpenAPI (Swagger)
  - Prisma
- CLI

可以说是包罗万象，涉及到了后端开发中大部分常用的技术（比如 ORM、Logger、CLI 等）以及最近正在流行的技术（比如 GraphQL 等）。

## 对 Java/.NET 程序员友好的语法

由于广泛使用了 TypeScript 的装饰器/注解功能，来自 Java 技术栈和 .NET 技术栈的人们应该也会觉得非常熟悉。我们来看一段 Controller 的范例代码：

```
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): string {
    return `This action updates a #${id} cat`;
  }
```

不但如此，NestJS 还提供了帮你自定义装饰器的工具函数：

```
import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
  return req.user;
});
```

一如既往的，它和 Angular 中的同名函数一模一样。

## 方便快捷的 CLI 工具

和 Angular CLI 一样，Nest CLI 也提供了 `new`（新建工程）、`generate`（创建各种部件）、`update`（自动升级依赖）、`add`（添加第三方库）等功能，帮助你更简单的进行开发，省去一些琐碎的工作。

## 中文文档

有几位社区志愿者翻译了整个 NestJS 5.0 的文档，而且在持续地维护，即使你英语不好也不用担心。其文档站直接集成了留言板，其译者左华栋等人不但在留言板回答问题，同时也活跃在知乎等网站，你可以去和他们请教问题、交流经验。

## 试试？

如果你是个 TypeScript 的粉丝，那么应该赶紧试试这个彻底用 TypeScript 编写的 Node 服务端框架，我相信你不会失望的。即使不用在生产环境中，也可以在用 TypeScript 编写 Node 服务端应用时从中吸取灵感。

如果你是个 Angular 程序员，那么 NestJS 当然是不二之选。只要项目的条件许可，拿它写 BFF 层可以说毫无思维切换的成本 —— 它在语法上简直是克隆版嘛！而且开发组以后也会尽量保持语法语义的一致性。

如果你是个 Java/.NET 程序员，那么不妨用它作为你体验前端文化的起点。TypeScript 让你排除了缺少类型标注带来的不安全感，而 CLI、HotReload 等前端常用的提高开发效率的方法，以及简约设计哲学，在你写 Java/.NET 程序也会给予一些启发。

与其临渊羡鱼，不如退而结网。难得如此低成本的跨界体验机会，还在犹豫什么呢？干吧！
