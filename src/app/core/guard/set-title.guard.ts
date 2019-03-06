import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { findArticleById } from '../../article/data/articles';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SetTitleGuard implements CanActivateChild {
  constructor(private title: Title) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const id = childRoute.paramMap.get('id');
    if (id) {
      const article = findArticleById(id);
      const titles = [article.title];
      if (article.group) {
        titles.push(article.group.title);
      }
      titles.push('Angular 资源集锦');
      this.title.setTitle(titles.filter(title => !!title.trim()).join(' - '));
    }
    return true;
  }
}
