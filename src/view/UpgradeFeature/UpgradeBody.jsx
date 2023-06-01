import axios from "axios";
import React, { useEffect, useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// eslint-disable-next-line
import { Modal, Spinner } from "reactstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import "./Payment.css";
const UpgradeBody = () => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line
  const [PaymentToken, setPaymentToken] = useState();
  const [subscriptionPlan, setsubscriptionPlan] = useState();
  const [subscriptionId, setsubscriptionId] = useState();
  // eslint-disable-next-line
  const [StripeKeys, setStripeKeys] = useState();
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  const loginData = useSelector((store) => store.resumeData);
  const usertoken = loginData?.loginData?.data?.token;
  //get stripe key
  const getStripeKeys = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/stripe-keys`,
        {
          headers: {
            Authorization: `${usertoken}`,
          },
        }
      );
      setStripeKeys(res.data.secret_key);
    } catch (error) {
      return error;
    }
  };
  //get All Subscription Plan
  const getAllSubscriptionPlan = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/subscription-plan`,
        {
          headers: {
            Authorization: `${usertoken}`,
          },
        }
      );
      setsubscriptionPlan(res.data.data.subscription_plan);
    } catch (error) {
      return error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardNumberElement);

    const { error, token } = await stripe.createToken(cardElement);
    if (!error) {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/stripe-payment`,
          {
            stripeToken: token.id,
            subscription_id: subscriptionId,
          },
          {
            headers: {
              "Content-Type": "Application/json",
              Authorization: `${usertoken}`,
            },
          }
        )
        .then((resp) => {
          <Spinner animation="border" variant="warning" />;

          if (resp.status === 200) {
            toast.success(`${t("Transaction Successful")}`);
            setLoading(false);
            navigate("/customer-account");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.data?.status === 404) {
            toast.error(`${t("Payment Failed")}`);
          }
        });
      setModalOpen(!modalOpen);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSubscriptionPlan();
    getStripeKeys();
    // confirmPayment()
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section
        className={
          modalOpen
            ? "choose-template-section customer-sec-body pt-4 overlay"
            : "choose-template-section customer-sec-body pt-4"
        }
      >
        <div className="container">
          <h1 className="text-center sell-main-heading">
            {t("Upgrade for Instant Access to All Features")}
          </h1>
          <div className="payment-box">
            <div className="payment-container">
              <div className="plan-box left-section middle-section bg-one">
                <div className="access-price-wrapper">
                  <p className=" text-center">
                    {/* <label className="custom-check-container"> */}
                    {subscriptionPlan && subscriptionPlan[0]?.type} <br></br>
                    <span className="skuLabel">
                      {subscriptionPlan && subscriptionPlan[0]?.title}
                    </span>
                  </p>
                  <div className="h2 text-center">
                    <span>
                      <sup className="dollar left-currency-symbol currency-INR">
                        <i class="fa fa-eur" aria-hidden="true"></i>
                      </sup>
                      <span className="priceVal">
                        {subscriptionPlan && subscriptionPlan[0]?.price}
                      </span>
                    </span>
                  </div>
                </div>
                <div>
                  <ul>
                    <li>
                      {t("Unlimited printing and downloading for 14 days")}
                    </li>
                    <li>{t("Create unlimited resumes and cover letters")}</li>
                    <li>
                      {t(
                        "After 14 days, auto-renews to ₹395.00 billed every 4 weeks"
                      )}
                    </li>
                    <li>{t("Cancel anytime")}</li>
                  </ul>
                </div>
                <button
                  className="d-block btn site-btn bg-blue text-white"
                  onClick={() => {
                    setModalOpen(!modalOpen);
                    setsubscriptionId(1);
                  }}
                >
                  {t("SUBSCRIBE")}
                </button>
              </div>

              <div className="plan-box left-section middle-section bg-change">
                <div className="access-price-wrapper">
                  <p className=" text-center">
                    {subscriptionPlan && subscriptionPlan[1]?.type} <br></br>
                    <span className="skuLabel">
                      {subscriptionPlan && subscriptionPlan[1]?.title}
                    </span>
                  </p>
                  <div className="h2 text-center text-white">
                    <span>
                      <sup className="dollar left-currency-symbol currency-INR">
                        <i class="fa fa-eur" aria-hidden="true"></i>
                      </sup>
                      <span className="priceVal">
                        {subscriptionPlan && subscriptionPlan[1]?.price}
                      </span>
                      {/* <sup className="cent">.00</sup> */}
                    </span>
                  </div>
                </div>
                <div>
                  <ul>
                    <li>
                      {t("Unlimited printing and downloading for 1 Year")}
                    </li>
                    <li>{t("Create unlimited resumes and cover letters")}</li>
                    <li>
                      {t(
                        "After 1 Year, auto-renews to ₹3950.00 billed every 4 weeks"
                      )}
                    </li>
                    <li>{t("Cancel anytime")}</li>
                  </ul>
                </div>
                <button
                  className="d-block btn site-btn border-btn text-inherit bg-white border-none"
                  onClick={() => {
                    setModalOpen(!modalOpen);
                    setsubscriptionId(2);
                  }}
                >
                  {t("SUBSCRIBE")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* stripe payment modal  */}

      <div className={modalOpen ? "side-content sidebaropen" : "side-content"}>
        <div className="header-hd">
          <span
            className="cursor-pointer times-icon"
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
          >
            <i className="fa fa-times"></i>
          </span>
          <h1>Konto</h1>
        </div>
        <form className="paymentForm" onSubmit={handleSubmit}>
          <h5>Aktiviere deine Mitgliedschaft</h5>
          <div className="price-box">
            <span className="text-gray-400">
              <span className="text-4xl">US$&nbsp;0.99</span> für 14 Tage
            </span>
            <p class="text-gray-500 text-center mt-3">
              Danach US$&nbsp;9.99 / Monat (automatische Verlängerung)
            </p>
          </div>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            // value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            // ref={payBtn}
            className="paymentFormBtn"
          />
          <p className="text-left">
            Nach Eingang deiner Zahlung steht dir das Produkt unverzüglich zur
            Verfügung und du verzichtest auf dein Rücktrittsrecht. Nach 14 Tage
            wird deine Mitgliedschaft automatisch erneuert. Du kannst die
            Mitgliedschaft jederzeit kündigen.
          </p>
        </form>
      </div>
      {/* <Modal
        toggle={() => setModalOpen(!modalOpen)}
        isOpen={modalOpen}
        className="modal-dialog more-info-modal account-email"
      >
        <div className="pb-2 pb-4">
          <span
            aria-hidden={true}
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
            className="cursor-pointer close-btn"
          >
            <span className="close">&times;</span>
          </span>
        </div>
        <div className="side-content"></div>
        <div className="modal-content ">
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-12">
                <h2 className="modal-title h4 mb-3 text-blue">
                  {t("Payment")}
                </h2>
                
                <div className="">
                  <form className="paymentForm" onSubmit={handleSubmit}>
                   
                    <div>
                      <CreditCardIcon />
                      <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                      <EventIcon />
                      <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                      <VpnKeyIcon />
                      <CardCvcElement className="paymentInput" />
                    </div>
                    <input
                      type="submit"
                      // value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                      // ref={payBtn}
                      className="paymentFormBtn"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="custom-modal-footer">
            <div className="row">
              <div className="col-sm-12 pd-0 text-center">
                {loading ? (
                  <Spinner animation="border" variant="warning" />
                ) : (
                  <button
                    type="button"
                    className="btn site-btn bg-blue text-white"
                    // onClick={handleSubmit}
                  >
                    {t("Pay")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal> */}
    </>
  );
};

export default UpgradeBody;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { Modal, Spinner } from "reactstrap";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// const UpgradeBody = () => {
//   const { t } = useTranslation();
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const [modalOpen, setModalOpen] = useState(false);
//   // eslint-disable-next-line
//   const [PaymentToken, setPaymentToken] = useState();
//   const [subscriptionPlan, setsubscriptionPlan] = useState();
//   const [subscriptionId, setsubscriptionId] = useState();
//   // eslint-disable-next-line
//   const [StripeKeys, setStripeKeys] = useState();
//   const [loading, setLoading] = useState(false);

//   const loginData = useSelector((store) => store.resumeData);
//   const usertoken = loginData?.loginData?.data?.token;
//   //get stripe key
//   const getStripeKeys = async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/stripe-keys`,
//         {
//           headers: {
//             Authorization: `${usertoken}`,
//           },
//         }
//       );
//       setStripeKeys(res.data.secret_key);
//     } catch (error) {
//       return error;
//     }
//   };

//   //get All Subscription Plan
//   const getAllSubscriptionPlan = async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.REACT_APP_BASE_URL}/subscription-plan`,
//         {
//           headers: {
//             Authorization: `${usertoken}`,
//           },
//         }
//       );
//       setsubscriptionPlan(res.data.data.subscription_plan);
//     } catch (error) {
//       return error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     if (!stripe || !elements) {
//       return;
//     }
//     const cardElement = elements.getElement(CardElement);

//     const { error, token } = await stripe.createToken(cardElement);

//     if (!error) {
//       axios
//         .post(
//           `${process.env.REACT_APP_BASE_URL}/stripe-payment`,
//           {
//             stripeToken: token.id,
//             subscription_id: subscriptionId,
//           },
//           {
//             headers: {
//               "Content-Type": "Application/json",
//               Authorization: `${usertoken}`,
//             },
//           }
//         )
//         .then((resp) => {
//           <Spinner animation="border" variant="warning" />;

//           if (resp.status === 200) {
//             toast.success(`${t("Transaction Successful")}`);
//             setLoading(false);
//             navigate("/customer-account");
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//           if (err?.response?.data?.status === 404) {
//             toast.error(`${t("Payment Failed")}`);
//           }
//         });
//       setModalOpen(!modalOpen);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllSubscriptionPlan();
//     getStripeKeys();
//     // confirmPayment()
//     // eslint-disable-next-line
//   }, []);

//   return (
//     <>
//       <section className="choose-template-section customer-sec-body pt-4">
//         <div className="container">
//           <h1 className="text-center sell-main-heading">
//             {t("Upgrade for Instant Access to All Features")}
//           </h1>
//           <div className="payment-box">
//             <div className="payment-container">
//               <div className="plan-box left-section middle-section bg-one">
//                 <div className="access-price-wrapper">
//                   <p className=" text-center">
//                     {/* <label className="custom-check-container"> */}
//                     {subscriptionPlan && subscriptionPlan[0]?.type} <br></br>
//                     <span className="skuLabel">
//                       {subscriptionPlan && subscriptionPlan[0]?.title}
//                     </span>
//                   </p>
//                   <div className="h2 text-center">
//                     <span>
//                       <sup className="dollar left-currency-symbol currency-INR">
//                         <i class="fa fa-eur" aria-hidden="true"></i>
//                       </sup>
//                       <span className="priceVal">
//                         {subscriptionPlan && subscriptionPlan[0]?.price}
//                       </span>
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <ul>
//                     <li>
//                       {t("Unlimited printing and downloading for 14 days")}
//                     </li>
//                     <li>{t("Create unlimited resumes and cover letters")}</li>
//                     <li>
//                       {t(
//                         "After 14 days, auto-renews to ₹395.00 billed every 4 weeks"
//                       )}
//                     </li>
//                     <li>{t("Cancel anytime")}</li>
//                   </ul>
//                 </div>
//                 <button
//                   className="d-block btn site-btn bg-blue text-white"
//                   onClick={() => {
//                     setModalOpen(!modalOpen);
//                     setsubscriptionId(1);
//                   }}
//                 >
//                   {t("SUBSCRIBE")}
//                 </button>
//               </div>

//               <div className="plan-box left-section middle-section bg-change">
//                 <div className="access-price-wrapper">
//                   <p className=" text-center">
//                     {subscriptionPlan && subscriptionPlan[1]?.type} <br></br>
//                     <span className="skuLabel">
//                       {subscriptionPlan && subscriptionPlan[1]?.title}
//                     </span>
//                   </p>
//                   <div className="h2 text-center text-white">
//                     <span>
//                       <sup className="dollar left-currency-symbol currency-INR">
//                         <i class="fa fa-eur" aria-hidden="true"></i>
//                       </sup>
//                       <span className="priceVal">
//                         {subscriptionPlan && subscriptionPlan[1]?.price}
//                       </span>
//                       {/* <sup className="cent">.00</sup> */}
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <ul>
//                     <li>
//                       {t("Unlimited printing and downloading for 1 Year")}
//                     </li>
//                     <li>{t("Create unlimited resumes and cover letters")}</li>
//                     <li>
//                       {t(
//                         "After 1 Year, auto-renews to ₹3950.00 billed every 4 weeks"
//                       )}
//                     </li>
//                     <li>{t("Cancel anytime")}</li>
//                   </ul>
//                 </div>
//                 <button
//                   className="d-block btn site-btn border-btn text-inherit bg-white border-none"
//                   onClick={() => {
//                     setModalOpen(!modalOpen);
//                     setsubscriptionId(2);
//                   }}
//                 >
//                   {t("SUBSCRIBE")}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* stripe payment modal  */}

//       <Modal
//         toggle={() => setModalOpen(!modalOpen)}
//         isOpen={modalOpen}
//         className="modal-dialog more-info-modal account-email"
//       >
//         <div className="pb-2 pb-4">
//           <span
//             aria-hidden={true}
//             onClick={() => {
//               setModalOpen(!modalOpen);
//             }}
//             className="cursor-pointer close-btn"
//           >
//             <span className="close">&times;</span>
//           </span>
//         </div>
//         <div className="modal-content ">
//           <div className="modal-body">
//             <div className="row">
//               <div className="col-sm-12">
//                 <h2 className="modal-title h4 mb-3 text-blue">
//                   {t("Payment")}
//                 </h2>
//                 <p className="p mb-0">
//                   <CardElement />
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="custom-modal-footer">
//             <div className="row">
//               <div className="col-sm-12 pd-0 text-center">
//                 {loading ? (
//                   <Spinner animation="border" variant="warning" />
//                 ) : (
//                   <button
//                     type="button"
//                     className="btn site-btn bg-blue text-white"
//                     onClick={handleSubmit}
//                   >
//                     {t("Pay")}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default UpgradeBody;
