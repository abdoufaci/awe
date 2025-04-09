import EmailVerification from "@/components/email/email-verification";
import FeesPayed from "@/components/email/fees-payed";
import OrderUpdated from "@/components/email/order-updated";
import QuoteConfirmed from "@/components/email/quote-confirmed";
import QuoteCreated from "@/components/email/quote-created";
import ResetPasswordEmail from "@/components/email/reset-password-email-";
import StartExploring from "@/components/email/start-exploring";
import { Product } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  console.log({
    code: token,
  });

  await resend.emails.send({
    from: "hello@algeria-discovery.com",
    to: [email],
    subject: "2FA Code",
    html: `<p>Click <a href="${token}">here</a> to reset password.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_HOME_URL}/auth/new-password?token=${token}`;

  console.log({
    resetLink,
  });
  await resend.emails.send({
    from: "hello@algeria-discovery.com",
    to: [email],
    subject: "reset your password",
    // html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
    react: ResetPasswordEmail({ link: resetLink }),
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_HOME_URL}/auth/new-verification?token=${token}`;

  console.log({
    confirmLink,
  });
  await resend.emails.send({
    from: "hello@algeria-discovery.com",
    to: [email],
    subject: "Confirm your email",
    react: EmailVerification({ link: confirmLink }),
  });
};

export const sendStartExploringEmail = async () => {
  await resend.emails.send({
    from: "hello@algeria-discovery.com",
    to: ["abdoufaci982@gmail.com"],
    subject: "Start Exploring",
    react: StartExploring({ link: "http://localhost:3000" }),
  });
};

export const sendQuoteCreatedEmail = async ({
  products,
  username,
  adress,
  country,
  email,
}: {
  products: {
    companyName: string;
    productName: string;
    quantity: string;
  }[];
  username: string;
  adress: string;
  country: string;
  email: string;
}) => {
  await resend.emails.send({
    from: "hello@algeria-discovery.com",
    to: [email],
    subject: "Quote received",
    react: QuoteCreated({ products, username, adress, country }),
  });
};

export const sendQuoteConfirmedEmail = async ({
  deliveryFee,
  products,
  username,
  email,
}: {
  products: Product[];
  deliveryFee: number;
  username: string;
  email: string;
}) => {
  await resend.emails.send({
    from: "hello@algeria-discovery.com",
    to: [email],
    subject: "Quote confirmed",
    react: QuoteConfirmed({
      deliveryFee,
      link: `${process.env.NEXT_PUBLIC_HOME_URL}/dashboard/orders`,
      products,
      username,
    }),
  });
};

export const sendFeesPayedEmail = async ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  await resend.emails.send({
    from: "hello@algeria-discovery.com",
    to: [email],
    subject: "Fees payed",
    react: FeesPayed({
      link: `${process.env.NEXT_PUBLIC_HOME_URL}/dashboard/orders`,
      username,
    }),
  });
};

export const sendOrderUpdatedEmail = async ({
  email,
  orderId,
  products,
  status,
}: {
  email: string;
  products: Product[];
  orderId: string;
  status: string;
}) => {
  await resend.emails.send({
    from: "hello@algeria-discovery.com",
    to: [email],
    subject: "Order update",
    react: OrderUpdated({
      link: `${process.env.NEXT_PUBLIC_HOME_URL}/dashboard/orders`,
      orderId,
      products,
      status,
    }),
  });
};
