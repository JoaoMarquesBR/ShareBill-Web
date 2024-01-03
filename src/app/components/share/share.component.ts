import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';


export interface payer {
  name: string;
  bill: number;
}

export interface item {
  name: string;
  price: number;
  payers: any[]
}


@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrl: './share.component.scss'
})

export class ShareComponent implements OnInit {
  //variable names
  payer_storage: string = "payers"
  item_storage: string = "items"

  display: boolean = false;
  itemDisplay: boolean = false;
  item_information_display: boolean = true;
  private pressTimer: any;

  selected_player!: payer;
  selected_item: item = {
    name: "joao",
    price: 0.00,
    payers: []
  }

  //data
  payers_list: payer[] = [];
  items_list: item[] = [];
  selected_payers: any[] = [];
  players_list_name: string[] = [];


  //add payer
  add_payer: string = "";

  //add item
  add_item_name: string = "";
  add_item_price: number = 0.00;
  add_item_payers_assigned: any[] = []

  ngOnInit(): void {
    const storedPayers = localStorage.getItem(this.payer_storage);

    if (storedPayers !== null) {
      this.payers_list = JSON.parse(storedPayers);

      this.payers_list.map(i => {
        this.players_list_name.push(i.name)
      })
    }

    const storedItems = localStorage.getItem(this.item_storage);

    if (storedItems !== null) {
      this.items_list = JSON.parse(storedItems)
      this.calculateItems();
    }

  }

  showDialog() {
    if (!this.display)
      this.display = true;
    else
      this.display = false;

  }

  showItemDialog() {
    this.selected_payers = []

    if (!this.itemDisplay)
      this.itemDisplay = true;
    else
      this.itemDisplay = false;

  }

  showItemInformationDialog() {
    if (!this.item_information_display) {


      this.item_information_display = true;
    }
    else
      this.item_information_display = false;
  }

  confirmPayer() {

    const new_payer: payer = {
      name: this.add_payer,
      bill: 0.00
    }

    this.payers_list.push(new_payer)
    localStorage.setItem(this.payer_storage, JSON.stringify(this.payers_list));

    this.add_payer = "";
    this.showDialog();
  }

  cancelItem() {
    this.showItemDialog();
  }


  confirmItem() {

    const new_item: item = {
      name: this.add_item_name,
      price: this.add_item_price,
      payers: this.selected_payers
    }

    this.items_list.push(new_item)
    localStorage.setItem(this.item_storage, JSON.stringify(this.items_list));

    this.add_item_name = "";
    this.add_item_price = 0.00;
    this.showItemDialog();

    this.calculateItems();
  }

  cancelPayer() {
    this.showItemDialog();
  }


  calculateItems() {

    //first reset their bills
    this.payers_list.map(payer => {
      payer.bill = 0;
    })

    this.items_list.map(item => {
      const payer_quantity: number = item.payers.length;

      this.payers_list.map(payer => {

        if (item.payers.includes(payer.name))
          payer.bill += item.price / payer_quantity;

      })
    })
    console.log(this.payers_list)
  }


  onItemSelect(event: any): void {
  }

}
