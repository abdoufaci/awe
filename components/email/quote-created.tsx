interface Props {
  products: {
    companyName: string;
    productName: string;
    quantity: string;
  }[];
  username: string;
  adress: string;
  country: string;
}

function QuoteCreated({ products, username, adress, country }: Props) {
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
          We've received your order request and are now reviewing the details.
          Our team will send you a price estimate shortly.
        </p>

        {/* Order Details */}
        <div style={{ margin: "25px 0" }}>
          <p
            style={{
              color: "#666",
              fontSize: "16px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}>
            📦 Order Details:
          </p>

          <div style={{ paddingLeft: "20px" }}>
            {products.map((product, index) => (
              <p
                key={index}
                style={{ color: "#666", fontSize: "16px", margin: "5px 0" }}>
                {product.productName} x{product.quantity}
              </p>
            ))}
          </div>
        </div>

        {/* Destination */}
        <p style={{ color: "#666", fontSize: "16px", margin: "15px 0" }}>
          📍 Destination: [{adress}]
        </p>

        {/* Processing Time */}
        <p style={{ color: "#666", fontSize: "16px", margin: "15px 0" }}>
          📅 Estimated Processing Time: 10 days
        </p>

        {/* Closing Message */}
        <p style={{ color: "#666", fontSize: "16px", marginTop: "25px" }}>
          We'll get back to you soon! If you have any changes, reply to this
          email.
        </p>

        <p style={{ color: "#666", fontSize: "14px", marginTop: "25px" }}>
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
          href="https://www.facebook.com"
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
          href="https://www.instagram.com"
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

export default QuoteCreated;
