import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { BackendService } from '../services/backend.service';
@Component({
    selector: 'app-list-component',
    templateUrl: './list-component.component.html',
    styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent {
    public users: User[];
    public usersSize: number;
    public p = 1;
    private backend: BackendService;
    public constructor(backend: BackendService) {
        this.getUsers();
        this.backend = backend;
    }

    public getUsers(): void {
        this.backend.getAllUsers().subscribe((m: User[]) => {
            this.users = m;
            this.usersSize = m.length;
        });
    }
    public deleteUser(id: number): void {
        this.backend.deleteUser(id).subscribe((m) => {
            var removeIndex = this.users
                .map(function(item) {
                    return item._id;
                })
                .indexOf(id);
            this.users.splice(removeIndex, 1);
        });
    }
}
