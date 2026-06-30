interface PaymentRejectedTemplateParams {

  fullName: string;

  orderNumber: string;

  reason: string;

}

export const paymentRejectedTemplate = ({
  fullName,
  orderNumber,
  reason
}: PaymentRejectedTemplateParams) => {

  return `

    <h2>Payment Rejected</h2>

    <p>Hello <b>${fullName}</b></p>

    <p>Your payment has been rejected.</p>

    <p>Order :</p>

    <b>${orderNumber}</b>

    <br>

    <br>

    Reason

    <br>

    ${reason}

    <br>

    Please upload another payment proof.

  `;

};