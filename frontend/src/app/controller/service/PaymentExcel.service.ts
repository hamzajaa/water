// import {PaymentService} from "./Payment.service";
// import {MessageService} from "primeng/api";
// import {Observable} from "rxjs";
// import {PaymentVo} from "../model/Payment.model";
// import {ClientVo} from "../model/Client.model";
// import {PaymentStatusVo} from "../model/PaymentStatus.model";
// import {PaymentCategoryVo} from "../model/PaymentCategory.model";
// import * as XLSX from "xlsx";
// import {DateUtils} from "../../utils/DateUtils";
//
//
// export class PaymentExcelService {
//
//     showSpinner = false;
//     fileToUpload: File | null = null;
//
//     constructor(private paymentService: PaymentService, private messageService: MessageService) {
//     }
//
//     // public importAll(event: any) {
//     //     this.readDataObservable(event).subscribe(
//     //         next => {
//     //             this.importAllExc(next);
//     //         }
//     //     );
//     // }
//
//     public importerDataBase(event: any): Observable<any> {
//         // this.showSpinner = true;
//
//         return new Observable(sub => {
//             /* wire up file reader */
//             const target: DataTransfer = <DataTransfer>(event.target);
//             if (target.files.length !== 1) {
//                 throw new Error('Cannot use multiple files');
//             }
//             const reader: FileReader = new FileReader();
//             reader.readAsBinaryString(target.files[0]);
//             reader.onload = (e: any) => {
//                 /* create workbook */
//                 const binarystr: string = e.target.result;
//                 const wb: XLSX.WorkBook = XLSX.read(binarystr, {type: 'binary'});
//
//                 /* selected the first sheet */
//                 const wsname: string = wb.SheetNames[0];
//                 const ws: XLSX.WorkSheet = wb.Sheets[wsname];
//
//                 /* save data */
//                 const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
//
//                 let koscOrdresWork = new Array<PaymentVo>();
//                 for (let i = 0; i < data.length; i++) {
//                     let myPaymentWork = this.constructDataBase(data, i);
//                     myPaymentWork.type = 'kosc';
//                     koscOrdresWork.push(myPaymentWork);
//                 }
//                 this.paymentService.payments = koscOrdresWork;
//
//                 this.paymentService.importerDataBase(this.paymentService.payments).subscribe(
//                     response => {
//                         if (response.length == 0) {
//                             sub.next();
//                             this.messageService.add({
//                                 severity: 'success',
//                                 summary: 'Succès',
//                                 detail: 'La Base De Données importé avec Succès',
//                                 life: 3000
//                             });
//                             // this.searchRequest();
//                         } else {
//                             sub.error();
//
//                             this.messageService.add({
//                                 severity: 'error',
//                                 summary: 'erreur',
//                                 detail: 'problème d\'importation : reference existe déjà'
//                             });
//                         }
//                     },
//                     error => {
//                         this.messageService.add({
//                             severity: 'error',
//                             summary: 'erreur',
//                             detail: 'problème d\'importation'
//                         });
//                     }
//                 );
//             }
//         })
//
//
//     }
//
//     // private readDataObservable(event: any): Observable<Array<PaymentVo>> {
//     //     return new Observable(subscriber => {
//     //         /* wire up file reader */
//     //         const target: DataTransfer = <DataTransfer>(event.target);
//     //         let payments = new Array<PaymentVo>();
//     //         let count = 0;
//     //         let sum = event.target.files.length;
//     //
//     //         for (let i = 0; i < event.target.files.length; i++) {
//     //             let fileToUpload = event.target.files.item(i);
//     //             const reader: FileReader = new FileReader();
//     //
//     //             reader.readAsBinaryString(target.files[i]);
//     //             reader.onload = (e: any) => {
//     //                 /* create workbook */
//     //                 const binarystr: string = e.target.result;
//     //                 const wb: XLSX.WorkBook = XLSX.read(binarystr, {type: 'binary'});
//     //
//     //                 /* selected the first sheet */
//     //                 const wsname: string = wb.SheetNames[0];
//     //                 const ws: XLSX.WorkSheet = wb.Sheets[wsname];
//     //
//     //                 /* save data */
//     //                 const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
//     //
//     //                 for (let i = 0; i < data.length; i++) {
//     //                     if (this.isFtl(data[i])) {
//     //                         let myCosk = this.constructFtl(data, i);
//     //                         // myCosk.type = 'ftl';
//     //                         payments.push(myCosk);
//     //                     } else if (this.isKosc(data[i])) {
//     //                         let myCosk = this.constructWorkOrder(data, i);
//     //                         // myCosk.type = 'kosc';
//     //                         payments.push(myCosk);
//     //                     } else if (this.isErdv(data[i])) {
//     //                         let myCosk = this.constructErdv(data, i);
//     //                         // myCosk.type = 'erdv';
//     //                         payments.push(myCosk);
//     //                     }
//     //                 }
//     //
//     //
//     //             }
//     //             reader.onloadend = function (event) {
//     //                 if (++count === sum) {
//     //                     subscriber.next(payments);  // <-- emit notification
//     //                     subscriber.complete();
//     //                 }
//     //             }
//     //             // this.paymentService.uploadFile(fileToUpload).subscribe(
//     //             //     response => console.log('Success! ', response),
//     //             //     error => console.error('Error: ', error)
//     //             // );
//     //         }
//     //
//     //     });
//     // }
//
//     // private importAllExc(payments: PaymentVo[]) {
//     //     this.paymentService.importerAll(payments).subscribe(
//     //         response => {
//     //             if (response.length == 0) {
//     //                 this.messageService.add({
//     //                     severity: 'success',
//     //                     summary: 'Succès',
//     //                     detail: 'Kosc Order importé avec Succès',
//     //                     life: 3000
//     //                 });
//     //             } else {
//     //                 this.paymentService.payments = response;
//     //                 let message = this.constructMessage(response);
//     //                 this.messageService.add({
//     //                     severity: 'error',
//     //                     summary: 'erreur',
//     //                     detail: '' + message
//     //                 });
//     //             }
//     //         },
//     //         error => {
//     //             this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'importation'});
//     //         }
//     //     );
//     // }
//
//     private readExcel(event: any) {
//
//         /* wire up file reader */
//         const target: DataTransfer = <DataTransfer>(event.target);
//         if (target.files.length !== 1) {
//             throw new Error('Cannot use multiple files');
//         }
//         const reader: FileReader = new FileReader();
//         reader.readAsBinaryString(target.files[0]);
//         reader.onload = (e: any) => {
//             /* create workbook */
//             const binarystr: string = e.target.result;
//             const wb: XLSX.WorkBook = XLSX.read(binarystr, {type: 'binary'});
//
//             /* selected the first sheet */
//             const wsname: string = wb.SheetNames[0];
//             const ws: XLSX.WorkSheet = wb.Sheets[wsname];
//
//             /* save data */
//             const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
//             let payments = new Array<PaymentVo>();
//             for (let i = 1; i < data.length; i++) {
//                 let myPayment = new PaymentVo();
//                 myPayment.previousNumber = data[i]['previous_number'];
//                 myPayment.newNumber = data[i]['new_number'];
//                 myPayment.datePay = data[i]['date_pay'];
//                 //save client
//                 if (myPayment.clientVo == null) {
//                     myPayment.clientVo = new ClientVo();
//                 }
//                 myPayment.clientVo.userName = data[i]['client_user_name'];
//
//                 //save payment status
//                 if (myPayment.paymentStatusVo == null) {
//                     myPayment.paymentStatusVo = new PaymentStatusVo();
//                 }
//                 myPayment.paymentStatusVo.code = data[i]['payment_status_code'];
//
//                 //save payment category
//                 if (myPayment.paymentCategoryVo == null) {
//                     myPayment.paymentCategoryVo = new PaymentCategoryVo();
//                 }
//                 myPayment.paymentCategoryVo.code = data[i]['payment_category_code'];
//
//
//                 payments.push(myPayment);
//             }
//             // let objet = Object.assign(new PaymentVo, data);
//             this.paymentService.payments = payments;
//
//
//         };
//     }
//
//     // private readWorkOder(event: any) {
//     //     this.showSpinner = true;
//     //
//     //     /* wire up file reader */
//     //     const target: DataTransfer = <DataTransfer>(event.target);
//     //     if (target.files.length !== 1) {
//     //         throw new Error('Cannot use multiple files');
//     //     }
//     //     const reader: FileReader = new FileReader();
//     //     reader.readAsBinaryString(target.files[0]);
//     //     reader.onload = (e: any) => {
//     //         /* create workbook */
//     //         const binarystr: string = e.target.result;
//     //         const wb: XLSX.WorkBook = XLSX.read(binarystr, {type: 'binary'});
//     //
//     //         /* selected the first sheet */
//     //         const wsname: string = wb.SheetNames[0];
//     //         const ws: XLSX.WorkSheet = wb.Sheets[wsname];
//     //
//     //         /* save data */
//     //         const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
//     //
//     //         let koscOrdresWork = new Array<PaymentVo>();
//     //         for (let i = 0; i < data.length; i++) {
//     //             let myPaymentWork = this.constructWorkOrder(data, i);
//     //             koscOrdresWork.push(myPaymentWork);
//     //         }
//     //         this.paymentService.payments = koscOrdresWork;
//     //
//     //         // this.paymentService.importerWordOrder(this.paymentService.payments).subscribe(
//     //         //     response => {
//     //         //         if (response.length == 0) {
//     //         //             this.messageService.add({
//     //         //                 severity: 'success',
//     //         //                 summary: 'Succès',
//     //         //                 detail: 'Kosc Order importé avec Succès',
//     //         //                 life: 3000
//     //         //             });
//     //         //             this.paymentService.searchOrdreKosc.referenceWorkOrder = koscOrdresWork[0].referenceWorkOrder;
//     //         //             // this.searchRequest();
//     //         //         } else {
//     //         //             this.messageService.add({
//     //         //                 severity: 'error',
//     //         //                 summary: 'erreur',
//     //         //                 detail: 'problème d\'importation : reference existe déjà'
//     //         //             });
//     //         //         }
//     //         //     },
//     //         //     error => {
//     //         //         this.messageService.add({
//     //         //             severity: 'error',
//     //         //             summary: 'erreur',
//     //         //             detail: 'problème d\'importation'
//     //         //         });
//     //         //     }
//     //         // );
//     //     }
//     //     this.showSpinner = false;
//     //
//     // }
//
//     // private readFtel(event: any) {
//     //
//     //     this.showSpinner = true;
//     //
//     //
//     //     let resultat = null;
//     //
//     //     /* wire up file reader */
//     //     const target: DataTransfer = <DataTransfer>(event.target);
//     //     if (target.files.length !== 1) {
//     //         throw new Error('Cannot use multiple files');
//     //     }
//     //     const reader: FileReader = new FileReader();
//     //     reader.readAsBinaryString(target.files[0]);
//     //     reader.onload = (e: any) => {
//     //         /* create workbook */
//     //         const binarystr: string = e.target.result;
//     //         const wb: XLSX.WorkBook = XLSX.read(binarystr, {type: 'binary'});
//     //
//     //         /* selected the first sheet */
//     //         const wsname: string = wb.SheetNames[0];
//     //         const ws: XLSX.WorkSheet = wb.Sheets[wsname];
//     //
//     //         /* save data */
//     //         const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
//     //
//     //         let koscOrdresFtel = new Array<PaymentVo>();
//     //         for (let i = 0; i < data.length; i++) {
//     //             let myPaymentFtel = this.constructFtl(data, i);
//     //             koscOrdresFtel.push(myPaymentFtel);
//     //         }
//     //
//     //         // this.paymentService.importerFtel(koscOrdresFtel).subscribe(
//     //         //     response => {
//     //         //         if (response.length == 0) {
//     //         //             this.messageService.add({
//     //         //                 severity: 'success',
//     //         //                 summary: 'Succès',
//     //         //                 detail: 'FTL importé avec Succès',
//     //         //                 life: 3000
//     //         //             });
//     //         //             this.paymentService.searchOrdreKosc.reference = koscOrdresFtel[0].reference;
//     //         //             // this.searchRequest();
//     //         //         } else {
//     //         //             this.messageService.add({
//     //         //                 severity: 'error',
//     //         //                 summary: 'erreur',
//     //         //                 detail: 'problème d\'importation : reference n\'existe pas'
//     //         //             });
//     //         //         }
//     //         //     },
//     //         //     error => {
//     //         //         this.messageService.add({
//     //         //             severity: 'error',
//     //         //             summary: 'erreur',
//     //         //             detail: 'problème d\'importation'
//     //         //         });
//     //         //     }
//     //         // );
//     //     };
//     //     this.showSpinner = false;
//     //
//     // }
//
//     // private readERdv(event: any) {
//     //
//     //     this.showSpinner = true;
//     //
//     //     /* wire up file reader */
//     //     const target: DataTransfer = <DataTransfer>(event.target);
//     //     if (target.files.length !== 1) {
//     //         throw new Error('Cannot use multiple files');
//     //     }
//     //     const reader: FileReader = new FileReader();
//     //     reader.readAsBinaryString(target.files[0]);
//     //     reader.onload = (e: any) => {
//     //         /* create workbook */
//     //         const binarystr: string = e.target.result;
//     //         const wb: XLSX.WorkBook = XLSX.read(binarystr, {type: 'binary'});
//     //
//     //         /* selected the first sheet */
//     //         const wsname: string = wb.SheetNames[0];
//     //         const ws: XLSX.WorkSheet = wb.Sheets[wsname];
//     //
//     //         /* save data */
//     //         const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
//     //
//     //         let koscOrdresERdv = new Array<PaymentVo>();
//     //         for (let i = 0; i < data.length; i++) {
//     //             let myPaymentERdv = this.constructErdv(data, i);
//     //             koscOrdresERdv.push(myPaymentERdv);
//     //         }
//     //         this.paymentService.payments = koscOrdresERdv;
//     //     //     this.paymentService.importerERdv(this.paymentService.payments).subscribe(
//     //     //         response => {
//     //     //             if (response.length == 0) {
//     //     //                 this.messageService.add({
//     //     //                     severity: 'success',
//     //     //                     summary: 'Succès',
//     //     //                     detail: 'E-Rdv importé avec Succès',
//     //     //                     life: 3000
//     //     //                 });
//     //     //                 this.paymentService.searchOrdreKosc.reference = koscOrdresERdv[0].reference;
//     //     //                 // this.searchRequest();
//     //     //             } else {
//     //     //                 this.messageService.add({
//     //     //                     severity: 'error',
//     //     //                     summary: 'erreur',
//     //     //                     detail: 'problème d\'importation : reference existe déjà'
//     //     //                 });
//     //     //             }
//     //     //         },
//     //     //         error => {
//     //     //             this.messageService.add({
//     //     //                 severity: 'error',
//     //     //                 summary: 'erreur',
//     //     //                 detail: 'problème d\'importation'
//     //     //             });
//     //     //         }
//     //     //     );
//     //     // };
//     //     this.showSpinner = false;
//     // }
//
//     // private constructErdv(data: any, i: number) {
//     //     let myPaymentERdv = new PaymentVo();
//     //     if (myPaymentERdv.etatDemandeKoscVo == null) {
//     //         myPaymentERdv.etatDemandeKoscVo = new EtatDemandeKoscVo();
//     //     }
//     //     myPaymentERdv.etatDemandeKoscVo.code = 'initialisation-erdv';
//     //     myPaymentERdv.reference = data[i]['kosc_order_ref'];
//     //     myPaymentERdv.referenceWorkOrder = data[i]['work_order_ref'];
//     //     myPaymentERdv.workOrderType = data[i]['work_order_type'];
//     //     myPaymentERdv.supplierServiceCode = data[i]['supplier_service_code'];
//     //     myPaymentERdv.submissionDate = data[i]['submission_date'];
//     //     myPaymentERdv.productCode = data[i]['product_code'];
//     //     myPaymentERdv.productLabel = data[i]['product_label'];
//     //     myPaymentERdv.provider = data[i]['provider'];
//     //     myPaymentERdv.providerProduct = data[i]['provider_product'];
//     //     myPaymentERdv.providerFileType = data[i]['provider_file_type'];
//     //     myPaymentERdv.existingOtp = data[i]['existing_otp'];
//     //     myPaymentERdv.profile = data[i]['profile'];
//     //     myPaymentERdv.company = data[i]['company_name'];
//     //     myPaymentERdv.endCustumorSiret = data[i]['siret'];
//     //     myPaymentERdv.endCustumorFirstName = data[i]['first_name'];
//     //     myPaymentERdv.endCustumorLastName = data[i]['last_name'];
//     //     myPaymentERdv.endCustumorStreetNumber = data[i]['street_number'];
//     //     myPaymentERdv.endCustumorStreetName = data[i]['street_name'];
//     //     myPaymentERdv.endCustumorZipcode = data[i]['zip_code'];
//     //     myPaymentERdv.endCustumorCity = data[i]['city'];
//     //     myPaymentERdv.endCustumorBuilding = data[i]['building_name'];
//     //     myPaymentERdv.endCustumorStairs = data[i]['stairs'];
//     //     myPaymentERdv.endCustumorFloor = data[i]['floor'];
//     //     myPaymentERdv.endCustumorContactFirstName = data[i]['end_customer_contact_first_name'];
//     //     myPaymentERdv.endCustumorContactLastName = data[i]['end_customer_contact_last_name'];
//     //     myPaymentERdv.endCustumorContactPhone = data[i]['end_customer_contact_phone'];
//     //     myPaymentERdv.endCustumorContactCellPhone = data[i]['end_customer_contact_cellphone'];
//     //     myPaymentERdv.endCustumorContactEmail = data[i]['end_customer_contact_email'];
//     //     myPaymentERdv.providerSlId = data[i]['provider_slid'];
//     //     myPaymentERdv.dateRdv = this.ExcelDateToJSDate(data[i]['intervention_start_datetime']);
//     //
//     //     if ( data[i]['intervention_start_datetime'] != null) {
//     //         myPaymentERdv.etatDemandeKoscVo.code = 'planification';
//     //         myPaymentERdv.etatDemandeKoscVo.libelle = 'Planification';
//     //         myPaymentERdv.etatDemandeKoscVo.style = 'info';
//     //
//     //     }
//     //     myPaymentERdv.dateInterventionTechniqueFin = this.ExcelDateToJSDate(data[i]['intervention_end_datetime']);
//     //     // myPaymentERdv.dateErdv = this.convertDate(data[i]['date_E_Rdv']);
//     //
//     //     //attribut de maillage
//     //     myPaymentERdv.supplier = data[i]['supplier'];
//     //     // console.log(myPaymentERdv.supplier);
//     //
//     //     return myPaymentERdv;
//     //
//     // }
//     //
//     // private constructFtl(data: any, i: number) {
//     //     let myPaymentFtel = new PaymentVo();
//     //     if (myPaymentFtel.etatDemandeKoscVo == null) {
//     //         myPaymentFtel.etatDemandeKoscVo = new EtatDemandeKoscVo();
//     //     }
//     //     //save technicien
//     //     if (myPaymentFtel.technicienVo == null) {
//     //         myPaymentFtel.technicienVo = new TechnicienVo();
//     //     }
//     //     myPaymentFtel.technicienVo.identifiant = data[i]['tech_reference'];
//     //
//     //     //save Operateur
//     //     if (myPaymentFtel.operatorVo == null) {
//     //         myPaymentFtel.operatorVo = new OperatorVo();
//     //     }
//     //     myPaymentFtel.operatorVo.reference = data[i]['opt_reference'];
//     //
//     //     myPaymentFtel.etatDemandeKoscVo.code = data[i]['EtatCrCommandePrise'].toLowerCase();
//     //     myPaymentFtel.referenceCommandePriseInterneOC = data[i]['ReferenceCommandePriseInterneOC'];
//     //     myPaymentFtel.referencePrise = data[i]['ReferencePrise'];
//     //     myPaymentFtel.referencePrestationPrise = data[i]['ReferencePrestationPrise'];
//     //     myPaymentFtel.referencePm = data[i]['ReferencePm'];
//     //     myPaymentFtel.referencePmTechnique = data[i]['ReferencePmTechnique'];
//     //     myPaymentFtel.localisationPm = data[i]['LocalisationPm'];
//     //     myPaymentFtel.referencePbo = data[i]['ReferencePBO'];
//     //     myPaymentFtel.localisationPbo = data[i]['LocalisationPBO'];
//     //     myPaymentFtel.coordonnePboY = data[i]['CoordonneePBOY'];
//     //     myPaymentFtel.hauteurPbo = data[i]['HauteurPBO'];
//     //     myPaymentFtel.typeMaterielPbo = data[i]['TypeMaterielPBO'];
//     //     myPaymentFtel.typePbo = data[i]['TypePBO'];
//     //     myPaymentFtel.conditionSyndics = data[i]['ConditionsSyndic'];
//     //     myPaymentFtel.typeRacordementPboPto = data[i]['TypeRaccoPBPTO'];
//     //     myPaymentFtel.autreInfosPboPto = data[i]['AutresInfosPBOPTO'];
//     //     myPaymentFtel.codeAccesImmeuble = data[i]['CodeAccesImmeuble'];
//     //     myPaymentFtel.contacteImmeuble = data[i]['ContactsImmeuble'];
//     //     myPaymentFtel.pmaAccessible = data[i]['Pmaccessible'];
//     //     myPaymentFtel.infoObtentionCle = data[i]['InfoObtentionCle'];
//     //     myPaymentFtel.localeIpm = data[i]['CodeLocalPM'];////////////////////////////
//     //     myPaymentFtel.contactsSyndic = data[i]['ContactsSyndic'];
//     //     myPaymentFtel.oc1 = data[i]['OC 1'];
//     //     myPaymentFtel.nomModulePm1 = data[i]['NomModulePm NÂ°1'];
//     //     myPaymentFtel.positionModulePm1 = data[i]['PositionModulePm NÂ°1'];
//     //     myPaymentFtel.referenceCableModulePm1 = data[i]['ReferenceCableModulePm NÂ°1'];
//     //     myPaymentFtel.informationFibreModulePm1 = data[i]['InformationFibreModulePm NÂ°1'];
//     //     myPaymentFtel.referenceCablePbo1 = data[i]['ReferenceCablePBO NÂ°1'];
//     //     myPaymentFtel.informationTubePbo1 = data[i]['InformationTubePBO NÂ°1'];
//     //     myPaymentFtel.informationFibrePbo1 = data[i]['InformationFibrePBO NÂ°1'];
//     //     myPaymentFtel.connecteurPriseNumero1 = data[i]['ConnecteurPriseNumero NÂ°1'];
//     //     myPaymentFtel.connecteurPriseCouleur1 = data[i]['ConnecteurPriseCouleur NÂ°1'];
//     //     myPaymentFtel.oc2 = data[i]['OC 2'];
//     //     myPaymentFtel.nomModulePm2 = data[i]['NomModulePm NÂ°2'];
//     //     myPaymentFtel.positionModulePm2 = data[i]['PositionModulePm NÂ°2'];
//     //     myPaymentFtel.referenceCableModulePm2 = data[i]['ReferenceCableModulePm NÂ°2'];
//     //     myPaymentFtel.informationFibreModulePm2 = data[i]['InformationFibreModulePm NÂ°2'];
//     //     myPaymentFtel.referenceCablePbo2 = data[i]['ReferenceCablePBO NÂ°2'];
//     //     myPaymentFtel.informationTubePbo2 = data[i]['InformationTubePBO NÂ°2'];
//     //     myPaymentFtel.informationFibrePbo2 = data[i]['InformationFibrePBO NÂ°2'];
//     //     myPaymentFtel.connecteurPriseNumero2 = data[i]['ConnecteurPriseNumero NÂ°2'];
//     //     myPaymentFtel.connecteurPriseCouleur2 = data[i]['ConnecteurPriseCouleur NÂ°2'];
//     //     myPaymentFtel.oc3 = data[i]['OC 3'];
//     //     myPaymentFtel.nomModulePm3 = data[i]['NomModulePm NÂ°3'];
//     //     myPaymentFtel.positionModulePm3 = data[i]['PositionModulePm NÂ°3'];
//     //     myPaymentFtel.referenceCableModulePm3 = data[i]['ReferenceCableModulePm NÂ°3'];
//     //     myPaymentFtel.informationFibreModulePm3 = data[i]['InformationFibreModulePm NÂ°3'];
//     //     myPaymentFtel.referenceCablePbo3 = data[i]['ReferenceCablePBO NÂ°3'];
//     //     myPaymentFtel.informationTubePbo3 = data[i]['InformationTubePBO NÂ°3'];
//     //     myPaymentFtel.informationFibrePbo3 = data[i]['InformationFibrePBO NÂ°3'];
//     //     myPaymentFtel.connecteurPriseNumero3 = data[i]['ConnecteurPriseNumero NÂ°3'];
//     //     myPaymentFtel.connecteurPriseCouleur3 = data[i]['ConnecteurPriseCouleur NÂ°3'];
//     //     myPaymentFtel.oc4 = data[i]['OC 4'];
//     //     myPaymentFtel.nomModulePm4 = data[i]['NomModulePm NÂ°4'];
//     //     myPaymentFtel.positionModulePm4 = data[i]['PositionModulePm NÂ°4'];
//     //     myPaymentFtel.referenceCableModulePm4 = data[i]['ReferenceCableModulePm NÂ°4'];
//     //     myPaymentFtel.informationFibreModulePm4 = data[i]['InformationFibreModulePm NÂ°4'];
//     //     myPaymentFtel.referenceCablePbo4 = data[i]['ReferenceCablePBO NÂ°4'];
//     //     myPaymentFtel.informationTubePbo4 = data[i]['InformationTubePBO NÂ°4'];
//     //     myPaymentFtel.informationFibrePbo4 = data[i]['InformationFibrePBO NÂ°4'];
//     //     myPaymentFtel.connecteurPriseNumero4 = data[i]['ConnecteurPriseNumero NÂ°4'];
//     //     myPaymentFtel.connecteurPriseCouleur4 = data[i]['ConnecteurPriseCouleur NÂ°4'];
//     //     myPaymentFtel.reserve1 = data[i]['Reserve1'];
//     //     myPaymentFtel.reserve2 = data[i]['Reserve2'];
//     //     myPaymentFtel.reserve3 = data[i]['Reserve3'];
//     //     myPaymentFtel.reserve4 = data[i]['Reserve4'];
//     //     myPaymentFtel.racordementLong = this.convertBoleen(data[i]['RaccordementLong']);
//     //     return myPaymentFtel;
//     // }
//     //
//     // private constructWorkOrder(data: any, i: number) {
//     //     let myPaymentWork = new PaymentVo();
//     //     // myPaymentWork.etatDemandeKoscVo = new EtatDemandeKoscVo();
//     //     if (myPaymentWork.etatDemandeKoscVo == null) {
//     //         myPaymentWork.etatDemandeKoscVo = new EtatDemandeKoscVo();
//     //     }
//     //     //save technicien
//     //     if (myPaymentWork.technicienVo == null) {
//     //         myPaymentWork.technicienVo = new TechnicienVo();
//     //     }
//     //     myPaymentWork.technicienVo.identifiant = data[i]['tech_reference'];
//     //
//     //     //save Operateur
//     //     if (myPaymentWork.operatorVo == null) {
//     //         myPaymentWork.operatorVo = new OperatorVo();
//     //     }
//     //     myPaymentWork.operatorVo.reference = data[i]['customer_operator'];
//     //     myPaymentWork.operatorVo.libelle = data[i]['customer_operator'];
//     //     if (myPaymentWork.operatorVo.libelle == null || myPaymentWork.operatorVo.libelle == '') {
//     //         myPaymentWork.operatorVo = null;
//     //     }
//     //
//     //     myPaymentWork.etatDemandeKoscVo.code = 'initialisation-wo';
//     //     myPaymentWork.reference = data[i]['kosc_order_ref'];
//     //     myPaymentWork.referenceWorkOrder = data[i]['work_order_ref'];
//     //     myPaymentWork.supplierServiceCode = data[i]['supplier_service_code'];
//     //     myPaymentWork.endCustumorSiret = data[i]['siret'];
//     //     myPaymentWork.endCustumorFirstName = data[i]['first_name'];
//     //     myPaymentWork.endCustumorLastName = data[i]['last_name'];
//     //     // myPaymentWork.endCustumorZipcode = data[i]['zip_code'];///////
//     //     myPaymentWork.endCustumorZipcode = data[i]['zip_code'];///////
//     //
//     //     if (myPaymentWork.departementVo == null) {
//     //         myPaymentWork.departementVo = new DepartementVo();
//     //     }
//     //     myPaymentWork.departementVo.code = data[i]['zip_code'];///////
//     //     myPaymentWork.endCustumorStreetName = data[i]['street_name'];///////////
//     //     myPaymentWork.endCustumorStreetNumber = data[i]['street_number'];/////////
//     //     myPaymentWork.endCustumorCity = data[i]['city'];/////////
//     //     myPaymentWork.endCustumorStairs = data[i]['stairs'];
//     //     myPaymentWork.endCustumorFloor = data[i]['floor'];
//     //     myPaymentWork.endCustumorContactFirstName = data[i]['end_customer_contact_first_name'];
//     //     myPaymentWork.endCustumorContactLastName = data[i]['end_customer_contact_last_name'];
//     //     myPaymentWork.endCustumorContactPhone = data[i]['end_customer_contact_phone'];
//     //     myPaymentWork.endCustumorContactCellPhone = data[i]['end_customer_contact_cellphone'];
//     //     myPaymentWork.endCustumorContactEmail = data[i]['end_customer_contact_email'];
//     //     myPaymentWork.company = data[i]['company_name'];//////////////////////
//     //     myPaymentWork.submissionDate = DateUtils.toDateForExcel(data[i]['submission_date']);
//     //     myPaymentWork.workOrderType = data[i]['work_order_type'];
//     //     myPaymentWork.productCode = data[i]['product_code'];
//     //     myPaymentWork.productLabel = data[i]['product_label'];
//     //     myPaymentWork.provider = data[i]['provider'];
//     //     myPaymentWork.providerFileType = data[i]['provider_file_type'];
//     //     myPaymentWork.existingOtp = data[i]['existing_otp'];
//     //     myPaymentWork.profile = data[i]['profile'];
//     //     myPaymentWork.providerSlId = data[i]['provider_slid'];
//     //     myPaymentWork.endCustumorBuilding = data[i]['building_name'];
//     //
//     //     //attribut de maillage
//     //     myPaymentWork.supplier = data[i]['supplier'];
//     //     myPaymentWork.slid = data[i]['slid'];
//     //     myPaymentWork.koscSplitterPosition = data[i]['kosc_splitter_position'];
//     //     myPaymentWork.otpRef = data[i]['otp_ref'];
//     //     myPaymentWork.operatorComment = data[i]['operator_comment'];
//     //     myPaymentWork.koscContactFirstName = data[i]['kosc_contact_first_name'];
//     //     myPaymentWork.koscContactLastName = data[i]['kosc_contact_last_name'];
//     //     myPaymentWork.koscContactPhone = data[i]['kosc_contact_phone'];
//     //     myPaymentWork.koscContactEmail1 = data[i]['kosc_contact_email_1'];
//     //     myPaymentWork.koscContactEmail2 = data[i]['kosc_contact_email_2'];
//     //     myPaymentWork.koscContactEmail3 = data[i]['kosc_contact_email_3'];
//     //     myPaymentWork.koscComment = data[i]['kosc_comments'];
//     //
//     //     return myPaymentWork;
//     // }
//     //
//     convertDate(date) {
//         if (date != null) {
//             const myDate = new Date(Math.round((date - 25569) * 86400 * 1000));
//             return new Date(DateUtils.toString(myDate).split('T')[0]);
//
//         }
//         return null;
//     }
//
//     private constructDataBase(data: any, i: number) {
//         let myPaymentData = new PaymentVo();
//         // myPaymentWork.etatDemandeKoscVo = new EtatDemandeKoscVo();
//         if (myPaymentData.clientVo == null) {
//             myPaymentData.clientVo = new ClientVo();
//         }
//         //save technicien
//         // if( myPaymentData.technicienVo==null){
//         //     myPaymentData.technicienVo=new TechnicienVo();
//         // }
//         // myPaymentData.technicienVo.identifiant=data[i]['tech_reference'];
//
//         //save Operateur
//         if (myPaymentData.paymentStatusVo == null) {
//             myPaymentData.paymentStatusVo = new PaymentStatusVo();
//         }
//         myPaymentData.paymentStatusVo.libel = data[i]['payment_status'];/////////////////pas sure !!
//         myPaymentData.paymentStatusVo.code = data[i]['payment_status'];/////////////////pas sure !!
//         if (myPaymentData.paymentStatusVo.libel == null || myPaymentData.paymentStatusVo.libel == '') {
//             myPaymentData.paymentStatusVo = null;
//         }
//
//         if (myPaymentData.paymentCategoryVo == null) {
//             myPaymentData.paymentCategoryVo = new PaymentCategoryVo();
//         }
//         myPaymentData.paymentCategoryVo.code = data[i]['payment_category']; //////zip code
//         myPaymentData.paymentStatusVo.libel = data[i]['payment_category'];
//
//         myPaymentData.previousNumber = data[i]['previous_number'];
//         myPaymentData.newNumber = data[i]['new_number'];
//         myPaymentData.datePay = this.convertDate(data[i]['submission_date']);
//
//
//         //attribut de maillage
//         myPaymentData.previousNumber = data[i]['previous_number'];
//         myPaymentData.newNumber = data[i]['new_number'];
//         myPaymentData.datePay = data[i]['date_pay'];
//
//
//         return myPaymentData;
//     }
//
//     // private isFtl(data: any) {
//     //
//     //     if (data["ReferenceCommandePriseInterneOC"] != undefined) return true;
//     //     else return false;
//     // }
//     //
//     // private isErdv(data: any) {
//     //     if (data["intervention_start_datetime"] != undefined && data["intervention_start_datetime"] != '') return true;
//     //     else return false;
//     // }
//     //
//     // private isKosc(data: any) {
//     //     if (data["work_order_ref"] != undefined && data["work_order_ref"] != '') return true;
//     //     else return false;
//     // }
//     //
//     // convertBoleen(value: string): boolean {
//     //     const myBoleenString = ['N']
//     //     return myBoleenString.includes(value) ? true : false;
//     // }
//     //
//     // convertDate(date) {
//     //     if (date != null) {
//     //         const myDate = new Date(Math.round((date - 25569) * 86400 * 1000));
//     //         return new Date(DateUtils.toString(myDate).split('T')[0]);
//     //
//     //     }
//     //     return null;
//     // }
//     //
//     // ExcelDateToJSDate(serial) {
//     //     if (serial == null){
//     //         return null;
//     //     }else {
//     //         var utc_days = Math.floor(serial - 25569);
//     //         var utc_value = utc_days * 86400;
//     //         var date_info = new Date(utc_value * 1000);
//     //
//     //         var fractional_day = serial - Math.floor(serial) + 0.0000001;
//     //
//     //         var total_seconds = Math.floor(86400 * fractional_day);
//     //
//     //         var seconds = total_seconds % 60;
//     //
//     //         total_seconds -= seconds;
//     //
//     //         var hours = Math.floor(total_seconds / (60 * 60));
//     //         var minutes = Math.floor(total_seconds / 60) % 60;
//     //         return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
//     //     }
//     //
//     // }
//     //
//     // private constructMessage(koscOrdres: Array<PaymentVo>): string {
//     //     let message = '';
//     //     koscOrdres.forEach(e => message += ('O=' + e.reference + ', WO= ' + e.referenceWorkOrder + ', Type= ' + e.type));
//     //     return message;
//     // }
//
// }
// }