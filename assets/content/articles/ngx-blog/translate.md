# Translate (i18n) your Angular Apps with @ngx-translate/core

# 使用 @ngx-translate/core 翻译（i18n）你的 Angular 应用

Our apps are used by different people, with differnet languages and different gender. So, to provide them the best experience, we want to provide them the content of the app in their language, or we want to address our customers according to their gender.
This is only possibile with some translating tools. Angular has one on board, (@angular/i18n) wich is not very handy, in my opinion.
I would like to introduce you to a nice alternative here

我们的应用会由不同的用户使用，他们有着不同的语言、不同的性别。因此，为了让他们得到最好的体验，我们希望以他们的语言为其提供应用内容，或者根据其性别称呼客户。要实现这些，需要一些翻译工具。Angular 有一个（@angular/i18n），但在我看来它不是很方便。我想向您介绍一个不错的替代方案。

## @ngx-translate/core

### How to use @ngx-translate/core?

### 如何使用 @ngx-translate/core？

OK, first of all we have to install @ngx-translate/core.

首先我们要安装 @ngx-translate/core。

```bash
npm install @ngx-translate/core --save
```

Then we have to import the TranslateModule into our application as you would any other module.

接着，我们还要把 TranslateModule 像其它模块一样导入到应用中。

```javascript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [BrowserModule, TranslateModule.forRoot()],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

> Here we want to introduce the TranslateModule for the first time, when we need to translate in other modules, we also have to import it there. But only in your root module do we want to instantiate the TranslateModule and all the things (like services) we get from there. so we need to call the forRoot method and in a child module we would call the forChild () method
>
> 这里我们先介绍一下 TranslateModule，当我们想在其它模块中进行翻译的时候，就要把它导入到那里。但是，只有在你的根模块中，我们才能实例化 TranslateModule 和要从该模块中拿到的东西（比如服务）。所以我们就要在根模块调用其 `forRoot()` 方法，并在子模块中调用其 `forChild()` 方法
>

Now we have to initialize the TranslateModule

现在我们要初始化 TranslateModule

```javascript
...
export class AppModule {
  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang("en");

    // the language to use, if the language isn't available, it will use the current loader to get them
    this.translate.use("en");
  }
}
```

Define the translations

接下来，定义翻译结果

Put your translation files in a json file which will be imported by the TranslateHttpLoader
The following translations should be stored in en.json

把你的这些翻译结果放到一个 json 文件中，该文件将由 TranslateHttpLoader 导入。下面的翻译结果应该保存到 en.json 中。

```json
{
  "HELLO": "hello {{value}}"
}
```

Use the Service, Pipe or the Directive
   TranslateService

最后，使用 TranslateService 服务、管道或指令

```javascript
// app.component.ts
translate.get("HELLO", { value: "world" }).subscribe((res: string) => {
  console.log(res); //=> 'hello world'
});
```

TranslatePipe

```javascript
// app.component.ts
param = { value: "world" };
```

```html
// app.component.html
{{ 'HELLO' | translate:param }}
```

TranslateDirective

```html
// app.component.html
<h3 translate="HELLO" translate-params="{value: 'world'}" ><h3>
```

## pluralization and gernderization with ngx-translate-messageformat-compiler

## 使用 ngx-translate-messageformat-compiler 进行复数化和性别化

Compiler for ngx-translate that uses messageformat.js to compile translations.
It uses ICU syntax for handling pluralization and gender

这是一个供 ngx-translate 使用的编译器，它使用 messageformat.js 来编译翻译结果。它使用 ICU 语法来处理复数化和性别化问题

## Installation

## 安装

This assumes that you've already installed <a href="https://github.com/ngx-translate/core" rel="noopener" target="_blank">ngx-translate</a>

这里假设你已经安装了 [ngx-translate](https://github.com/ngx-translate/core)。

```bash
npm install ngx-translate-messageformat-compiler messageformat --save
```

## Setup

## 准备工作

You need to configure `TranslateModule` so it uses `TranslateMessageFormatCompiler` as the compiler:

你需要配置 `TranslateModule` 以便它用 `TranslateMessageFormatCompiler` 作为编译器：

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateCompiler, TranslateModule } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { AppComponent } from './app';

@NgModule({
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
...
}
```

Please note that while you can still use nesting in your translations (`{ login: { welcome: 'Welcome!' }}`) with respective keys (`login.welcome`), you lose the ability to access object properties in your placeholders: `'Hello {name.first} {name.last}'` won't work. Also note that this format uses single braces instead of double braces for placeholders.

请注意，虽然你仍然可以在你的翻译结果（`{ login: { welcome: 'Welcome!' }}` ）中嵌套使用对应的键（ `login.welcome` ），但是你无法在占位符中访问对象属性：`'Hello {name.first} {name.last}'` 将不能正常工作。另请注意，此格式要使用单括号而非双括号作为占位符。

