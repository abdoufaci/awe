import { Product } from "@prisma/client";

interface Props {
  link: string;
  products: Product[];
  deliveryFee: number;
  username: string;
}

function QuoteConfirmed({ link, products, deliveryFee, username }: Props) {
  const subtotal = products.reduce((sum, item) => sum + Number(item.price), 0);
  const serviceFee = subtotal * 0.1;
  const total = subtotal + deliveryFee + serviceFee;

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
      <div style={{ padding: "0 15px" }}>
        <p style={{ color: "#666", fontSize: "16px" }}>Dear {username},</p>

        <p style={{ color: "#666", fontSize: "16px" }}>
          We've reviewed your order, and here's your cost breakdown:
        </p>

        {/* Products Header */}
        <p
          style={{
            color: "#666",
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "20px",
          }}>
          Products
        </p>

        {/* Invoice Table */}
        <div style={{ margin: "10px 0 20px" }}>
          {/* Products */}
          {products.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 0",
                color: "#666",
                fontSize: "14px",
              }}>
              <div style={{ flex: "2", width: "100%" }}>{item.name}</div>
              <div style={{ flex: "1", textAlign: "center", width: "100%" }}>
                x{item.quantity}
              </div>
              <div style={{ flex: "1", textAlign: "right", width: "100%" }}>
                ${Number(item.price)}
              </div>
            </div>
          ))}

          {/* Delivery Fee */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
              color: "#666",
              fontSize: "14px",
            }}>
            <div style={{ flex: "2", width: "100%" }}>Delivery fee</div>
            <div style={{ flex: "1", textAlign: "center" }}></div>
            <div style={{ flex: "1", textAlign: "right", width: "100%" }}>
              ${deliveryFee}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              backgroundColor: "#ddd",
              margin: "15px 0",
            }}></div>

          {/* Subtotal */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
              color: "#666",
              fontSize: "14px",
            }}>
            <div style={{ flex: "3", width: "100%" }}>Total Products price</div>
            <div style={{ flex: "1", textAlign: "right", width: "100%" }}>
              ${subtotal}
            </div>
          </div>

          {/* Service Fee */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
              color: "#666",
              fontSize: "14px",
            }}>
            <div style={{ flex: "3", width: "100%" }}>Service fee 10%</div>
            <div style={{ flex: "1", textAlign: "right", width: "100%" }}>
              ${serviceFee}
            </div>
          </div>

          {/* Total */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "15px 0",
              color: "#1E88E5",
              fontSize: "16px",
              fontWeight: 500,
            }}>
            <h1 style={{ flex: "3", color: "#182233" }}>Total</h1>
            <h1
              style={{
                flex: "1",
                textAlign: "right",
                width: "100%",
              }}>
              ${total}
            </h1>
          </div>
        </div>

        {/* Payment Instructions */}
        <p style={{ color: "#666", fontSize: "14px", margin: "25px 0 15px" }}>
          To proceed, please pay the service fee securely via our platform.
        </p>

        {/* Pay Now Button */}
        <div style={{ margin: "20px 0" }}>
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
            Pay Now
          </a>
        </div>

        {/* Closing Message */}
        <p style={{ color: "#666", fontSize: "14px", margin: "25px 0 15px" }}>
          Once completed, we'll handle the export process for you. Let us know
          if you have any questions!
        </p>

        <p style={{ color: "#666", fontSize: "14px" }}>
          Best regards,
          <br />
          The Algeria World Export Team
        </p>
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

export default QuoteConfirmed;
