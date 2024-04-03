import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../common/article.service';
import { Article } from '../common/article';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],
})
export class ArticlesListComponent implements OnInit {
  article: Article = {
    id: '',
    name: '',
    price: '',
    contact: '',
    stock: '',
  };

  articles: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articles = this.articleService.getFromLocalStorage();
  }

  createArticle(): void {
    this.articleService.createArticle(this.article);
    this.articles = this.articleService.getFromLocalStorage();
  }

  deleteArticle(articleId: string): void {
    this.articleService.deleteArticle({ id: articleId } as Article);
    this.articles = this.articleService.getFromLocalStorage();
  }
}
