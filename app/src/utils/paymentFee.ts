export default class PaymentFee {
  private minFeeValue;
  private percentageFeeValue;

  constructor(feeValue?: number) {
    this.minFeeValue = 12;
    this.percentageFeeValue = feeValue || 0.12;
  }

  get getMinFeeValue(): number {
    return this.minFeeValue;
  }

  set setPercentageFeeValue(value: number) {
    this.percentageFeeValue = value;
  }

  get getPercentageFeeValue(): number {
    return this.percentageFeeValue;
  }

  public calculateFee(value: number): number {
    const fee = value * this.percentageFeeValue;
    return fee < this.minFeeValue ? this.minFeeValue : fee;
  }
}
