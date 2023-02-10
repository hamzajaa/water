import {ClientVo} from "./Client.model";
import {PaymentStatusVo} from "./PaymentStatus.model";
import {PaymentCategoryVo} from "./PaymentCategory.model";

export class PaymentVo {

    public id: number;
    public previousNumber: number;
    public newNumber: number;
    public consumptionRate: number;
    public totalPay: number;
    public datePay: Date;
    public datePayMin: string;
    public datePayMax: string;
    public clientVo: ClientVo;
    public paymentStatusVo: PaymentStatusVo;
    public paymentCategoryVo: PaymentCategoryVo;

    public type: string;

}