import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from './shared/models/person.model';
import { PostsService } from './services/posts.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Компоненты';
  persons: Person[] = [];
  searchGuy = '';
  searchSurname = '';

  constructor(private postsServise: PostsService) { }


  async ngOnInit() {
    this.getPersonsJson();
  }

  ngOnDestroy(): void {
  }

  async getPersonsJson() {
    try {
      let persons = this.postsServise.getPosts();
      this.persons = (isNullOrUndefined(await persons)) ? [] : await persons;
      console.log(this.persons)
    } catch (err) {
      alert('Произошла ошибка при загрузке таблицы');
    }
  }

  async onAddPerson(person: Person) {
    // let newId;
    // if (this.persons.length == 0) {newId = 1} else {newId = this.persons[this.persons.length - 1].id + 1;}
    // person.id = newId;
    // this.persons.push(person);
    // this.postsServise.putPostById(person.id,person);
    try {
      let result = await this.postsServise.postPost(person);
      console.log(result);
      this.getPersonsJson();
    }
    catch (err) {
      console.log(err);
    }

  }

  onDeletePerson(id: Number) {
    let foundIdx = this.persons.findIndex(el => el.id == id);
    if (foundIdx !== undefined) this.persons.splice(foundIdx, 1);
    if (foundIdx !== undefined) this.postsServise.deletePostsById(foundIdx + 1);
  }

  onEditPerson(person: Person) {
    let foundIdx = this.persons.findIndex(el => el.id == person.id);
    if (foundIdx !== undefined) {
      this.persons.splice(foundIdx, 1, person);

      this.postsServise.deletePostsById(foundIdx + 1);
      this.postsServise.putPostById(foundIdx + 1, person);

    }
  }

}