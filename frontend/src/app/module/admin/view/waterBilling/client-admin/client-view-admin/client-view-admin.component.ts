import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {ClientService} from "../../../../../../controller/service/Client.service";
import {RoleService} from "../../../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ClientVo} from "../../../../../../controller/model/Client.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-client-view-admin',
  templateUrl: './client-view-admin.component.html',
  styleUrls: ['./client-view-admin.component.scss']
})
export class ClientViewAdminComponent {


  constructor(private datePipe: DatePipe, private clientService: ClientService
      , private roleService: RoleService
      , private messageService: MessageService
      , private router: Router
  ) {
  }

// methods
  ngOnInit(): void {
  }

  hideViewDialog() {
    this.viewClientDialog = false;
  }

  // getter and setter


  get clients(): Array<ClientVo> {
    return this.clientService.clients;
  }

  set clients(value: Array<ClientVo>) {
    this.clientService.clients = value;
  }

  get selectedClient(): ClientVo {
    return this.clientService.selectedClient;
  }

  set selectedClient(value: ClientVo) {
    this.clientService.selectedClient = value;
  }

  get viewClientDialog(): boolean {
    return this.clientService.viewClientDialog;

  }

  set viewClientDialog(value: boolean) {
    this.clientService.viewClientDialog = value;
  }

  get dateFormat() {
    return environment.dateFormatView;
  }

  get dateFormatColumn() {
    return environment.dateFormatList;
  }

}
