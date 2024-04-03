import { Component, OnInit } from '@angular/core';
import { Article } from '../common/article';
import { ArticleService } from '../common/article.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles-list-deleted',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles-list-deleted.component.html',
  styleUrls: ['./articles-list-deleted.component.css'],
})
export class ArticlesListDeletedComponent implements OnInit {
  articlesDeleted: Article[] = []; // Initialise le tableau pour éviter les erreurs d'undefined

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    // Récupération des articles supprimés à partir du service
    this.articlesDeleted = this.articleService.getDeletedArticles();
  }

  /** Ceci est un commentaire
   * Restaure un article supprimé
   * @param articleId L'ID de l'article à restaurer
   */

  restore(articleId: string) {
    // Ajoute un paramètre pour identifier l'article à restaurer
    this.articleService.restoreArticle({ id: articleId } as Article); // Appelle la méthode de restauration du service
    // Mise à jour de la liste des articles supprimés pour refléter la restauration
    this.articlesDeleted = this.articleService.getDeletedArticles();
  }
}
