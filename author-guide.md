# 创作者指南

## 环境准备

装好 NodeJS 环境，在本目录下运行 `npm install`

## 如何写文章

所有内容都在 `src/assets/content` 目录下，其中 `articles` 是文章，`authors` 是作者信息。

### articles

可以添加任意级目录，目录下的 `*.md` 文件就会被当做文章进行编译。这些目录就会变成导航树中的节点。

目录下有一个名叫 `_cover.md` 的特殊文件，它是这个目录的首页。其中 `# ` 所表示的一级标题就会变成导航树中的节点名。

在 github 中，每次只能提交一个新文件。这个新文件的提交信息请用 “docs: 文章标题” 的格式，这个标题将会变成 URL 的一部分，有利于 SEO。后面无论怎么改这个文章的标题，都不会再影响到这个 URL。因此这个 URL 是永久性的。

对于翻译文章，提交信息的格式如下：

```
docs: Angular Routing — A Better Pattern For Large Scale Apps

Author: Shai Reznik
URL: https://medium.com/@shairez/angular-routing-a-better-pattern-for-large-scale-apps-f2890c952a18
```

这种格式会导致它按照翻译文章的格式显示作者和译者。

每个 `*.md` 文件内容中的第一个一级标题 `# ` 都会变成该文章的标题。

其它内容就像一个普通 markdown 一样编写就可以了。

`*.md` 文件中可以通过相对路径引用图像文件，它们都会被编译并发布。

### authors

存放作者信息。

每个作者一个文件，其文件名就是你准备用的显示名称，可以在文章中通过 `[汪志成](/authors/汪志成)` 的形式来引用该作者。

作者信息的格式如下：

```
邮箱：asnowwolf@gmail.com, zcwang@thoughtworks.com

---

# 汪志成

内容自由发挥

```

你在提交 git 时使用的作者邮箱必须列在这些邮箱之中，这样当你提交的时候，编译程序就会自动把这篇文章和你关联起来。

## 如何发布文章

你要自己修改 `deploy-cn.sh` 文件，以便在编译完成之后把它推送到你自己的 github pages。

修改完成之后，运行 `deploy-cn.sh` 即可。

当然，如果你熟悉 travis，也可以把你的源码仓库跟 travis 关联起来，以便每次推送都自动发布。

## 如何添加统计代码

参见 <https://support.google.com/analytics/answer/1008080>

把内容添加到 `src/index.html` 中的 `</body>` 前面即可。
