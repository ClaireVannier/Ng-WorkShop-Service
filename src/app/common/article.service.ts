import { Injectable } from '@angular/core';
import { Article } from './article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor() {}

  // Récupère les articles depuis le stockage local
  getFromLocalStorage(): Article[] {
    const stringData = localStorage.getItem('articles') || '[]';
    return JSON.parse(stringData);
  }

  // Crée un nouvel article
  createArticle(article: Article): void {
    const articles = this.getFromLocalStorage();
    // méthode pour attribuer un identifiant unique
    // article.id = this.generateUniqueId();
    articles.push(article);
    localStorage.setItem('articles', JSON.stringify(articles));
  }
  // méthode pour attribuer un identifiant unique
  // private generateUniqueId(): string {
  //   return Date.now().toString(36) + Math.random().toString(36).substring(2);
  // }

  deleteArticle(articleToDelete: Article): void {
    const articles = this.getFromLocalStorage(); // Récupère les articles existants
    const index = articles.findIndex(
      (article) => article.id === articleToDelete.id
    );

    if (index !== -1) {
      // Supprime l'article et le récupère
      const [deletedArticle] = articles.splice(index, 1); // Note l'utilisation de la destructuration pour obtenir le premier élément du tableau retourné par splice
      localStorage.setItem('articles', JSON.stringify(articles)); // Sauvegarde les articles restants

      // Gère la sauvegarde de l'article supprimé
      const articlesDeleted = this.getDeletedArticles(); // Récupère les articles déjà supprimés
      articlesDeleted.push(deletedArticle); // Ajoute l'article supprimé au tableau
      localStorage.setItem('articlesDeleted', JSON.stringify(articlesDeleted)); // Sauvegarde la nouvelle liste des articles supprimés
    }
  }

  getDeletedArticles(): Article[] {
    const stringData = localStorage.getItem('articlesDeleted') || '[]';
    return JSON.parse(stringData);
  }

  restoreArticle(article: Article): void {
    const articlesDeleted = this.getDeletedArticles();
    const index = articlesDeleted.findIndex(
      (deletedArticle) => deletedArticle.id === article.id
    );

    if (index !== -1) {
      const [restoredArticle] = articlesDeleted.splice(index, 1);
      localStorage.setItem('articlesDeleted', JSON.stringify(articlesDeleted));

      const articles = this.getFromLocalStorage();
      articles.push(restoredArticle);
      localStorage.setItem('articles', JSON.stringify(articles));
    }
  }
}