## Load translation files

## 加载翻译文件

To load the files we have to define a loader.
By default, there is no loader available. You can add translations manually using setTranslation but it is better to use a loader. You can write your own loader, or import an existing one. For example you can use the TranslateHttpLoader that will load translations from files using HttpClient.
To use it, you need to install the http-loader package from @ngx-translate:

要加载这些文件，我们就得定义一个 loader。默认情况下，没有可用的加载器。你可以使用setTranslation手动添加翻译，但最好是使用loader。你可以编写自己的loader，也可以导入一个已有的loader。例如，你可以使用TranslateHttpLoader，它会使用HttpClient加载来自文件的翻译。要使用它，你需要从@ ngx-translate安装http-loader包：

```bash
npm install @ngx-translate/http-loader --save
```

There are two types of translation files out there. .json and .po
There is a loader for po files aswell but it uses the deprecated Http service so we have to go with our own (because of HttpClient):

翻译文件有两种类型：.json 和 .po。还有一个用于 po 文件的加载器，但它使用了已废弃的 Http 服务，所以我们必须使用自己的（因为有 HttpClient 了）：

```javascript
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { TranslateLoader } from "@ngx-translate/core";
import * as gettext from "gettext-parser";

export class TranslatePoHttpLoader implements TranslateLoader {
  public domain = "";

  constructor(
    protected _http: HttpClient,
    protected _prefix: string = "i18n",
    protected _suffix: string = ".po"
  ) {}

  // Gets the translations from file
  public getTranslation(lang: string): Observable {
    return this._http
      .get(`${this._prefix}/${lang}${this._suffix}`, { responseType: "text" })
      .map((contents: string) => this.parse(contents));
  }

  // Parse po file
  public parse(contents: string): any {
    const translations: { [key: string]: string } = {};

    const po = gettext.po.parse(contents, "utf-8");
    if (!po.translations.hasOwnProperty(this.domain)) {
      return translations;
    }

    Object.keys(po.translations[this.domain]).forEach(key => {
      const translation: string = po.translations[this.domain][
        key
      ].msgstr.pop();
      if (key.length > 0 && translation.length > 0) {
        translations[key] = translation;
      }
    });

    return translations;
  }
}
```

Config the translateService to load the translation from files and use the TranslateMessageFormatCompiler

配置 translateService 来加载文件中的翻译结果，并让它使用 TranslateMessageFormatCompiler

```javascript
import {
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
  TranslateService
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateMessageFormatCompiler } from "ngx-translate-messageformat-compiler";

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
};

export function createPoTranslateLoader(http: HttpClient) {
  return new TranslatePoHttpLoader(http, "assets/i18n", ".po");
}

@NgModule({
  imports: [
    ...
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createPoTranslateLoader,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      },
      useDefaultLang: true
    })
  ]
  ...
})
export class AppModule {
  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang("en");

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use("en");
  }
}
```

## Translation files

## 翻译结果文件

Files look like this
en.po

这些文件就像下面的 en.po 一样

```text
msgid ""
msgstr ""
"Project-Id-Version: Lingohub 1.0.1\n"
"Report-Msgid-Bugs-To: support@lingohub.com \n"
"Last-Translator: Marko Bošković \n"
"Language: en\n"
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"
"Plural-Forms: nplurals=2; plural=(n != 1);\n"

msgid "greetings"
msgstr "Hi {gender, select, Male {Mr.} Female {Mrs.} other{dude}}"

msgid "words"
msgstr "{count, plural, =0{No} one{A} other{#}} {count, plural, one{word} other{words}}"

msgid "dude"
msgstr "Coder!!!!!!"
```

en.json

```json
{
  "greetings": "Hi {gender, select, Male {Mr.} Female {Mrs.} other{dude}}",
  "harish": "Coder!!!!!!",
  "words":
    "{count, plural, =0{No} one{A} other{#}} {count, plural, one{word} other{words}}"
}
```

How to use it in templates:

如何在模板中使用它：

```html
<h3>{{ 'greetings' | translate:{gender: Male} }}</h3>

<h4>{{ 'words' | translate:{count:7} }}</h4>
```

```javascript
// Use the service
Controller: this.translate.get("harish").subscribe(h => console.log(h)); //=> Coder!!!!!!
```

Credits:
Thx <a href="https://twitter.com/SebFlorian" rel="noopener" target="_blank">@SebFlorian</a>, <a href="https://twitter.com/tobmaster">@tobmaster</a> <a href="https://twitter.com/Sureshkumar_Ash" rel="noopener" target="_blank">@Sureshkumar_Ash</a> for reviewing.

致谢：感谢 [@SebFlorian](https://twitter.com/SebFlorian)、[@tobmaster](https://twitter.com/tobmaster) 和 [@Sureshkumar_Ash](https://twitter.com/Sureshkumar_Ash) 进行审校。
