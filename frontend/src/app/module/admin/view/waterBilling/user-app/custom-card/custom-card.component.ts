import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-custom-card',
    templateUrl: './custom-card.component.html',
    styleUrls: ['./custom-card.component.scss']
})
export class CustomCardComponent implements OnInit {

    constructor() {
    }

    // Titre de la carte
    @Input()
    cardTitle = '';

    // Date affichée (optionnelle)
    @Input()
    dateCreation: Date | string = '';

    // Statut qui sera affichée en haut de la carte
    @Input()


    ngOnInit(): void {
    }

    getStatusClasse(currentStatus): string {
        switch (currentStatus) {
            case '':
                return 'custom-card-tipper custom-card-hidden';
            /*case EtatEnum.TERMINE:
                return 'custom-card-tipper custom-card-validated';
            case EtatEnum.ENCOURS:
                return 'custom-card-tipper custom-card-ongoing';
            case EtatEnum.ARCHIVE:
                return 'custom-card-tipper custom-card-archive';
            case EtatEnum.INITIALISE:
                return 'custom-card-tipper custom-card-init';*/
            default:
                return 'custom-card-tipper custom-card-nostatus';
        }
    }

    getCardClass(status) {
        let disabledClass = '';
        /*if (status === EtatEnum.ARCHIVE) {
            disabledClass = 'custom-card-disabled';
        }*/
        return 'faa-custom-card p-sm-12 p-m-4 p-lg-2 ' + disabledClass;
    }
}
