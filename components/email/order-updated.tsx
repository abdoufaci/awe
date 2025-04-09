import { Product } from "@prisma/client";

interface Props {
  link: string;
  products: Product[];
  status: string;
  orderId: string;
}

function OrderUpdated({ link, products, status, orderId }: Props) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        color: "#555",
        lineHeight: 1.5,
      }}>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <img
          src="https://88a6fxq8sy.ufs.sh/f/4I4ostcSHpwPFH6E58eAz6FAvJlByxMhZ7GgsSi3OeVf1ja4"
          alt="Algeria World Export Logo"
          style={{ width: "150px", height: "auto" }}
        />
      </div>
      {/* Email Content */}
      <div>
        <h1
          style={{
            color: "#333",
            fontSize: "24px",
            margin: "20px 0",
            fontWeight: "bold",
          }}>
          Order Update
        </h1>

        <p style={{ color: "#666", fontSize: "16px", margin: "15px 0" }}>
          We wanted to update you on the status of your order. Here's the latest
          progress:
        </p>

        {/* Order Details */}
        <p style={{ color: "#666", fontSize: "16px", margin: "15px 0" }}>
          Order Number: <span style={{ color: "#1E88E5" }}>{orderId}</span>
        </p>

        <p style={{ color: "#666", fontSize: "16px", margin: "15px 0" }}>
          Current Status: <span style={{ color: "#1E88E5" }}>{status}</span>
        </p>

        {/* Items */}
        <p style={{ color: "#666", fontSize: "16px", margin: "15px 0" }}>
          Items:
        </p>

        <div style={{ paddingLeft: "20px", margin: "10px 0" }}>
          {products.map((item, index) => (
            <p
              key={index}
              style={{ color: "#666", fontSize: "14px", margin: "5px 0" }}>
              {item.name} x{item.quantity}
            </p>
          ))}
        </div>

        {/* View Order Details Button */}
        <div style={{ margin: "25px 0" }}>
          <a
            href={link}
            style={{
              backgroundColor: "#1E88E5",
              color: "white",
              padding: "12px 20px",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "16px",
              display: "block",
              textAlign: "center",
            }}>
            View Order Details
          </a>
        </div>
      </div>

      {/* Social Media Links */}
      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          paddingTop: "20px",
          borderTop: "1px solid #eee",
        }}>
        <a
          href={link}
          target="_blank"
          style={{
            display: "inline-block",
            margin: "0 10px",
            textDecoration: "none",
          }}>
          <img
            src="https://88a6fxq8sy.ufs.sh/f/4I4ostcSHpwPqkars4TDcG7ZjaoOngw4f3RCVz6xsXKHyBhS"
            alt="Facebook"
            style={{ width: "24px", height: "24px", objectFit: "contain" }}
          />
        </a>
        <a
          href={link}
          target="_blank"
          style={{
            display: "inline-block",
            margin: "0 10px",
            textDecoration: "none",
          }}>
          <img
            src="https://88a6fxq8sy.ufs.sh/f/4I4ostcSHpwPZBERMLl3nEmelA14ugPIfx50pFXYsrwaQqiC"
            alt="Instagram"
            style={{ width: "24px", height: "24px", objectFit: "contain" }}
          />
        </a>

        <p style={{ color: "#999", fontSize: "12px", marginTop: "15px" }}>
          algeriaworldexport@gmail.com
          <br />
          <a
            href="http://www.algeriaworldexport.com"
            style={{ color: "#999", textDecoration: "underline" }}>
            www.algeriaworldexport.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default OrderUpdated;
