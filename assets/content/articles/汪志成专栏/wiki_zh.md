{{short description|Web application framework}}
{{About|Angular|AngularJS 1.x|AngularJS}}
{{Infobox software
| name = Angular
| logo = Angular full color logo.svg
| logo_size = 250px
| developer = [[Google]]
| released = 2.0 / {{Start date and age|2016|09|14|df=yes}}<ref>{{cite web |url= http://angularjs.blogspot.com/2016/09/angular2-final.html |title= Angular, version 2: proprioception-reinforcement  |date=September 14, 2016 |website= blogspot.com |access-date=2017-03-18}}</ref>
| latest release version = 8.2.13
| latest release date = {{Start date and age|2019|10|30|df=yes}}<ref>{{cite web|url=https://github.com/angular/angular/releases|title=GitHub - angular/angular: One framework. Mobile & desktop.|date=31 December 2018|publisher=|via=GitHub}}</ref>
| latest preview version = 9.0.0-next.15
| latest preview date = {{Start date and age|2019|10|30|df=yes}}<ref>{{cite web|url=https://github.com/angular/angular/releases|website=GitHub|accessdate=2019-10-19|title=angular/CHANGELOG.md at master · angular/angular}}</ref>
| repo = {{URL|https://github.com/angular/angular|Angular Repository}}
| programming language = [[TypeScript]]
| platform = [[Web platform]]
| genre = [[Web framework]]
| license = [[MIT License]]
| website = {{url|https://angular.io/}}
| Tutorials = {{url|https://www.tutorialslogic.com/angular/}}
| status = Active
}}
'''Angular''' (commonly referred to as "'''Angular 2+'''" or "'''Angular v2 and above'''")<ref>{{cite web|url=https://www.reddit.com/r/Angular2/|title=r/Angular2|website=reddit}}</ref><ref>{{cite web|url=https://www.sitepoint.com/angularjs-vs-angular/|title=AngularJS and Angular 2+: a Detailed Comparison|date=6 April 2018|publisher=}}</ref> is a [[TypeScript]]-based [[open-source]] [[Web framework|web application framework]] led by the Angular Team at [[Google]] and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built [[AngularJS]].

==Differences between Angular and AngularJS==

[[File:Architecture of an Angular 2 application.png|thumb|right|upright=1.5|Architecture of an Angular application. The main building blocks are modules, components, templates, metadata, data binding, directives, services and dependency injection.]]

Angular was designed as a ground-up rewrite of AngularJS.
* Angular does not have a concept of "scope" or controllers, instead it uses a hierarchy of components as its primary architectural characteristic.<ref>{{cite web|url=https://angular.io/guide/architecture|title=Angular Docs|website=angular.io}}</ref>
* Angular has a different expression syntax, focusing on <code>"[ ]"</code> for [[Property_(programming)|property]] binding, and <code>"( )"</code> for [[Event_(computing)|event]] binding<ref>{{cite web |url=https://gorrion.io/blog/angularjs-vs-angular/ |title= What’s the difference between AngularJS and Angular?  |date=September 19, 2017 |website= gorrion.io |access-date=2018-01-28}}</ref>
* Modularity – much core functionality has moved to modules
* Angular recommends the use of Microsoft's [[TypeScript]] language, which introduces the following features:
** [[Static typing|Static Typing]], including [[Generic programming|Generics]]
** [[Annotation|Annotations]]
* [[TypeScript]] is a superset of [[ECMAScript 6]] (ES6), and is [[Backward compatibility|backwards compatible]] with [[ECMAScript 5]] (i.e.: JavaScript).
* [[Dynamic loading]]
* Asynchronous template compilations
* Iterative callbacks provided by RxJS. RxJS limits state visibility and debugging, but these can be solved with reactive add-ons like ngReact or ngrx.
* Support for Angular Universal, which runs Angular applications on servers

==History==
===Naming===
Originally, the rewrite of AngularJS was called "Angular 2" by the team, but this led to confusion among developers. To clarify, the team announced that separate terms should be used for each framework with "AngularJS" referring to the 1.X versions and "Angular" without the "JS" referring to versions 2 and up.<ref>{{Cite web|url=http://angularjs.blogspot.com/2017/01/branding-guidelines-for-angular-and.html|title=Angular: Branding Guidelines for AngularJS|accessdate=2017-03-04}}</ref>

===Version 2===
Angular 2.0 was announced at the ng-Europe conference 22–23. October 2014.<ref>{{cite web |title= A sneak peek at the radically new Angular 2.0 |author= Coman Hamilton |url= https://jaxenter.com/angular-2-0-112094.html |accessdate= 2015-10-21 }}</ref><ref>{{cite web |title= Ng-Europe schedule |url= https://2015.ngeurope.org/#schedule}}</ref> The drastic changes in the 2.0 version created considerable controversy among developers.<ref>{{cite web | title = Angular 2.0 announcement backfires | author = Coman Hamilton| url = https://jaxenter.com/angular-2-0-announcement-backfires-112127.html | accessdate= 2015-10-21 }}</ref> On April 30, 2015, the Angular developers announced that Angular 2 moved from Alpha to Developer Preview.<ref>{{Cite tweet |title=Angular 2 moves from Alpha to Developer Preview! Dev guide and API docs now available at ... angular.io/docs/js/latest |user=angularjs |number=593797019258359809 |date=30 Apr 2015 |accessdate=2015-10-21}}</ref> Angular 2 moved to Beta in December 2015,<ref>{{Cite web|url=http://angularjs.blogspot.it/2015/12/angular-2-beta.html|title=Angular: Angular 2 Beta|website=angularjs.blogspot.it|access-date=2016-07-13}}</ref> and the first release candidate was published in May 2016.<ref>{{Cite web|url=https://github.com/angular/angular/blob/master/CHANGELOG.md#200-rc0-2016-05-02|title=angular/angular|website=GitHub|access-date=2016-05-04}}</ref> The final version was released on September 14, 2016.

=== Version 4 ===
On 13 December 2016 Angular 4 was announced, skipping 3 to avoid a confusion due to the misalignment of the router package's version which was already distributed as v3.3.0.<ref>{{Cite web|url=http://angularjs.blogspot.kr/2016/12/ok-let-me-explain-its-going-to-be.html|title=Ok... let me explain: it's going to be Angular 4.0|website=angularjs.blogspot.kr|access-date=2016-12-14}}</ref> The final version was released on March 23, 2017.<ref>{{Cite web|url=http://angularjs.blogspot.ca/2017/03/angular-400-now-available.html|title=Angular 4.0.0 Now Available|website=angularjs.blogspot.ca|access-date=2017-03-23}}</ref> Angular 4 is backward compatible with Angular 2.<ref>{{Cite web|url=https://react-etc.net/entry/angular-4-coming-in-2017-backwards-compatible-angular-2|title=Angular 4 coming in 2017, to be backwards compatible with Angular 2|website=react-etc.net|access-date=2016-12-14}}</ref>

Angular version 4.3 is a minor release, meaning that it contains no breaking changes and that it is a drop-in replacement for 4.x.x.

Features in version 4.3
* Introducing '''HttpClient''', a smaller, easier to use, and more powerful library for making HTTP Requests.
* New '''router life cycle''' events for Guards and Resolvers. Four new events: '''GuardsCheckStart''', '''GuardsCheckEnd''', '''ResolveStart''', '''ResolveEnd''' join the existing set of life cycle event such as NavigationStart.
* Conditionally '''disable''' animations.

=== Version 5 ===
Angular 5 was released on November 1, 2017.<ref>{{cite web|last1=Fluin|first1=Stephen|url=https://blog.angular.io/version-5-0-0-of-angular-now-available-37e414935ced|title=Version 5.0.0 of Angular Now Available|accessdate=2 November 2017}}</ref> Key improvements in Angular 5 include support for [[Progressive web app|progressive web apps]], a build optimizer and improvements related to Material Design.<ref>{{cite web|url=https://www.infoworld.com/article/3225511/javascript/angular-5-javascript-framework-delayed.html|title=Angular 5 JavaScript framework delayed}}</ref>

=== Version 6===
Angular 6 was released on May 4, 2018.<ref>{{cite web|url=https://blog.angular.io/version-6-of-angular-now-available-cc56b0efa7a4|title=Version 6.0.0 of Angular Now Available|accessdate=4 May 2018}}</ref>. This is a major release focused less on the underlying framework, and more on the toolchain and on making it easier to move quickly with Angular in the future, like: ng update, ng add, Angular Elements, Angular Material + CDK Components, Angular Material Starter Components, CLI Workspaces, Library Support, Tree Shakable Providers, Animations Performance Improvements, and RxJS v6.

===Version 7===
Angular 7 was released on October 18, 2018. Updates regarding Application Performance, Angular Material & CDK, Virtual Scrolling, Improved Accessibility of Selects, now supports Content Projection using web standard for custom elements, and dependency updates regarding Typescript 3.1, RxJS 6.3, Node 10 (still supporting Node 8).<ref>{{Cite web|url=https://blog.angular.io/version-7-of-angular-cli-prompts-virtual-scroll-drag-and-drop-and-more-c594e22e7b8c|title=Version 7 of Angular — CLI Prompts, Virtual Scroll, Drag and Drop and more|last=Fluin|first=Stephen|date=2018-10-18|website=Angular Blog|access-date=2019-06-07}}</ref>
===Version 8===
Angular 8 was released on May 28, 2019. Featuring Differential loading for all application code, Dynamic imports for lazy routes, Web workers, TypeScript 3.4 support, and Angular Ivy as an opt-in preview. Angular Ivy opt-in preview includes:<ref name=":0">{{Cite web|url=https://blog.angular.io/a-plan-for-version-8-0-and-ivy-b3318dfc19f7|title=A plan for version 8.0 and Ivy|last=Fluin|first=Stephen|date=2019-02-08|website=Angular Blog|access-date=2019-06-07}}</ref>
* Generated code that is easier to read and debug at runtime
* Faster re-build time
* Improved payload size
* Improved template type checking
* Backwards compatibility

=== Future Releases ===
One of the highlights is the expected release of Ivy<ref name=":0" />, a backwards compatible, completely new render engine based on the incremental DOM architecture. Ivy has been engineered with [[tree shaking]] in mind, which means that application bundles will only include the parts of Angular that are actually used by the application.

Each version is expected to be backward-compatible with the prior release. Google pledged to do twice-a-year upgrades.

=== Support policy and schedule ===
All the major releases are supported for 18 months. This consists of 6 months of active support, during which regularly-scheduled updates and patches are released. It is then followed by 12 months of long-term support (LTS), during which only critical fixes and security patches are released.<ref>{{Cite web|url=https://angular.io/guide/releases#support-policy-and-schedule|title=Angular|website=angular.io|access-date=2019-06-07}}</ref>
{| class="wikitable"
|+Supported Angular Versions
!Version
!Status
!Released
!Active Ends
!LTS Ends
|-
|^8.0.0
|Active
|May 28, 2019
|Nov 28, 2019
|Nov 28, 2020
|-
|^7.0.0
|LTS
|Oct 18, 2018
|April 18, 2019
|Apr 18, 2020
|-
|^6.0.0
|LTS
|May 3, 2018
|Nov 3, 2018
|Nov 3, 2019
|}

== Libraries ==
=== Angular Material ===
{{redirect|Angular Material|the library of the same name for AngularJS 1.x|AngularJS#Angular Material}}
{{expand section|date=August 2019}}
Angular Material is a [[User interface|UI]] component library that implements [[Material Design]] in Angular.<ref>{{Cite book|url=https://books.google.co.uk/books?id=WMxPDwAAQBAJ|title=Learning Angular: A no-nonsense guide to building real-world apps with Angular 5|last=Noring|first=Christoffer|last2=Deeleman|first2=Pablo|date=2017-12-08|publisher=Packt Publishing Ltd|year=|isbn=9781787125940|location=|pages=315|language=en}}</ref><ref>{{Cite book|url=https://books.google.co.uk/books?id=xdyZDwAAQBAJ|title=Progressive Web Apps with Angular: Create Responsive, Fast and Reliable PWAs Using Angular|last=Hajian|first=Majid|date=2019-05-22|publisher=Apress|year=|isbn=9781484244487|location=|pages=30|language=en}}</ref><ref>{{Cite book|url=https://books.google.co.uk/books?id=qnc5DwAAQBAJ|title=Building Modern Web Applications Using Angular|last=Kasagoni|first=Shravan Kumar|date=2017-05-29|publisher=Packt Publishing Ltd|year=|isbn=9781785880032|location=|pages=173|language=en}}</ref><ref>{{Cite book|url=https://books.google.co.uk/books?id=IDtNDwAAQBAJ|title=Angular 5 Projects: Learn to Build Single Page Web Applications Using 70+ Projects|last=Clow|first=Mark|date=2018-02-20|publisher=Apress|year=|isbn=9781484232798|pages=245|language=en}}</ref>

==See also==
{{Portal|Free and open-source software}}
*[[AngularJS]]
*[[React (JavaScript library)|React.js]]
*[[Vue.js]]
*[[Comparison of JavaScript frameworks]]

==References==
{{Reflist}}

==External links==
* [https://angular.io Official website]
* [https://v2.angular.io Archived website (Angular 2)]

{{Rich Internet applications}}
{{Application frameworks}}
{{ECMAScript}}
{{NodeJs}}

[[Category:Google software]]
[[Category:Rich Internet application frameworks]]
[[Category:Software using the MIT license]]
[[Category:Ajax (programming)]]
