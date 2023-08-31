import { NgModule } from "@angular/core";
import { SearchUserComponent } from "./search-user.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [SearchUserComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [SearchUserComponent]
})
export class SearchUserModule {}
